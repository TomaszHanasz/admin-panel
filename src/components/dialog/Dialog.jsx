import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "./dialog.style.css";

export default function DishDialog(props) {
  const [visible, setVisible] = useState(false);

  const { name, price, description, ingredients, image, hidden } = props;

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
        <img src={image} style={{ width: 300, marginBottom: 10 }} />
        <h4>Description:</h4>
        <p style={{ marginBottom: 10 }}>{description}</p>
        <h4>Ingredients:</h4>
        {ingredients && (
          <ul>
            {ingredients.map((el, index) => (
              <li key={index}>{el.name}</li>
            ))}
          </ul>
        )}
      </Dialog>
    </div>
  );
}
