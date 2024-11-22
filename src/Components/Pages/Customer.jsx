import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Slide, toast } from "react-toastify";
import Table from "../base/table";
import { Button, Grid, Input } from "@mui/joy";
import { FaSearch } from "react-icons/fa";
const data = {
    name: "مشتری",
    api: "https://taxpayers.irkhadamat.com/api/Customer/",
    fields: [
        { title: "id", pk: true },
        { title: "name", titleFa: "نام", type: "text" },
        { title: "code", titleFa: "کد مشتری", type: "text" },
        { title: "mobile", titleFa: "شماره موبایل", type: "text" },
        { title: "email", titleFa: "ایمیل", type: "text" },
        { title: "nationalCode", titleFa: "کد ملی", type: "text" },
        { title: "type", titleFa: "نوع", type: "text" }
    ],
    path: "/customer/",
};

export default function Customers() {
    var [rows, setRows] = React.useState({});
    var [GridData, setGridData] = React.useState({ name: null, mobile: null,nationalCode:null });
    var [showTable, SetTableVisibilityState] = React.useState(false);
    function handleSearchClick() {
        SetTableVisibilityState(false);
        setTimeout(() => {
            SetTableVisibilityState(true)
        }, 500);
    }
    return (
        <div className="border-2 w-full">
            <div dir="rtl" className="flex  justify-center mt-3">
                <Input
                    style={{ fontFamily: "Rubik" }}
                    color="primary"
                    onChange={(e) => (GridData.name = e.target.value)}
                    disabled={false}
                    size="md"
                    dir="rtl"
                    placeholder="نام"
                    variant="outlined"
                    className="mx-3"
                />
                <Input
                    style={{ fontFamily: "Rubik" }}
                    color="primary"
                    onChange={(e) => (GridData.mobile = e.target.value)}
                    disabled={false}
                    size="md"
                    dir="rtl"
                    placeholder="موبایل"
                    variant="outlined"
                    className="mx-3"
                />
                <Input
                    style={{ fontFamily: "Rubik" }}
                    color="primary"
                    onChange={(e) => (GridData.nationalCode = e.target.value)}
                    disabled={false}
                    size="md"
                    dir="rtl"
                    placeholder="کد ملی"
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
            <div dir="ltr" class=" h-96 flex justify-center  mt-10 ">
                {showTable?<Table path={data.path} fields={data.fields} api={data.api} name={data.name} nationalCode={GridData.nationalCode} CustomerName={GridData.name} mobile={GridData.mobile} />:''}
            </div>
        </div>
    );
}
