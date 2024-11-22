import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Slide, toast } from "react-toastify";
import Table from "../base/table";
import Input from "@mui/joy/Input";
import { Button } from "@mui/joy";
import { FaSearch } from "react-icons/fa";
import { Grid } from "@mui/material";
const data = {
  name: "کالا",
  api: "https://taxpayers.irkhadamat.com/api/Product/",
  fields: [
    { title: "id", pk: true },
    { title: "productCode", titleFa: "کد کالا", type: "text" },
    { title: "name", titleFa: "نام کالا", type: "text" },
    { title: "model", titleFa: "مدل کالا", type: "text" },
    { title: "idForTaxOffice", titleFa: "شناسه مالیاتی", type: "text" },
    {
      title: "typeID",
      titleFa: "نوع کالا",
      type: "key",
      keyapi: "https://taxpayers.irkhadamat.com/api/ProductType/",
      targetField: "name",
    },
    {
      title: "holderID",
      titleFa: "برند کالا",
      type: "key",
      keyapi: "https://taxpayers.irkhadamat.com/api/ProductHolder/",
      targetField: "holderName",
    },
  ],
  path: "/products/",
};

export default function Products() {
  var [GridData, setGridData] = React.useState({ Code: null, Model: null });
  var [showTable, SetTableVisibilityState] = React.useState(false);
  function handleSearchClick() {
    SetTableVisibilityState(false);
    setTimeout(() => {
      SetTableVisibilityState(true)
    }, 500);
  }
  return (
    <div className="border-2 w-full ">
      <div dir="rtl" className="flex  justify-center mt-3">
        <Input
          style={{ fontFamily: "Rubik" }}
          color="primary"
          onChange={(e) => (GridData.Code = e.target.value)}
          disabled={false}
          size="md"
          dir="rtl"
          placeholder="کد محصول"
          variant="outlined"
          className="mx-3"
        />
        <Input
          style={{ fontFamily: "Rubik" }}
          color="primary"
          onChange={(e) => (GridData.Model = e.target.value)}
          disabled={false}
          size="md"
          dir="rtl"
          placeholder="مدل محصول"
          variant="outlined"
          className="mx-3"
        />
        <Button
          variant="solid"
          className="flex space-x-3 "
          dir="ltr"
          onClick={() => handleSearchClick()}
        >
          <p className="">جستجو کنید</p> <FaSearch className="mt-1" />
        </Button>
      </div>
      <div className="flex justify-center ">
        {showTable ? (
          <Table
            path={data.path}
            fields={data.fields}
            api={data.api}
            name={data.name}
            model={GridData.Model}
            code={GridData.Code}
          />
        ) : (
          <p className="mt-10">برای مشاهده ی نتایج جستجو کنید</p>
        )}
      </div>
    </div>
  );
}
