import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Slide, toast } from "react-toastify";
import Table from "../base/table";
import { Button, Input, Skeleton } from "@mui/joy";
import _ from "lodash";
import { CircularProgress } from "@mui/joy";

export default function SearchInCustomers() {
    var [allCustomers, setAllCustomers] = React.useState()
    var [customerCode, setCustomerCode] = React.useState()
    var [showDetail, setShowDetailStatus] = React.useState(false)
    var [customerDetail, setCustomerDetail] = React.useState()
    var [loading, setLoading] = React.useState(false)
    function getCustomerDetail(e) {
        e.preventDefault()
        setShowDetailStatus(false)
        var Customer = _.find(allCustomers, function (o) { return o.code == customerCode })
        if (Customer != undefined) {
            setLoading(true)
            axios.get(`https://taxpayers.irkhadamat.com/api/Customer/Get?id=${Customer.id}`, { headers: { token: localStorage.getItem("token") } })
                .then((res) => {
                    setCustomerDetail(res.data.data)
                    console.log(res.data.data)
                    setShowDetailStatus(true)
                    setLoading(false)
                })
        }
        else {
            toast.error("هیچ مشتری با این کد وجود ندارد", {
                position: "bottom-right",
                dir: "rtl",
                autoClose: 3000,
                closeOnClick: true,
                theme: "colored",
                rtl: true,
                transition: Slide,
            });
        }
    }

    React.useEffect(() => {
        axios.post('https://taxpayers.irkhadamat.com/api/Customer/GetAll', { name: null, mobile: null, nationalCode: null }, { headers: { token: localStorage.getItem("token") } })
            .then((res) => {
                setAllCustomers(res.data.data)
            })
    }, [])


    return (
        <div className="flex justify-center w-full">
            <div dir="ltr" class=" h-96  mt-10 ">
                <form className="flex justify-center" onSubmit={(e) => getCustomerDetail(e)} >
                    <div className="flex space-x-4 h-5 " dir="ltr" >
                        <Button type="submit" > جستجو </Button> 
                        <Input variant="soft" onChange={(e) => { setCustomerCode(e.target.value) }} dir='rtl' style={{fontFamily:"Rubik"}} required placeholder="کد مشتری" />
                    </div>
                </form>
                <div className="mt-24 bg-sky-200 p-5 rounded-xl flex jusitfy-center" >
                    {loading == true ? <CircularProgress /> : <p></p>}
                    {showDetail == true ?
                        <div className="grid grid-cols-4  space-y-2" dir="rtl" >
                            <div className=" col-span-1" >
                                <p>نوع : {customerDetail.type}</p>
                            </div>
                            <div>
                                <p>نام : {customerDetail.name}</p>
                            </div>

                            <div>
                                <p>کدملی : {customerDetail.nationalCode}</p>
                            </div>

                            <div>
                                <p>ایمیل : {customerDetail.email}</p>
                            </div>
                            <div>
                                <p>موبایل : {customerDetail.mobile}</p>
                            </div>

                        </div>
                        :
                        <p></p>}
                </div>
            </div>

        </div>
    );
}
