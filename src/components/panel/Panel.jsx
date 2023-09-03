import React from "react";
import { Card } from "primereact/card";
import "./panel.style.css";
import AddDish from "../addDish/AddDish";
import DishList from "../dishList/DishList";

export default function Panel(props) {
  const openedPanel = props.openedPanel;

  return (
    <div>
      <Card className="panel__card">
        {openedPanel === "dishList" && <DishList />}
        {openedPanel === "addDish" && <AddDish />}
      </Card>
    </div>
  );
}
