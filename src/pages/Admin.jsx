import LeftSidebar from "../components/sidebar/Sidebar";
import Panel from "../components/panel/Panel";
import React, { useState } from "react";

const Admin = () => {
  const [openedPanel, setOpenedPanel] = useState("home");

  const onClickChangeCard = (cardName) => {
    setOpenedPanel(cardName);
    console.log(openedPanel);
  };

  return (
    <div>
      <LeftSidebar onClickChangeCard={onClickChangeCard} />
      <Panel openedPanel={openedPanel} />
    </div>
  );
};

export default Admin;
