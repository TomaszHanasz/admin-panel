import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { PanelMenu } from "primereact/panelmenu";
import { Link } from "react-router-dom";

export default function LeftSidebar(props) {
  const [visible, setVisible] = useState(false);

  const items = [
    {
      label: (
        <Link to="/addDish">
          <span>
            <i className="pi pi-fw pi-plus"></i> Add
          </span>
        </Link>
      ),
    },
    {
      label: (
        <Link to="/remove-dish">
          <span>
            <i className="pi pi-fw pi-trash"></i> Remove
          </span>
        </Link>
      ),
    },
    {
      label: (
        <Link to="/edit-dish">
          <span>
            <i className="pi pi-fw pi-pencil"></i> Edit
          </span>
        </Link>
      ),
    },
    {
      label: (
        <Link to="/dishList">
          <span>
            <i className="pi pi-fw pi-list"></i> Dish List
          </span>
        </Link>
      ),
    },
  ];

  return (
    <div className="card flex justify-content-center">
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <div className="card flex justify-content-center">
          <PanelMenu model={items} className="w-full md:w-25rem" />
        </div>
      </Sidebar>
      <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
    </div>
  );
}
