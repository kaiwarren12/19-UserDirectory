import React from "react";
import { DataTable } from "./DataTable/DataTable";
import { NavigationBar } from "./NavigationBar/NavigationBar";

export const Home = () => {
  return (
    <div>
      <NavigationBar />
      <DataTable />
    </div>
  );
};
