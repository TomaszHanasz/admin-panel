import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { db } from "../../firebase-config";
import "./dialog.style.css";

export default function DishDialog(props) {
  const {
    name,
    price,
    description,
    ingredients,
    image,
    hidden,
    deleteHandler,
    id,
  } = props;
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Removed",
      detail: "Dish has been removed from database",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Canceled",
      detail: "Action canceled",
      life: 3000,
    });
  };

  const confirmDelete = () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => deleteHandler(id),
      reject,
    });
  };

  return (
    <div className="dialog__card">
      <Button
        label="Show"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header={name}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
        className="dialog__single-dish"
      >
        <img src={image} className="dish-dialog__image" />
        <h4>Description:</h4>
        <p style={{ marginBottom: 10 }}>{description}</p>
        <h4>Ingredients:</h4>
        {ingredients && (
          <ul className="dish-list__dialog-ingredients">
            {ingredients.map((el, index) => (
              <li key={index}>{el.name}</li>
            ))}
          </ul>
        )}
        <Toast ref={toast} />
        <ConfirmDialog />
        <Button
          label="Remove dish"
          icon="pi pi-external-link"
          severity="danger"
          onClick={confirmDelete}
        />
      </Dialog>
    </div>
  );
}
