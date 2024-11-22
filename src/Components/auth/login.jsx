import { Button, Input } from "@mui/joy";
import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import HoormahIcon from "../../assets/Hoormahicon.png";
import { Slide, toast } from "react-toastify";
import axios from "axios";
export default function Login() {
  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");

  function Login(e) {
    e.preventDefault();
    console.log(username, "username");
    console.log(password, "password");
    if (username == "" || password == "password") {
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
    axios
      .get(
        `https://taxpayers.irkhadamat.com/api/User/Login?username=${username}&password=${password}`,{headers:{'AccessControlAllowOrigin':'*'}}
      )
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        toast.success("شما با موفقیت وارد شدید !", {
          position: "bottom-right",
          dir: "rtl",
          autoClose: 3000,
          closeOnClick: true,
          theme: "colored",
          rtl: true,
          transition: Slide,
        });
        window.location.pathname='/products'
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
    <div className="grid md:grid-cols-7" style={{overflowY:'none'}} dir="rtl" >
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
                <h2 className="text-4xl mb-16">ورود به حساب کاربری </h2>
              </div>
              <div class="flex justify-start my-1">
                <label className="text-base">نام کاربری </label>
              </div>
              <Input
                style={{ fontFamily: "Rubik" }}
                dir="rtl"
                color="neutral"
                placeholder="reza_mohammadi"
                size="lg"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
              />
              <div class="flex justify-start my-1 mt-4">
                <label className="text-base">رمز عبور</label>
              </div>
              <Input
                style={{ fontFamily: "Rubik" }}
                className="w-full mb-6"
                dir="rtl"
                color="neutral"
                placeholder="........"
                size="lg"
                variant="outlined"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                color="success"
                disabled={false}
                variant="solid"
                type="submit"
                className="w-full my-3"
              >
                ورود
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:col-span-4 loginbg   h-screen">
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
