import React from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
export default function SidebarLayout() {
  return (
    <div className="flex">
      <Outlet className="" />
      <Sidebar className="h-screen" />
    </div>
  );
}
