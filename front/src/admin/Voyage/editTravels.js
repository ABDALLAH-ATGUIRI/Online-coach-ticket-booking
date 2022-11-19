import React, { useRef, createRef, useEffect, useState } from "react";
import axios from "../../api/axios";
import Cookies from "universal-cookie";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/Buttons/crudButtons";
import AddIcon from "../../assets/icons/crud/add";
import AddBusAlert from "../../components/TableauCom/AddBusAlert";
import displayTravelsIcon from "../../assets/icons/svg/displayTravels";
import DeleteIcon from "../../assets/icons/crud/delete";
import UpdateIcon from "../../assets/icons/crud/update";
import AnnulerIcon from "../../assets/icons/crud/annuler";
import CheckIcon from "../../assets/icons/crud/check";
import FormVoyage from "../../components/TableauCom/formVoyage";
import BreakpointsVoyage from "../../components/TableauCom/breakpointsVoyage";

const EditTravels = () => {
  const BASE_URL = "/voyage";
  const [nowDate, setNowDate] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [data, setData] = useState([]);
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

  const del = {
    title: "Supprimer",
    icon: DeleteIcon.call(),
    color: "red",
    route: "/bus"
  };
  const update = {
    title: "Éditer",
    icon: UpdateIcon.call(),
    color: "blue",
    route: "/bus"
  };
  const annuler = {
    title: "Fermer",
    icon: AnnulerIcon.call(),
    color: "red",
    route: "/bus"
  };
  const add = {
    title: "Éditer",
    icon: CheckIcon.call(),
    color: "blue",
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
                        Modifier le voyage
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>

              <div className="flex justify-between sm:flex items-center md:divide-x md:divide-gray-100">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Modifier le voyage
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

        <div class="h-full my-2 bg-gray-100 flex flex-col mb-16 items-center justify-center">
          <div class="bg-white w-full rounded shadow-lg p-4 px-4 md:p-8">
            <FormVoyage />
            <hr />
            <BreakpointsVoyage />
          </div>
        </div>
        <div className="fixed bottom-0 w-full p-4 bg-orange-500 flex  z-50 justify-center align-center gap-10 ">
          <div
            className="w-1/6"
            //   onClick={() => {
            //     updateBus();
            //   }}
          >
            <Button info={add} className="bg-green-700"></Button>
          </div>
          <div
            className="w-1/6"
            //   onClick={() => {
            //     setUpdateField(true);
            //   }}
          >
            <Button info={annuler} className="bg-red-700"></Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditTravels;
