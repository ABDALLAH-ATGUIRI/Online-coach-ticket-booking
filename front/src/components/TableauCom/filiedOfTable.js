import React, { useEffect, useState } from "react";
import DeleteIcon from "../../assets/icons/crud/delete";
import UpdateIcon from "../../assets/icons/crud/update";
import AnnulerIcon from "../../assets/icons/crud/annuler";
import CheckIcon from "../../assets/icons/crud/check";
import Button from "../Buttons/crudButtons";
import Cookies from "universal-cookie";
import axios from "../../api/axios";
import Swal from "sweetalert2";

const FiliedOfTable = ({ element, open, setOpen, setState, ...rest }) => {
  const BASE_URL = "/bus/";
  const [updateField, setUpdateField] = useState(true);
  const [busName, setBusName] = useState(element.bus);
  const [busNumber, setBusNumber] = useState(element.busNumber);
  const [busSeats, setBusSeats] = useState(element.seatsNumber);
  const [busState, setBusState] = useState(element.statut);
  const [empty, setEmpty] = useState(false);
  const cookie = new Cookies();
  const token = cookie.get("access-token", { path: "/admin" });
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    withCredentials: true
  };
  const data = {
    bus: busName,
    busNumber: busNumber,
    seatsNumber: busSeats,
    statut: busState
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
  const check = {
    title: "Éditer",
    icon: CheckIcon.call(),
    color: "blue",
    route: "/bus"
  };

  const updateBus = async (e) => {
    if (Object.values(data).some((v) => !v)) {
      return Swal.fire({
        position: "center-center",
        icon: "error",
        title: "Une des cases est vide",
        showConfirmButton: false,
        timer: 1000
      });
    }
    await axios
      .put(BASE_URL + element._id, JSON.stringify(data), config)
      .then((req, res) => {
        try {
          const result = req?.data?.data;
          console.log(result);

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
              setUpdateField(true);
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
  };

  const deleteBus = async (e) => {
    await axios.delete(BASE_URL + element._id, config).then((req, res) => {
      try {
        const result = req?.data?.success;
        console.log(req);
        if (result) {
          Swal.fire({
            position: "center-center",
            title: "Il a été supprimé avec succès",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
            width: 500
          }).then((req) => {
            setState(true);
            setUpdateField(true);
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
  };
  useEffect(() => {
    setUpdateField(true);
  }, [open]);
  return updateField ? (
    <tr className="hover:bg-gray-100 w-full text-center">
      <td className="p-4 w-4">
        <div className="flex items-center"></div>
      </td>
      <td className="p-4 whitespace-nowrap w-1/6 text-sm font-normal text-gray-500">
        <div className="text-base font-semibold text-gray-900">
          {element.bus}
        </div>
        {/* <div className="text-sm font-normal text-gray-500">#</div> */}
      </td>
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
        {element.busNumber}
      </td>
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
        {element.seatsNumber}
      </td>
      <td className="p-4 whitespace-nowrap text-base w-1/6 font-medium text-gray-900">
        {element.statut == "inMaintenance"
          ? "en maintenance"
          : element.statut == "Hors service"
          ? "OutOfService"
          : "En service"}
      </td>
      <td className="flex p-4  whitespace-nowrap space-x-2 w-auto">
        <div
          onClick={() => {
            open
              ? setOpen(false) && setUpdateField(true)
              : setUpdateField(false);
          }}
        >
          <Button info={update} className="bg-blue-800"></Button>
        </div>
        <div onClick={deleteBus}>
          <Button info={del} className="bg-red-800"></Button>
        </div>
      </td>
    </tr>
  ) : (
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
          <option value="" selected>
            état du bus
          </option>
          <option value="inMaintenance">En maintenance</option>
          <option value="OutOfService">Hors service</option>
          <option value="inService">En service</option>
        </select>
      </td>
      <td className="p-4 flex whitespace-nowrap space-x-2 w-64">
        <div
          onClick={() => {
            updateBus();
          }}
        >
          <Button info={check} className="bg-green-700"></Button>
        </div>
        <div
          onClick={() => {
            setUpdateField(true);
          }}
        >
          <Button info={annuler} className="bg-red-700"></Button>
        </div>
      </td>
    </tr>
  );
};
export default FiliedOfTable;
