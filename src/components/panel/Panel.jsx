import React from "react";
import { Card } from "primereact/card";
import "./panel.style.css";
import AddDish from "../addDish/AddDish";

export default function Panel() {
  return (
    <div>
      <Card title="Add dish" className="panel__card">
        <AddDish />
      </Card>
    </div>
  );
}
