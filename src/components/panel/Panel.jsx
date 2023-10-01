import React from "react";
import { Card } from "primereact/card";
import logo from "./109_509195019.png";
import "./panel.style.css";

export default function Panel() {
  return (
    <div>
      <Card
        className="panel__card"
        style={{ textAlign: "center", boxShadow: "none" }}
      >
        <img src={logo} alt="cafe alif logo" />
      </Card>
    </div>
  );
}
