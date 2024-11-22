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
  name: "نوع کالا",
  api: "https://taxpayers.irkhadamat.com/api/ProductType/",
  fields: [
    { title: "id", pk: true },
    { title: "name", titleFa: "نام", type: "text" },
  ],
  path: "/productTypes/",
};

export default function ProductTypes() {
  var [rows, setRows] = React.useState({});
  // axios
  //   .get("https://taxpayers.bpro.ir/api/ProductType/GetAll", {
  //     headers: { token: localStorage.getItem("token") },
  //   })
  //   .then((res) => {
  //     setRows(res.data.data);
  //     console.log("success");
  //   })
  //   .catch((err) => {
  //     toast.error(err.message, {
  //       position: "bottom-right",
  //       dir: "rtl",
  //       autoClose: 3000,
  //       closeOnClick: true,
  //       theme: "colored",
  //       rtl: true,
  //       transition: Slide,
  //     });
  //     console.log(err);
  //   });
  return (
    <div className="flex justify-center w-full">
      <div dir="ltr" class=" h-96 flex justify-center  mt-10 ">
        {/* <DataGrid
        dir='rtl'
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        /> */}
        <Table path={data.path} fields={data.fields} api={data.api} name={data.name} />
      </div>
    </div>
  );
}
