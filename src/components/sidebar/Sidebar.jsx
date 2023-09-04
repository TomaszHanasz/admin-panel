import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import "./sidebar.style.css";

export default function LeftSidebar(props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="card flex justify-content-center">
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <div className="sidebar__btn-group">
          <Link to="/addDish">
            <Button
              label="Add Dish"
              text
              raised
              severity="secondary"
              icon="pi pi-plus"
              style={{ width: "100%" }}
            />
          </Link>
          <Link to="/dishList">
            <Button
              label="Dish list"
              text
              raised
              severity="secondary"
              icon="pi pi-list"
              style={{ width: "100%" }}
            />
          </Link>
          <Button
            label="Log Out"
            text
            raised
            severity="secondary"
            icon="pi pi-sign-out"
            style={{ width: "100%" }}
          />
        </div>
      </Sidebar>
      <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
    </div>
  );
}
