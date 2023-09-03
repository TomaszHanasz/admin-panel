import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { db } from "../../firebase-config";
import { categories } from "../../data/categories";
import useDishManagement from "../../hooks/useDishManagement";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore/lite";

export default function EditDish() {
  const [products, setProducts] = useState(null);
  const { dishes, setDishes, dish, setDish } = useDishManagement();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const columns = [
    { field: "name", header: "Name" },
    { field: "price", header: "Price" },
    { field: "description", header: "Description" },
    { field: "hidden", header: "Hidden" },
  ];

  //change category
  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
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
    getData();
  }, [selectedCategory]);

  const isPositiveInteger = (val) => {
    let str = String(val);

    str = str.trim();

    if (!str) {
      return false;
    }

    str = str.replace(/^0+/, "") || "0";
    let n = Math.floor(Number(str));

    return n !== Infinity && String(n) === str && n >= 0;
  };

  const onCellEditComplete = async (e) => {
    const { rowData, newValue, field } = e;

    // Make sure to update the local state first
    rowData[field] = newValue;
    setDishes([...dishes]);

    try {
      // Update the document in Firebase Firestore
      const docRef = doc(db, selectedCategory.name, rowData.id);
      await updateDoc(docRef, { [field]: newValue });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const cellEditor = (options) => {
    if (options.field === "price") return priceEditor(options);
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

  return (
    <div className="card p-fluid">
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
        editMode="cell"
        tableStyle={{ minWidth: "50rem" }}
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
              onCellEditComplete={onCellEditComplete}
            />
          );
        })}
      </DataTable>
    </div>
  );
}
