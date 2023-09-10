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
import useDishManagement from "../../hooks/useDishManagement";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore/lite";

export default function EditDish() {
  const { dishes, setDishes } = useDishManagement();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const columns = [
    { field: "name", header: "Name" },
    { field: "price", header: "Price" },
    { field: "description", header: "Description" },
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
    getData(); // eslint-disable-next-line
  }, [selectedCategory]);

  const onRowEditComplete = async (e) => {
    const { newData, index } = e;
    const updatedDishes = [...dishes];

    // Assuming that your `columns` array contains a field called 'id'
    const docId = updatedDishes[index].id;

    updatedDishes[index] = newData;

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
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        ></Column>
      </DataTable>
    </div>
  );
}
