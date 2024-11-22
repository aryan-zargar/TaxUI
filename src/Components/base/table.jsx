import axios from "axios";
import React, { useEffect, useState } from "react";
import { } from "react-icons/ai";
import {
  FaPlusCircle,
  FaPencilAlt,
  FaTrash,
  FaCheck,
  FaCross,
  FaArrowLeft,
  FaArrowRight,
  FaPen,
  FaArrowUp,
  FaArrowDown,
  FaHandPointUp,
} from "react-icons/fa";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/joy/Autocomplete";
import Modal from "@mui/material/Modal";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { FaDeleteLeft } from "react-icons/fa6";
import { Slide, toast, useToastContainer } from "react-toastify";
import { GiCrossMark } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import _, { set } from "lodash";
export default function Table(props) {
  const [dark, setDark] = React.useState(window.localStorage.getItem("dark"));
  var [isUpdate, setUpdate] = useState(false);
  var [updateId, setUpdateId] = useState("");
  var [data, setData] = useState([]);
  var [newFormData, SetFormData] = useState({});
  var [singleData, setSData] = useState({});
  var [paginationNumber, setPageNum] = useState(1);
  var [fullData, setFullData] = useState([]);
  var [dataLength, setFullDataLenght] = useState(0);
  var [ForeignKeyData, setkeyData] = useState({});
  var [ForeignKeyList, setKeyList] = useState({});
  var [isAdd, setAdd] = useState(false);
  var [isAscending, setAscending] = useState(false);
  var [isDescending, setDescending] = useState(false);
  var [isSorted, setSorted] = useState(false);
  var [sortingField, setSortingField] = useState("id");
  var [keyListLoading, setKeyListLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    SetFormData({});
    setUpdate(false);
    setSData({});
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  function sortData(field) {
    if (isSorted == false) {
      setSorted(true);
      setAscending(true);
      setSortingField(field);
      setFullData(_.orderBy(fullData, [field], ["asc"]));
    } else if (
      (isSorted == true, isAscending == true && isDescending == false)
    ) {
      setSorted(true);
      setAscending(false);
      setDescending(true);
      setSortingField(field);
      setFullData(_.orderBy(fullData, [field], ["desc"]));
    } else if ((isSorted == true, isAscending == false, isDescending == true)) {
      setSorted(false);
      setAscending(false);
      setDescending(false);
      setFullData(_.orderBy(fullData, ["id"], ["asc"]));
    }
  }
  async function fetchData(api) {
    if (props.path == "/products/") {
      axios
        .post(
          api + "GetAll",
          {
            typeID: null,
            model: props.model,
            code: props.code,
            take: null,
            skip: null,
          },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then((res) => {
          setData(res.data.data);
          setFullDataLenght(res.data.data.lenght);
        })
        .catch((err) => {
          toast.error(err.response.data.Error, {
            position: "bottom-right",
            dir: "rtl",
            autoClose: 3000,
            closeOnClick: true,
            theme: "colored",
            rtl: true,
            transition: Slide,
          });
          if (err.response.data.Error == "The User Is Not Valid.") {
            localStorage.removeItem("token");
            window.location.pathname = "/login";
          }
        });

    }
    else if (props.path == "/customer/") {
      axios
        .post(
          api + "GetAll",
          {
            name: props.CustomerName,
            mobile: props.mobile,
            phone: null,
            nationalCode: props.nationalCode
          },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then((res) => {
          setData(res.data.data);
          setFullDataLenght(res.data.data.lenght);
        })
        .catch((err) => {
          toast.error(err.response.data.Error, {
            position: "bottom-right",
            dir: "rtl",
            autoClose: 3000,
            closeOnClick: true,
            theme: "colored",
            rtl: true,
            transition: Slide,
          });
          if (err.response.data.Error == "The User Is Not Valid.") {
            localStorage.removeItem("token");
            window.location.pathname = "/login";
          }
        });
    }
    else {
      axios
        .get(api + "GetAll", {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {
          setData(res.data.data);
          setFullDataLenght(res.data.data.lenght);
        })
        .catch((err) => {
          toast.error(err.response.data.Error, {
            position: "bottom-right",
            dir: "rtl",
            autoClose: 3000,
            closeOnClick: true,
            theme: "colored",
            rtl: true,
            transition: Slide,
          });
          if (err.response.data.Error == "The User Is Not Valid.") {
            localStorage.removeItem("token");
            window.location.pathname = "/login";
          }
        });
    }
  }

  async function fetchSingleData(api, id, e) {
    setSData(data.find((e) => e.id === id));
    console.log(_.find(data, (e) => e.id == id));
    setUpdate(true);
    setUpdateId(id);
    e.preventDefault();
  }
  async function fetchKeyList(api, name, targetField) {
    setKeyListLoading(true);
    if (ForeignKeyList[`${name}`] == undefined) {
      await axios
        .get(`${api}GetAll`, {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {
          var GetData = res.data;
          for (let index = 0; index < GetData.lenght; index++) {
            const element = GetData[index];
            GetData[index].label = element[targetField];
          }
          setKeyListLoading(false);
          console.log(GetData.data);
          setKeyList((e) => ({
            ...e,
            [`${name}`]: GetData.data,
          }));
        });
    }
  }
  async function fetchKeyData(api, id, targetField, name) {
    if (ForeignKeyData[`${name}${id}`] == undefined) {
      await axios
        .get(`${api}GetAll`, {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {
          var data;
          res.data.data.forEach((element) => {
            if (element.id == id) {
              data = element;
            }
          });
          setkeyData((e) => ({ ...e, [`${name}${id}`]: data[targetField] }));
        });
    }
  }
  async function postData(data, api) {
    if (props.path == "/productTypes/") {
      await axios.post(api + `Create?typeName=${data["name"]}`, data, {
        headers: {
          "Content-Type": "*/*",
          token: localStorage.getItem("token"),
        },
      })
        .then(() => {
          fetchData(api);
          handleClose();
          SetFormData({});
          setAdd(false);
          toast.success("داده ثبت شد!", {
            position: "bottom-right",
            dir: "rtl",
            autoClose: 3000,
            closeOnClick: true,
            theme: "colored",
            rtl: true,
            transition: Slide,
          });
        })
        .catch((err) => {
          toast.error(err.response.data.Error, {
            position: "bottom-right",
            dir: "rtl",
            autoClose: 3000,
            closeOnClick: true,
            theme: "colored",
            rtl: true,
            transition: Slide,
          });
        });
    } else if (props.path == "/productHolder/") {
      await axios.post(api + `Create?holderName=${data["holderName"]}`, data, {
        headers: {
          "Content-Type": "*/*",
          token: localStorage.getItem("token"),
        },
      })
        .then(() => {
          fetchData(api);
          handleClose();
          SetFormData({});
          setAdd(false);
          toast.success("داده ثبت شد!", {
            position: "bottom-right",
            dir: "rtl",
            autoClose: 3000,
            closeOnClick: true,
            theme: "colored",
            rtl: true,
            transition: Slide,
          });
        })
        .catch((err) => {
          toast.error(err.response.data.Error, {
            position: "bottom-right",
            dir: "rtl",
            autoClose: 3000,
            closeOnClick: true,
            theme: "colored",
            rtl: true,
            transition: Slide,
          });
        });
    } else {
      await axios.post(api + "Create", data, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      })
        .then(() => {
          fetchData(api);
          handleClose();
          SetFormData({});
          setAdd(false);
          toast.success("داده ثبت شد!", {
            position: "bottom-right",
            dir: "rtl",
            autoClose: 3000,
            closeOnClick: true,
            theme: "colored",
            rtl: true,
            transition: Slide,
          });
        })
        .catch((err) => {
          toast.error(err.response.data.Error, {
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

    // window.location.pathname = props.path
  }
  async function postDataAndNew(data, api) {
    await axios.post(api, data, {
      headers: {
        "Content-Type": "*/*",
      },
    });
    await fetchData(api);
    handleClose();
    SetFormData({});
    toast.success("داده ثبت شد!", {
      position: "bottom-right",
      dir: "rtl",
      autoClose: 3000,
      closeOnClick: true,
      theme: "colored",
      rtl: true,
      transition: Slide,
    });
    setTimeout(() => {
      handleOpen();
    }, 500);
  }
  async function EditData(api, id, data) {
    data["id"] = id;
    await axios
      .put(`${api}Update/`, data, {
        headers: { token: localStorage.getItem("token") },
      })
      .then(() => {
        toast.success("رکورد با موفقیت تغییر یافت!", {
          position: "bottom-right",
          dir: "rtl",
          autoClose: 3000,
          closeOnClick: true,
          theme: "colored",
          rtl: true,
          transition: Slide,
        });
        fetchData(api);
        setUpdate(false);
      })
      .catch((err) => {
        toast.error(err.response.data.Error, {
          position: "bottom-right",
          dir: "rtl",
          autoClose: 3000,
          closeOnClick: true,
          theme: "colored",
          rtl: true,
          transition: Slide,
        });
      });
    console.log(data);
  }
  async function deleteData(api, id) {
    console.log(id);
    axios
      .delete(`${api}Delete?id=${id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        toast.success(res.data.data, {
          position: "bottom-right",
          dir: "rtl",
          autoClose: 3000,
          closeOnClick: true,
          theme: "colored",
          rtl: true,
          transition: Slide,
        });
        fetchData(props.api);
      })
      .catch((err) => {
        console.log(err);
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
    // window.location = "." + props.path;
  }

  async function setDataWithPagination() {
    var ExportData = [];
    for (
      let index = (paginationNumber - 1) * 10;
      index < paginationNumber * 10;
      index++
    ) {
      const element = data[index];
      if (element != undefined) {
        ExportData.push(element);
      }
    }
    await setFullData(ExportData);
  }
  useEffect(() => {
    fetchData(props.api);
  }, []);
  function changePaginationNum(num) {
    setPageNum(Number(num));
    setDataWithPagination();
  }
  function nextButtonCondition() {
    var len = data.length;
    if ((paginationNumber + 1) * 10 - 9 > len) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    setDataWithPagination();
  }, [data, paginationNumber]);
  return (
    <div>
      <div className="">
        <div dir="rtl" className="  mt-5 ">
          <Button
            onClick={() => (isUpdate != true ? setAdd(true) : "")}
            color="success"
            className="h-6 "
            variant="solid"
          >
            <FaPlusCircle className="cursor-pointer w-4 h-4   text-white" />
            <p className="mx-2 mb-1 ">{props.name} جدید</p>
          </Button>
          <div
            dir="rtl"
            className="relative overflow-x-auto shadow-md w-fit mt-3 rounded-lg"
          >
            <table className="w-full text-base text-left scroll-container  rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-sm text-gray-700 uppercase  bg-gray-200 dark:bg-gray-900 dark:text-gray-300">
                <tr className="mx-5">
                  {props.fields.map((e) => {
                    if (e.pk != true) {
                      return (
                        <th
                          onClick={() => sortData(e.title)}
                          className={` py-3 ${fullData.length == 0 ? "px-4" : ""
                            }  cursor-pointer`}
                        >
                          <p className="mx-auto flex  text-sm w-fit">
                            <FaArrowUp
                              className={`${isAscending == true && sortingField == e.title
                                ? ""
                                : "hidden"
                                }`}
                            />
                            <FaArrowDown
                              className={`${isAscending == false &&
                                isDescending == true &&
                                sortingField == e.title
                                ? ""
                                : "hidden"
                                }`}
                            />
                            {e.titleFa}
                          </p>
                        </th>
                      );
                    }
                  })}
                  <th className="px-5">-</th>
                </tr>
              </thead>

              <tbody className="max-h-72">
                {fullData.map((e) => {
                  return (
                    <tr className="  odd:bg-white duration-500 transition-all dark:hover:bg-blue-600 hover:bg-blue-300 odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-700 border-b dark:border-gray-700 px-10 ">
                      {props.fields.map((a) => {
                        if (a.pk != true) {
                          function numberWithCommas(x) {
                            return x
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          }
                          function numberWithSpace(x) {
                            var StringList = [...x];
                            if (StringList[4] != " " && StringList[8] != " ") {
                              StringList.splice(4, 0, " ");
                              StringList.splice(8, 0, " ");
                            }
                            var ReAssembledString = "";
                            StringList.forEach((element) => {
                              ReAssembledString = ReAssembledString + element;
                            });
                            return ReAssembledString;
                          }

                          var endvalue = e[a.title];

                          if (typeof e[a.title] == "number") {
                            endvalue = numberWithCommas(String(e[a.title]));
                          } else if (a.type == "phone") {
                            endvalue = numberWithSpace(String(e[a.title]));
                          }

                          if (a.type == "boolean") {
                            return (
                              <td
                                scope="row"
                                dir="ltr"
                                className="cursor-pointer px-6 py-3 font-sm text-gray-900 whitespace-nowrap dark:text-white w-[140px]"
                              >
                                <p className="flex justify-center">
                                  {endvalue === true ? (
                                    <FaCheck color="green" />
                                  ) : (
                                    <RxCross1 className=" text-red-500" />
                                  )}
                                </p>
                              </td>
                            );
                          } else if (a.type == "key") {
                            fetchKeyData(
                              a.keyapi,
                              e[a.title],
                              a.targetField,
                              a.title
                            );

                            if (isUpdate === true && updateId === e["id"]) {
                              newFormData[a.title] = e[a.title];
                              if (
                                ForeignKeyList[a.title] === undefined &&
                                keyListLoading != true
                              ) {
                                fetchKeyList(a.keyapi, a.title, a.targetField);
                              }
                              console.log(
                                ForeignKeyData[`${a.title}${e[a.title]}`]
                              );
                              if (ForeignKeyList[a.title] !== undefined) {
                                return (
                                  <td
                                    scope="row"
                                    dir="ltr"
                                    className="cursor-pointer px-6 py-3 font-sm text-gray-900 whitespace-nowrap dark:text-white w-[140px]"
                                  >
                                    {ForeignKeyList[a.title] !== undefined ? (
                                      <Autocomplete
                                        placeholder={a.titleFa}
                                        options={ForeignKeyList[a.title]}
                                        color="primary"
                                        disabled={false}
                                        size="sm"
                                        dir="rtl"
                                        onChange={(event, newValue) => {
                                          console.log(newValue);
                                          if (
                                            newValue != null &&
                                            newValue != undefined
                                          ) {
                                            newFormData[a.title] = newValue.id;
                                          } else {
                                            newFormData[a.title] = "";
                                          }
                                        }}
                                        getOptionLabel={(option) =>
                                          option[a.targetField]
                                        }
                                        defaultValue={{
                                          [a.targetField]:
                                            ForeignKeyData[
                                            `${a.title}${e[a.title]}`
                                            ],
                                          id: e[a.title],
                                        }}
                                        variant="outlined"
                                        className="dark:bg-slate-700 dark:text-white w-32"
                                      // defaultValue={ForeignKeyData[`${a.title}${e[a.title]}`]}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </td>
                                );
                              }
                            }
                            return (
                              <td
                                scope="row"
                                dir="ltr"
                                className="cursor-pointer px-6 py-3 font-xs text-sm text-gray-900 whitespace-nowrap dark:text-white w-[140px]"
                              >
                                {ForeignKeyData[`${a.title}${e[a.title]}`] !=
                                  undefined ? (
                                  <p className="flex justify-center">
                                    {ForeignKeyData[`${a.title}${e[a.title]}`]}
                                  </p>
                                ) : (
                                  <p>در حال بارگذاری</p>
                                )}
                              </td>
                            );
                          } else if (
                            isUpdate === true &&
                            updateId === e["id"]
                          ) {
                            console.log(props.fields);
                            console.log(a);

                            newFormData[a.title] = singleData[a.title];
                            return (
                              <td
                                scope="row"
                                dir="ltr"
                                className="cursor-pointer px-6 py-3 font-sm text-gray-900 whitespace-nowrap dark:text-white w-[140px]"
                              >
                                <Input
                                  color="primary"
                                  disabled={false}
                                  placeholder=""
                                  size="sm"
                                  dir="rtl"
                                  type={a.type}
                                  onChange={(e) => {
                                    if (a.type === 'number') {
                                      newFormData[a.title] = Number(e.target.value)
                                    }
                                    else{
                                      newFormData[a.title] = (e.target.value)
                                    }
                                  }
                                  }
                                variant="outlined"
                                defaultValue={
                                  a.type !== "number"
                                    ? e[a.title]
                                    : Number(e[a.title])
                                }
                                className="dark:bg-slate-700 dark:text-white w-32"
                                />
                              </td>
                            );
                          } else {
                            return (
                              <td
                                scope="row"
                                dir="ltr"
                                className="cursor-pointer px-6 py-3 font-xs text-sm text-gray-900 whitespace-nowrap dark:text-white w-[140px]"
                              >
                                <p className="flex justify-center">
                                  {endvalue}
                                </p>
                              </td>
                            );
                          }
                        }
                      })}
                      <td className="">
                        {isUpdate === true && updateId === e.id ? (
                          <div>
                            <FaCheck
                              className="cursor-pointer text-green-700 float-end"
                              onClick={() =>
                                EditData(props.api, e.id, newFormData)
                              }
                            />
                            <RxCross1
                              onClick={() => setUpdate(false)}
                              className="text-red-500 text-base cursor-pointer float-start "
                            />
                          </div>
                        ) : (
                          <>
                            <FaTrash
                              onClick={() => {
                                if (isAdd != true) {
                                  deleteData(props.api, e.id);
                                }
                              }}
                              className="text-red-500 text-sm cursor-pointer float-start "
                            />
                            <FaPen
                              onClick={(aa) => {
                                if (isAdd != true) {
                                  fetchSingleData(props.api, e.id, aa);
                                }
                              }}
                              className="text-yellow-500 text-sm cursor-pointer float-end mx-1"
                            />
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {isAdd == true ? (
                  <tr
                    className={` odd:bg-white duration-500 transition-all dark:hover:bg-blue-600 hover:bg-blue-300 odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-700 border-b dark:border-gray-700 px-10 `}
                  >
                    {props.fields.map((e) => {
                      if (!e.pk == true) {
                        if (e.type == "key") {
                          if (
                            ForeignKeyList[e.title] === undefined &&
                            keyListLoading !== true
                          ) {
                            console.log(ForeignKeyList[e.title], e.title);
                            fetchKeyList(e.keyapi, e.title, e.targetField);
                          }
                          return (
                            <td
                              scope="row"
                              dir="ltr"
                              className="cursor-pointer px-6 py-3 font-sm text-gray-900 whitespace-nowrap dark:text-white w-[140px]"
                            >
                              {ForeignKeyList[e.title] !== undefined &&
                                keyListLoading != true ? (
                                <Autocomplete
                                  placeholder={e.titleFa}
                                  options={ForeignKeyList[e.title]}
                                  color="primary"
                                  disabled={false}
                                  size="sm"
                                  dir="rtl"
                                  onChange={(event, newValue) => {
                                    console.log(newValue);
                                    if (newValue != null) {
                                      newFormData[e.title] = newValue.id;
                                    } else {
                                      newFormData[e.title] = "";
                                    }
                                  }}
                                  variant="outlined"
                                  getOptionLabel={(option) =>
                                    option[e.targetField]
                                  }
                                  className="dark:bg-slate-700 dark:text-white w-32"
                                // defaultValue={ForeignKeyData[`${a.title}${e[a.title]}`]}
                                />
                              ) : (
                                ""
                              )}
                            </td>
                          );
                        }
                        return (
                          <td
                            scope="row"
                            dir="ltr"
                            className="cursor-pointer px-6 py-3 font-sm text-gray-900 whitespace-nowrap dark:text-white w-[100px]"
                          >
                            <Input
                              color="primary"
                              disabled={false}
                              placeholder=""
                              size="sm"
                              dir="rtl"
                              type={e.type}
                              onChange={(ev) => {
                                newFormData[e.title] = ev.target.value;
                                if (e.type == "number") {
                                  newFormData[e.title] = Number(
                                    ev.target.value
                                  );
                                }
                              }}
                              variant="outlined"
                              className="dark:bg-slate-700 dark:text-white w-32"
                            />
                          </td>
                        );
                      }
                    })}
                    <td className="">
                      {/* <div > */}
                      <FaCheck
                        onClick={() => postData(newFormData, props.api)}
                        className="cursor-pointer text-green-700 float-end mx-1"
                      />
                      <RxCross1
                        onClick={() => setAdd(false)}
                        className="text-red-500 text-base cursor-pointer float-start mx-1 "
                      />
                      {/* </div> */}
                    </td>
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </table>
            {fullData.length == 0 && isAdd != true ? (
              <div className="w-full flex justify-center py-10 text-gray-500">
                هیچ داده ای برای نمایش وجود ندارد
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className=" mt-5">
        <div className="flex justify-center space-x-5" dir="ltr">
          {/* <p className='flex' ><FaArrowLeft className="mt-1" />قبلی</p>
           */}
          <Button
            variant="plain"
            disabled={paginationNumber == 1 ? true : false}
            onClick={() => changePaginationNum(paginationNumber - 1)}
          >
            <FaArrowLeft />
          </Button>
          <p className="mt-2 dark:text-white">{paginationNumber}</p>
          <Button
            variant="plain"
            disabled={nextButtonCondition()}
            onClick={() => changePaginationNum(paginationNumber + 1)}
          >
            <FaArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
