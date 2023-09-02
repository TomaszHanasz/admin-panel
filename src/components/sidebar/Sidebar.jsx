import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { PanelMenu } from "primereact/panelmenu";

export default function LeftSidebar(props) {
  const [visible, setVisible] = useState(false);

  const items = [
    {
      label: "Dish",
      icon: "pi pi-fw pi-file",
      command: () => props.onClickChangeCard("Home"),
      items: [
        {
          label: "Add",
          icon: "pi pi-fw pi-plus",
          command: () => props.onClickChangeCard("addDish"),
        },
        {
          label: "Remove",
          icon: "pi pi-fw pi-trash",
          command: () => props.onClickChangeCard("removeDish"),
        },
      ],
    },
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      command: () => props.onClickChangeCard("editDish"),
    },
    {
      label: "Dish List",
      icon: "pi pi-fw pi-list",
      command: () => props.onClickChangeCard("dishList"),
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
