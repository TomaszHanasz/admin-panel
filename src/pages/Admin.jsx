import LeftSidebar from "../components/sidebar/Sidebar";
import Panel from "../components/panel/Panel";
import { Card } from "primereact/card";
import React from "react";

const Admin = () => {
  return (
    <div>
      <LeftSidebar />
      <Card className="panel__card">
        <Panel />
      </Card>
    </div>
  );
};

export default Admin;
