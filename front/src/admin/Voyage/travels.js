import React, { useRef, createRef, useEffect, useState } from "react";
import axios from "../../api/axios";
import Cookies from "universal-cookie";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/Buttons/crudButtons";
import AddIcon from "../../assets/icons/crud/add";
import AddBusAlert from "../../components/TableauCom/AddBusAlert";
import displayTravelsIcon from "../../assets/icons/svg/displayTravels";
import FiliedOfTableTravel from "../../components/TableauCom/filiedOfTableTravel";
const Travels = () => {
  const BASE_URL = "/voyage";
  const [errMsg, setErrMsg] = useState("");
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);
  const { setAuth } = useAuth();
  const [open, setOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const cookie = new Cookies();
  const token = cookie.get("access-token", { path: "/admin" });
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    withCredentials: true
  };

  const add = {
    title: "Ajouter",
    icon: AddIcon.call(),
    color: "orange",
    route: "/bus"
  };

  const getAll = async () => {
    await axios.get(BASE_URL, config).then((req, res) => {
      try {
        const result = req?.data?.data;
        const success = req?.data?.success;
        if (success == 0) {
          setAuth({});
        }
        if (result && result.length == 0) {
          setErrMsg("données non définies");
        } else if (result) {
          setData(result);
          setSuccess(true);
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  const addAlert = () => {
    open ? setOpen(false) : setOpen(true);
  };
  useEffect(() => {
    getAll();
    setRefreshData(false);
  }, [refreshData]);
  return (
    <>
      <section className="overflow-auto max-h-[650px]">
        <div className="p-4 bg-white block w-full sm:flex items-center justify-between border-b  border-gray-200 lg:mt-1.5">
          <div className="mb-1 w-full">
            <div className="mb-4">
              <nav className="flex mb-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                  <li className="inline-flex items-center">
                    <a
                      href="#"
                      className="text-gray-700 hover:text-gray-900 inline-flex gap-2 items-center"
                    >
                      {displayTravelsIcon.call()}
                      Voyages
                    </a>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <a
                        href="#"
                        className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium"
                      >
                        Tous les voyages
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>

              <div className="flex justify-between sm:flex items-center md:divide-x md:divide-gray-100">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Tous les voyages
                </h1>
                <div
                  onClick={addAlert}
                  className="flex items-center sm:justify-end"
                >
                  <Button info={add} className="bg-orange-500"></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow ">
              <table className="table-fixed min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr className="w-full text-center">
                    <th
                      scope="col"
                      className="p-4 w-1/6 text-xs font-medium text-gray-500 uppercase"
                    >
                      Gare de départ
                    </th>
                    <th
                      scope="col"
                      className="p-4 w-1/6 text-xs font-medium text-gray-500 uppercase"
                    >
                      Gare d'arrivée
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-gray-500 uppercase"
                    >
                      Nom de bus
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-gray-500 uppercase"
                    >
                      date de départ
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-gray-500 uppercase"
                    >
                      date d'arrivée
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-gray-500 uppercase"
                    >
                      Statut
                    </th>
                    <th scope="col" className="p-4"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {open ? (
                    <AddBusAlert
                      setOpen={() => {
                        setOpen();
                      }}
                      setState={() => {
                        setRefreshData();
                      }}
                    />
                  ) : null}

                  {data
                    ? data.map((element, index) => {
                        return (
                          <FiliedOfTableTravel
                            open={open}
                            setOpen={() => {
                              setOpen();
                            }}
                            setState={() => {
                              setRefreshData();
                            }}
                            element={element}
                          />
                        );
                      })
                    : null}

                  {/* {{ end -}}
                    {{< /products.inline >}}                        */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
          {data.length > 20 ? (
            <>
              <div className="flex items-center mb-4 sm:mb-0">
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                >
                  <svg
                    className="w-7 h-7"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2"
                >
                  <svg
                    className="w-7 h-7"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
                <span className="text-sm font-normal text-gray-500">
                  Showing
                  <span className="text-gray-900 font-semibold">
                    1-20
                  </span> of{" "}
                  <span className="text-gray-900 font-semibold">
                    {data.length}
                  </span>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href="#"
                  className="flex-1 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
                >
                  <svg
                    className="-ml-1 mr-1 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Previous
                </a>
                <a
                  href="#"
                  className="flex-1 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
                >
                  Next
                  <svg
                    className="-mr-1 ml-1 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </>
          ) : null}
        </div> */}
      </section>
    </>
  );
};

export default Travels;
