import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaAppleAlt, FaBox, FaBoxes, FaChartPie, FaFileInvoice, FaFileInvoiceDollar, FaLock, FaReceipt, FaScrewdriver, FaServicestack, FaUser, FaWarehouse, FaWrench } from "react-icons/fa";
import HoormahIcon from "../../assets/Hoormah1_1.png";
import { Button } from "@mui/joy";
import { FaBoxArchive, FaBoxesPacking, FaFileCirclePlus, FaTicket, FaUsersViewfinder } from "react-icons/fa6";
export default function Sidebar() {
  var [userdata, setUserData] = useState({});
  var [loading, setLoading] = useState(false)
  function getUserData() {
    setLoading(true)
    axios
      .get("https://taxpayers.irkhadamat.com/api/User/CurrentUserInfo", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        setUserData(res.data.data);
        setLoading(false)

      })
      .catch((err) => {
        if (err.response.data.Error == "The User Is Not Valid.") {
          localStorage.removeItem('token')
          window.location = '/login'
        }
      });
  }
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <button
        type="button"
        class="inline-flex items-center p-2 mt-2 ml-3 sm gray-500 rounded-lg sm:hidden"
      >
        <span class="sr-only">Open sidebar</span>
        <FaAppleAlt />
      </button>

      <aside
        id="default-sidebar"
        dir="rtl"
        class=" top-0 left-0 hidden sm:block w-64 h-screen transition-transform bg-gray-100 -translate-x-full sm:translate-x-0 border border-gray-200"
        aria-label="Sidenav"
      >
        <div className="flex items-center bg-gray-50 justify-between space-x-5">
          <div className="flex items-center ">
            {userdata.companyLogoUrl ? (
              <img className="w-16 h-16 p-2" src={userdata.companyLogoUrl} />
            ) : (
              <img title="هورماه" className="w-16 h-16" src={HoormahIcon} />
            )}
            {
              loading ?
                <div role="status" class=" animate-pulse">
                  <div class="h-2.5 bg-gray-400 rounded-full " style={{ width: '100px' }} ></div>
                  <span class="sr-only">Loading...</span>
                </div>
                :
                <p className="font-regular px-2 text-sm ">{userdata.name}</p>
            }

          </div>
          <Button
            title="خروج"
            color="primary"
            onClick={function () {
              localStorage.removeItem("token");
              window.location.pathname = "/login";
            }}
            variant="soft"
          >
            <FaLock />
          </Button>
        </div>
        <div class="overflow-y-auto py-5 px-3  text-semibold ">
          <ul class="space-y-2">
            <li>
              <a
                href="products"
                class="flex space--3 items-center p-2  font-semibold  rounded-lg "
              >
                <FaBox className="mt-1.5 text-[#ad8762]" />
                <span class="px-3">محصولات</span>
              </a>
            </li>
            <li>
              <a
                href="productHolder"
                class="flex space--3 items-center p-2  font-semibold  rounded-lg "
              >
                <FaBoxes className="mt-1.5 text-[#ad7855]" />
                <span class="px-3">برند محصولات</span>
              </a>
            </li>
            <li>
              <a
                href="productTypes"
                class="flex space--3 items-center p-2  font-semibold  rounded-lg "
              >
                <FaBoxesPacking className="mt-1.5 text-sky-700" />
                <span class="px-3">نوع محصولات</span>
              </a>
            </li>
            <li>
              <a
                href="storage"
                class="flex space--3 items-center p-2  font-semibold  rounded-lg "
              >
                <FaWarehouse className="mt-1.5 text-red-600" />
                <span class="px-3">انبار</span>
              </a>
            </li>
            <li>
              <a
                href="customer"
                class="flex space--3 items-center p-2  font-semibold  rounded-lg "
              >
                <FaUser className="mt-1.5 text-emerald-600" />
                <span class="px-3">مشتری</span>
              </a>
            </li>
            <li>
              <a
                href="searchCustomers"
                class="flex space--3 items-center p-2  font-semibold  rounded-lg "
              >
                <FaUsersViewfinder className="mt-1.5 text-teal-600" />
                <span class="px-3">جستجو در مشتریان</span>
              </a>
            </li>
            <li>
              <a
                href="DefinedService"
                class="flex space--3 items-center p-2  font-semibold  rounded-lg "
              >
                <FaWrench className="mt-1.5 text-teal-600" />
                <span class="px-3">خدمات </span>
              </a>
            </li>
            <li>
              <a
                href="addInvoice"
                class="flex space--3 items-center p-2  font-semibold  rounded-lg "
              >
                <FaFileInvoiceDollar className="mt-1.5 text-teal-600" />
                <span class="px-3">فاکتور جدید محصول </span>
              </a>
            </li>

          </ul>
        </div>
      </aside>
    </div>
  );
}
