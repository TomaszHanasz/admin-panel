import React from "react";
import LeftSidebar from "../../components/sidebar/Sidebar";
import AddDish from "../../components/addDish/AddDish";
import { Card } from "primereact/card";

const AddDishPanel = () => {
  return (
    <div>
      <LeftSidebar />
      <Card className="panel__card">
        <AddDish />
      </Card>
    </div>
  );
};

export default AddDishPanel;
