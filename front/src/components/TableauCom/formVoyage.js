import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import Cookies from "universal-cookie";
import useAuth from "../../hooks/useAuth";
import Multiselect from "multiselect-react-dropdown";
import Button from "../../components/Buttons/crudButtons";
import AddIcon from "../../assets/icons/crud/add";

const FormVoyage = ({ createVoyage }) => {
  const [cities, setCities] = useState("");
  const [buses, setBuses] = useState("");
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { setAuth } = useAuth();
  const cookie = new Cookies();
  const token = cookie.get("access-token", { path: "/admin" });
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    withCredentials: true
  };
  // state of inputs of add voyage
  const [bus, setBus] = useState("");
  const [depart, setDepart] = useState("");
  const [arrival, setArrival] = useState("");
  const [breakpoints, setBreakpoints] = useState([]);
  const [state, setState] = useState({});

  // button add
  const add = {
    title: "Ajouter",
    icon: AddIcon.call(),
    color: "green",
    route: "/bus"
  };

  // data of inputs
  const data = {
    bus: bus,
    depart_station: depart,
    arrival_station: arrival,
    breaking_point: breakpoints,
    state: state
  };

  // get List of  cities
  const Cities = async () => {
    await axios.get("/cities", config).then((req, res) => {
      try {
        const result = req?.data?.data;
        const success = req?.data?.success;
        if (success == 0) {
          setAuth({});
        }
        if (result && result.length == 0) {
          setErrMsg("données non définies");
        } else if (result) {
          setCities(result);
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  // get List of buses
  const Buses = async () => {
    await axios.get("/bus", config).then((req, res) => {
      try {
        const result = req?.data?.data;
        const success = req?.data?.success;
        if (success == 0) {
          setAuth({});
        }
        if (result && result.length == 0) {
          setErrMsg("données non définies");
        } else if (result) {
          setBuses(result);
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  useEffect(() => {
    Buses();
    Cities();
  }, []);

  return (
    <>
      <div class="grid gap-4 gap-y-2 mb-8 text-sm grid-cols-1 lg:grid-cols-4">
        <div class="text-gray-600">
          <p class="font-medium text-lg">Détails de voyages</p>
          <p>Please fill out all the fields.</p>
        </div>

        <div class="lg:col-span-3">
          <div class="grid gap-6 gap-y-2 text-sm grid-cols-2 md:grid-cols-2">
            <div class="md:col-span-1">
              <label
                for="depart"
                className="form-control block w-full uppercase px-2 py-2 text-xs font-medium text-gray-700"
              >
                GARE DE DÉPART
              </label>
              <select
                id="depart"
                className="form-control block w-full uppercase px-4 py-2 text-xs font-medium text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                required="true"
                value={depart}
                onChange={(e) => setDepart(e.target.value)}
              >
                <option value="" selected>
                  GARE DE DÉPART
                </option>
                {cities
                  ? cities.map((res) => {
                      return (
                        <option value={res.names.fr}>{res.names.fr}</option>
                      );
                    })
                  : null}
              </select>
            </div>

            <div class="md:col-span-1">
              <label
                for="arrival"
                className="form-control block w-full uppercase px-2 py-2 text-xs font-medium text-gray-700"
              >
                GARE D'ARRIVÉE
              </label>
              <select
                id="arrival"
                className="form-control block w-full uppercase px-4 py-2 text-xs font-medium text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                required="true"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
              >
                <option value="" selected>
                  <label for="arrival">GARE D'ARRIVÉE</label>
                </option>
                {cities
                  ? cities.map((res) => {
                      return (
                        <option value={res.names.fr}>{res.names.fr}</option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div class="md:col-span-1">
              <label
                for="bus"
                className="form-control block w-full uppercase px-2 py-2 text-xs font-medium text-gray-700"
              >
                BUS
              </label>

              <select
                id="bus"
                className="form-control block w-full uppercase px-4 py-2 text-xs font-medium text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                required="true"
                value={bus}
                onChange={(e) => setBus(e.target.value)}
              >
                <option value="" selected>
                  BUS
                </option>
                {buses
                  ? buses.map((res) => {
                      return <option value={res._id}>{res.bus}</option>;
                    })
                  : null}
              </select>
            </div>
            <div class="md:col-span-1 uppercase">
              <label
                for="busStatus"
                className="form-control block w-full uppercase px-2 py-2 text-xs font-medium text-gray-700"
              >
                statut du voyage
              </label>

              <select
                id="busStatus"
                className="form-control block w-full uppercase px-4 py-2 text-xs font-medium text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                required="true"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="" selected>
                  statut du voyage
                </option>
                <option value="inMaintenance">En maintenance</option>
                <option value="OutOfService">Hors service</option>
                <option value="inService">En service</option>
              </select>
            </div>
            <div class="md:col-span-2 uppercase">
              <label
                for="breakPoints"
                className="form-control block w-full uppercase px-2 py-2 text-xs font-medium text-gray-700"
              >
                point d'arrêt
              </label>
              {cities ? (
                <Multiselect
                  className=" w-full py-2 text-xs font-medium text-gray-700 bg-white bg-clip-padding  border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="breakPoints"
                  displayValue="key"
                  onKeyPressFn={function noRefCheck() {}}
                  onRemove={function noRefCheck() {}}
                  onSearch={function noRefCheck() {}}
                  onSelect={function noRefCheck(selectedList, selectedItem) {
                    const list = selectedList.map((res) => {
                      return res.cat;
                    });
                    setBreakpoints(list);
                  }}
                  options={cities.map((res) => {
                    return {
                      cat: res.names.fr,
                      key: res.names.fr
                    };
                  })}
                />
              ) : null}
            </div>
            <div class="md:col-span-2 flex justify-end uppercase">
              <div
                className="w-1/6"
                onClick={() => {
                  createVoyage(data);
                }}
              >
                <Button info={add} className="bg-green-700"></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormVoyage;
