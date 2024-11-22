import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Slide, toast } from "react-toastify";
import Table from "../base/table";
const columns = [
  { field: "id", headerName: "شناسه", width: 100 },
  { field: "name", headerName: "عنوان", width: 130 },
];

const data = {
  name: "انبار",
  api: "https://taxpayers.irkhadamat.com/api/Storage/",
  fields: [
    { title: "id", pk: true },
    { title: "storageName", titleFa: "نام", type: "text" },
    { title: "storageAddress", titleFa: "آدرس", type: "text" },
    { title: "totalCredit", titleFa: "اعتبار", type: "number" },

  ],
  path: "/storage/",
};

export default function Storages() {
  var [rows, setRows] = React.useState({});
  return (
    <div className="flex justify-center w-full">
      <div dir="ltr" class=" h-96 flex justify-center  mt-10 ">
        
        <Table path={data.path} fields={data.fields} api={data.api} name={data.name} />
      </div>
    </div>
  );
}
