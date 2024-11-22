import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Slide, toast } from "react-toastify";
import Table from "../base/table";
import Sidebar from "../base/sidebar";

const data = {
  name: "برند کالا",
  api: "https://taxpayers.irkhadamat.com/api/ProductHolder/",
  fields: [
    { title: "id", pk: true },
    { title: "holderName", titleFa: "نام", type: "text" },
  ],
  path: "/productHolder/",
};

export default function ProductHolder() {
  var [rows, setRows] = React.useState({});
  return (
    <div className="border-2 w-full">
      <div dir="rtl" className="flex  justify-center mt-3">
        <Table
          path={data.path}
          fields={data.fields}
          api={data.api}
          name={data.name}
        />
      </div>
    </div>
  );
}
