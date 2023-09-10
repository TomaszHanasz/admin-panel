import React from "react";
import EditDish from "../../components/editDish/EditDish";
import { Card } from "primereact/card";
import LeftSidebar from "../../components/sidebar/Sidebar";

const EditDishes = () => {
  return (
    <div>
      <LeftSidebar />
      <Card className="panel__card">
        <EditDish />
      </Card>
    </div>
  );
};

export default EditDishes;
