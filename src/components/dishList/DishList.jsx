import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { db } from "../../firebase-config";
import { categories } from "../../data/categories";
import DishDialog from "../dialog/Dialog";
import useDishManagement from "../../hooks/useDishManagement";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore/lite";
import "./dishList.style.css";

export default function DishList() {
  const { dishes, setDishes } = useDishManagement();
  const [selectedCategory, setSelectedCategory] = useState(null);

  //change category
  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  // fetch dishes from db
  const getData = async () => {
    try {
      const data = collection(
        db,
        `${selectedCategory.name || selectedCategory}`
      );
      const dishesSnapshot = await getDocs(data);
      const dishesData = dishesSnapshot.docs.map((el) => {
        return { ...el.data(), id: el.id };
      });
      setDishes(dishesData);
      console.log(dishesData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(); // eslint-disable-next-line
  }, [selectedCategory]);

  //delete dish
  const deleteHandler = async (dishId) => {
    try {
      if (selectedCategory) {
        await deleteDoc(doc(db, selectedCategory.name, dishId)); // Use selectedCategory directly
        console.log("Dish deleted successfully");
        getData(); // Refresh the data after deleting a dish
      }
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
    console.log(selectedCategory.name);
    console.log(dishId);
  };

  const itemTemplate = (dish) => {
    const { name, ingredients, image, price, description, id } = dish;

    return (
      <>
        <div className="dishlist__column">
          <div className="dishlist__single-dish">
            <img
              className="dishlist__img"
              src={`${image}`}
              alt={name}
              loading="lazy"
            />
            <div className="dishlist__card-box">
              <div className="dishlist__text">
                <div className="dishlist__name">{name}</div>
              </div>
              <span className="dishlist__price">${price}</span>
            </div>
            <DishDialog
              name={name}
              image={image}
              ingredients={ingredients}
              description={description}
              deleteHandler={deleteHandler}
              id={id}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="card">
      <div>
        <Dropdown
          value={selectedCategory}
          onChange={handleChangeCategory}
          options={categories}
          optionLabel="name"
          placeholder="Select Category"
          className="w-full md:w-14rem"
        />
        <Button icon="pi pi-refresh" onClick={() => getData()} />
      </div>
      <DataView value={dishes} itemTemplate={itemTemplate} />
    </div>
  );
}
