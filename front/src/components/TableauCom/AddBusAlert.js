import React, { useEffect, useState } from "react";
import Button from "../Buttons/crudButtons";
import AddIcon from "../../assets/icons/crud/add";
import AnnulerIcon from "../../assets/icons/crud/annuler";
import Cookies from "universal-cookie";
import axios from "../../api/axios";
import Swal from "sweetalert2";

const AddBusAlert = ({ setState, setOpen, ...rest }) => {
  const BASE_URL = "/bus";
  const [busName, setBusName] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [busSeats, setBusSeats] = useState("");
  const [busState, setBusState] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const cookie = new Cookies();
  const token = cookie.get("access-token", { path: "/admin" });

  const add = {
    title: "Ajouter",
    icon: AddIcon.call(),
    color: "green",
    route: "/bus"
  };
  const data = {
    bus: busName,
    busNumber: busNumber,
    seatsNumber: busSeats,
    statut: busState
  };
  const annuler = {
    title: "Fermer",
    icon: AnnulerIcon.call(),
    color: "red",
    route: "/bus"
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    withCredentials: true
  };

  const handleSubmit = async (e) => {
    if (Object.values(data).some((v) => !v)) {
      return Swal.fire({
        position: "center-center",
        icon: "error",
        title: "Une des cases est vide",
        showConfirmButton: false,
        timer: 1000
      });
    } else {
      await axios
        .post(BASE_URL, JSON.stringify(data), config)
        .then((req, res) => {
          
          try {
            const result = req?.data?.data;
            if (result) {
              Swal.fire({
                position: "center-center",
                title: "L'ajout est réussi",
                icon: "success",
                showConfirmButton: false,
                timer: 1000,
                width: 500
              }).then((req) => {
                setState(true);
              });
            } else {
              Swal.fire({
                position: "center-center",
                icon: "error",
                title: "L'identifiant du bus existe déjà",
                showConfirmButton: false,
                timer: 1000
              });
            }
          } catch (error) {
            Swal.fire({
              position: "center-center",
              icon: "error",
              title: "Il y a une erreur Retour à la page d'accueil",
              showConfirmButton: false,
              timer: 1000
            });
          }
        });
    }
  };
  return (
    <>
      <tr className=" bg-orange-300 w-full">
        <td></td>
        <td className="p-4 whitespace-nowrap text-sm w-3/12 font-normal text-gray-500">
          <div className="text-base font-semibold text-gray-900">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xs font-medium text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput2"
              placeholder="NOM DE L'AUTOBUS"
              value={busName}
              onChange={(e) => setBusName(e.target.value)}
              required
            />
          </div>
          {/* <div className="text-sm font-normal text-gray-500">#</div> */}
        </td>
        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
          <input
            type="text"
            className="form-control block w-full px-4 py-2 text-xs font-medium text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="NOM DE L'AUTOBUS"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            required
          />
        </td>
        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
          <input
            type="text"
            className="form-control block uppercase w-full px-4 py-2 text-xs font-medium text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Numéro d'autobus"
            value={busSeats}
            onChange={(e) => setBusSeats(e.target.value)}
            required
          />
        </td>
        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
          <select
            id="status"
            className="form-control block w-full uppercase px-4 py-2 text-xs font-medium text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            value={busState}
            onChange={(e) => setBusState(e.target.value)}
            required
          >
            <option selected value="">
              état du bus
            </option>
            <option value="inMaintenance">En maintenance</option>
            <option value="OutOfService">Hors service</option>
            <option value="inService">En service</option>
          </select>
        </td>
        <td className="p-4 flex whitespace-nowrap space-x-2 w-64">
          <div onClick={handleSubmit}>
            <Button info={add} className="bg-green-700"></Button>
          </div>
          <div
            onClick={() => {
              setOpen(true);
            }}
          >
            <Button info={annuler} className="bg-red-700"></Button>
          </div>
        </td>
      </tr>
    </>
  );
};
export default AddBusAlert;
