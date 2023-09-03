import React, { useState, useEffect, useRef } from "react";
import { categories } from "../../data/categories";
import { ingredientsList } from "../../data/ingredients";
import useDishManagement from "../../hooks/useDishManagement";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { db, storage } from "../../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import "./addDish.style.css";
import UploadImage from "../uploadImage/UploadImage";

export default function AddDish() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [ingredients, setIngredients] = useState(null);

  const {
    dish,
    dishes,
    setDishes,
    setDish,
    onChangeHandler,
    defaultDishValues,
  } = useDishManagement();

  // select dish category
  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  // add dish to db
  const onClickAddDishToDatabase = async (newDish) => {
    try {
      const dishesCollection = collection(db, `${selectedCategory.name}`);
      await addDoc(dishesCollection, newDish);
      console.log(dishesCollection);
    } catch (error) {
      console.log("Error adding to database", error);
    }
  };

  // submit dish
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setDish(defaultDishValues);
    console.log(dish);
    const resetSelectedIngredients = () => {
      setIngredients([]);
    };
    resetSelectedIngredients();
    setImage("");
    await onClickAddDishToDatabase(dish);
    const updatedDishes = [...dishes, dish];
    setDishes(updatedDishes);
  };

  //ingredients handling
  const onChangeSetIngredients = (e) => {
    const selectedValue = e.value;
    setIngredients(selectedValue);
  };

  useEffect(() => {
    setDish({ ...dish, ingredients });
  }, [ingredients]);

  //image upload
  const toast = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [image, setImage] = useState("");

  const isImageUploaded = !!image;

  const onUpload = async (event) => {
    const file = event.files[0];
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    if (isImageUploaded) {
      console.log("An image is already uploaded.");
      return;
    }

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "File Upload Failed",
        });
      },
      () => {
        getDownloadURL(storageRef)
          .then((downloadURL) => {
            toast.current.show({
              severity: "info",
              summary: "Success",
              detail: "File Uploaded",
            });
            setImage(downloadURL);
            setDish({ ...dish, image: downloadURL });
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      }
    );
  };

  useEffect(() => {
    setDish({ ...dish, image: image });
  }, [image]);

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <div className="add-dish__grid">
          <div className="add-dish__left">
            <div className="add-dish__select-category">
              <h3>Select Dish Category</h3>
              <br />
              <Dropdown
                value={selectedCategory}
                onChange={handleChangeCategory}
                options={categories}
                optionLabel="name"
                placeholder="Select Category"
                className="w-full md:w-14rem"
                required
              />
            </div>
            <div className="add-dish__inputs-group">
              <h3>Dish Name</h3>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-tag"></i>
                </span>
                <InputText
                  placeholder="Name"
                  value={dish.name}
                  onChange={onChangeHandler}
                  name="name"
                  required
                />
              </div>
              <h3>Dish Price</h3>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">$</span>
                <InputNumber
                  placeholder="Price"
                  value={dish.price}
                  onValueChange={onChangeHandler}
                  name="price"
                  minFractionDigits={2}
                  maxFractionDigits={2}
                  required
                />
              </div>
              <h3>Description</h3>
              <div className="card flex justify-content-center">
                <InputTextarea
                  value={dish.description}
                  onChange={onChangeHandler}
                  name="description"
                  rows={5}
                  cols={30}
                  placeholder="Description"
                  className="add-dish__description"
                  required
                />
              </div>
              <h3>Ingredients</h3>
              <div className="card flex justify-content-center">
                <MultiSelect
                  value={ingredients}
                  onChange={onChangeSetIngredients}
                  options={ingredientsList}
                  optionLabel="name"
                  display="chip"
                  placeholder="Select Ingredients"
                  maxSelectedLabels={10}
                  className="add-dish__ingredients"
                />
              </div>
            </div>
          </div>
          <div className="add-dish__right">
            <UploadImage
              onUpload={onUpload}
              image={image}
              uploadProgress={uploadProgress}
              toast={toast}
            />
          </div>
          <Button
            label="Submit"
            className="add-dish__submit-btn"
            disabled={
              !dish.name ||
              !dish.price ||
              !dish.description ||
              selectedCategory === "" ||
              uploadProgress !== 100
            }
          />
        </div>
      </form>
    </>
  );
}
