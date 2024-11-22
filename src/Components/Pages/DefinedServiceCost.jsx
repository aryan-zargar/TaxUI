import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Slide, toast } from "react-toastify";
import Table from "../base/table";
import Sidebar from "../base/sidebar";

const data = {
  name: "خدمات",
  api: "https://taxpayers.irkhadamat.com/api/DefinedServiceCost/",
  fields: [
    { title: "id", pk: true },
    { title: "itemCode", titleFa: "کد", type: "text" },
    { title: "itemDesc", titleFa: "توضیحات", type: "text" },
    { title: "itemCost", titleFa: "قیمت", type: "number" },
    { title: "idForTaxOffice", titleFa: "شماره مرجع مالیاتی", type: "text" },
  ],
  path: "/DefinedService/",
};

export default function DefinedServiceCost() {
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
