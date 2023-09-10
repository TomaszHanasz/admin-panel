import React from "react";
import { Card } from "primereact/card";
import "./panel.style.css";

export default function Panel() {
  return (
    <div>
      <Card className="panel__card" style={{ textAlign: "center" }}>
        Welcome
      </Card>
    </div>
  );
}
