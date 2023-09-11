import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { db } from "../../firebase-config";
import { classNames } from "primereact/utils";
import { categories } from "../../data/categories";
import { Checkbox } from "primereact/checkbox";
import { ingredientsList } from "../../data/ingredients";
import { MultiSelect } from "primereact/multiselect";
import useDishManagement from "../../hooks/useDishManagement";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore/lite";

export default function EditDish() {
  const { dishes, setDishes } = useDishManagement();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [editedIngredients, setEditedIngredients] = useState([]);

  const columns = [
    { field: "name", header: "Name" },
    { field: "price", header: "Price" },
    { field: "description", header: "Description" },
  ];

  //change category
  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
    console.log(e.target.value);
  };

  // fetch dishes from db
  const getData = async () => {
    try {
      const data = collection(db, `${selectedCategory.name}`);
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

  const onRowEditInit = (event) => {
    setEditedIngredients(event.data.ingredients || []);
  };

  const onRowEditComplete = async (e) => {
    const { newData, index } = e;
    const updatedDishes = [...dishes];

    const docId = updatedDishes[index].id;

    newData.ingredients = editedIngredients;

    updatedDishes[index] = newData;
    console.log(editedIngredients);
    setDishes(updatedDishes);

    try {
      // Update the document in Firebase Firestore
      const docRef = doc(db, selectedCategory.name, docId);
      await updateDoc(docRef, newData); // Update the entire document
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const cellEditor = (options) => {
    if (options.field === "price") return priceEditor(options);
    else if (options.field === "ingredients") return ingredientsEditor(options);
    else return textEditor(options);
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const priceEditor = (options) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(rowData.price);
  };

  const hiddenBodyTemplate = (rowData) => {
    return (
      <i
        className={classNames("pi", {
          "text-green-500 pi-check": rowData.hidden,
          "text-red-500 pi-times": !rowData.hidden,
        })}
      ></i>
    );
  };

  const hiddenEditor = (options) => {
    return (
      <Checkbox
        checked={options.value}
        onChange={(e) => options.editorCallback(e.checked)}
      />
    );
  };

  const onChangeSetIngredients = (e) => {
    const selectedValue = e.value;
    setIngredients(selectedValue);
  };

  const ingredientsEditor = (options) => {
    return (
      <MultiSelect
        value={editedIngredients} // Use editedIngredients state for editing
        options={ingredientsList}
        optionLabel="name"
        onChange={(e) => setEditedIngredients(e.value)}
        placeholder="Select Ingredients"
        className="add-dish__ingredients"
      />
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
      <DataTable
        value={dishes}
        editMode="row"
        onRowEditComplete={onRowEditComplete}
        onRowEditInit={onRowEditInit}
        tableStyle={{ minWidth: "50rem" }}
        dataKey="id"
      >
        {columns.map(({ field, header }) => {
          return (
            <Column
              key={field}
              field={field}
              header={header}
              style={{ width: "25%" }}
              body={field === "price" && priceBodyTemplate}
              editor={(options) => cellEditor(options)}
            />
          );
        })}
        <Column
          field="ingredients"
          header="Ingredients"
          style={{ width: "25%" }}
          body={(rowData) =>
            rowData.ingredients.map((ingredient) => ingredient.name).join(", ")
          }
          editor={(options) => ingredientsEditor(options)} // You can use a text editor for editing ingredients
        />
        <Column
          field="hidden"
          header="Hidden"
          dataType="boolean"
          bodyClassName="text-center"
          style={{ width: "10%" }}
          body={hiddenBodyTemplate}
          editor={(options) => hiddenEditor(options)}
        />
        <Column
          rowEditor
          header="Edit"
          headerStyle={{ width: "10%", minWidth: "8rem", textAlign: "center" }}
          Style={{ textAlign: "center" }}
        ></Column>
      </DataTable>
    </div>
  );
}
