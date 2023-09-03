import React from "react";
import LeftSidebar from "../../components/sidebar/Sidebar";
import DishList from "../../components/dishList/DishList";
import { Card } from "primereact/card";

const DishListPanel = () => {
  return (
    <div>
      <LeftSidebar />
      <Card className="panel__card">
        <DishList />
      </Card>
    </div>
  );
};

export default DishListPanel;
