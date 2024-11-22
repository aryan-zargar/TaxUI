import { Button, Input } from "@mui/joy";
import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import HoormahIcon from "../../assets/Hoormahicon.png";
import { Slide, toast } from "react-toastify";
import axios from "axios";
export default function Register() {
  var [username, setUsername] = useState("");
  var [name, setname] = useState("");
  var [nationalId, setNationalId] = useState("");
  var [commercialCode, setCommercialCode] = useState("");
  var [phoneNumber, setPhoneNumber] = useState("");

  function Login(e) {
    e.preventDefault();
    console.log(username, "username");
    console.log(name, "password");
    if (
      username == "" ||
      name == "" ||
      commercialCode == "" ||
      nationalId == "" ||
      phoneNumber == ""
    ) {
      toast.error("لطفا تمامی فیلد ها را پر کنید !", {
        position: "bottom-right",
        dir: "rtl",
        autoClose: 3000,
        closeOnClick: true,
        theme: "colored",
        rtl: true,
        transition: Slide,
      });
      return;
    }
    console.log({
        name: name,
        userName: username,
        commercialCode: commercialCode,
        nationalID: nationalId,
        mobile: phoneNumber,
      })
    axios.post(`https://taxpayers.irkhadamat.com/api/User/Register`, {
        name: name,
        userName: username,
        commercialCode: commercialCode,
        nationalID: nationalId,
        mobile: phoneNumber,
      },{withCredentials:false,})
      .then((res) => {
        toast.success("ثبت نام شما موفقیت آمیز بود!", {
          position: "bottom-right",
          dir: "rtl",
          autoClose: 3000,
          closeOnClick: true,
          theme: "colored",
          rtl: true,
          transition: Slide,
        });
        window.location.pathname = "/login";
      })
      .catch((err) => {
        toast.error(err.response.data.error, {
          position: "bottom-right",
          dir: "rtl",
          autoClose: 3000,
          closeOnClick: true,
          theme: "colored",
          rtl: true,
          transition: Slide,
        });
      });
  }
  return (
    <div dir="rtl" className="grid md:grid-cols-7">
      <div className="md:col-span-3 border">
        <div className="flex h-screen justify-center ">
          <div className=" w-[30rem]  p-10  rounded-xl self-center  ">
            <form
              action=""
              onSubmit={(e) => {
                Login(e);
              }}
            >
              <div className="flex justify-start">
                <h2 className="text-4xl mb-10">ثبت نام</h2>
              </div>
              <div class="flex justify-start my-1">
                <label className="text-base">نام کامل </label>
              </div>
              <Input
                style={{ fontFamily: "Rubik" }}
                dir="rtl"
                color="neutral"
                placeholder="رضا محمدی"
                size="lg"
                variant="outlined"
                onChange={(e) => setname(e.target.value)}
              />
              <div class="flex justify-start my-1 mt-4">
                <label className="text-base">نام کاربری</label>
              </div>
              <Input
                style={{ fontFamily: "Rubik" }}
                className="w-full "
                dir="rtl"
                color="neutral"
                placeholder="reza_mohammadi"
                size="lg"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
              />
              <div class="flex justify-start my-1 mt-4">
                <label className="text-base">شماره اقتصادی </label>
              </div>
              <Input
                style={{ fontFamily: "Rubik" }}
                className="w-full mb-6"
                dir="rtl"
                color="neutral"
                placeholder="12345678910"
                size="lg"
                variant="outlined"
                onChange={(e) => setCommercialCode(e.target.value)}
              />
              <div class="flex justify-start my-1 mt-4">
                <label className="text-base">کد ملی </label>
              </div>
              <Input
                style={{ fontFamily: "Rubik" }}
                className="w-full mb-6"
                dir="rtl"
                color="neutral"
                placeholder="0960200000"
                size="lg"
                variant="outlined"
                onChange={(e) => setNationalId(e.target.value)}
              />
              <div class="flex justify-start my-1 mt-4">
                <label className="text-base"> شماره موبایل </label>
              </div>
              <Input
                style={{ fontFamily: "Rubik" }}
                className="w-full mb-6"
                dir="rtl"
                color="neutral"
                placeholder="09120010001"
                size="lg"
                variant="outlined"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button
                color="success"
                disabled={false}
                variant="solid"
                type="submit"
                className="w-full my-3"
              >
                ثبت
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:col-span-4 regbg bg-purple-300  h-screen">
        <div className="flex justify-center h-full">
          <div className="self-center text-center">
            <img className="" src={HoormahIcon} />

            <h2 className="text-5xl my-7 font-bold text-white"> هورماه </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
