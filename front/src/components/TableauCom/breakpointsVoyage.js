import React, { useRef, createRef, useEffect, useState } from "react";
import axios from "../../api/axios";
import Cookies from "universal-cookie";
import useAuth from "../../hooks/useAuth";

const BreakpointsVoyage = ({ elements }) => {
  const [nowDate, setNowDate] = useState("");
  console.log(elements);
  // form value
  const [depart, setDepart] = useState(elements?.departure_station);
  const [arrival, setArrival] = useState(elements?.arrival_station);
  const [departDate, setDepartDate] = useState(elements?.entry_time);
  const [arrivalDate, setArrivalDate] = useState(elements?.exit_time);
  const [price, setPrice] = useState(elements?.prix);

  elements = {
    departure_station: depart,
    arrival_station: arrival,
    entry_time: departDate,
    exit_time: arrivalDate,
    prix: price
  };

  // get now date with formate to morocco date
  const valDate = () => {
    const date = new Date();
    setNowDate(
      new Intl.DateTimeFormat("af-ZA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).format(date)
    );
  };

  useEffect(() => {
    valDate();
  }, []);
  return (
    <>
      <hr />
      <div class="grid gap-4 gap-y-2 my-10 text-sm grid-cols-1 lg:grid-cols-4">
        <div class="text-gray-600"></div>

        <div class="lg:col-span-3">
          <h1 className="font-extrabold text-center text-2xl py-4 text-orange-500">
            {depart + " => " + arrival}
          </h1>
          <div class="grid gap-6 gap-y-2 text-sm grid-cols-2 md:grid-cols-2">
            <div class="md:col-span-1">
              <label
                for="depart"
                className="form-control block w-full uppercase px-2 py-2 text-xs font-medium text-gray-700"
              >
                GARE DE DÉPART
              </label>
              <input
                type="text"
                id="depart"
                className="form-control block w-full uppercase px-4 py-2 text-xs font-medium text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                required="true"
                readOnly="true"
                value={depart}
              />
            </div>

            <div class="md:col-span-1">
              <label
                for="arrival"
                className="form-control block w-full uppercase px-2 py-2 text-xs font-medium text-gray-700"
              >
                GARE D'ARRIVÉE
              </label>
              <input
                type="text"
                id="arrival"
                className="form-control block w-full uppercase px-4 py-2 text-xs font-medium text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                required="true"
                readOnly="true"
                value={arrival}
              />
            </div>

            <div class="md:col-span-1">
              <label
                for="departDate"
                className="form-control block w-full uppercase px-2 py-2 text-xs font-medium text-gray-700"
              >
                DATE DE DÉPART
              </label>
              <input
                type="datetime-local"
                id="departDate"
                className="form-control block w-full uppercase px-4 py-2 text-xs font-medium text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                required="true"
                min={nowDate}
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
              />
            </div>

            <div class="md:col-span-1">
              <label
                for="arrivalDate"
                className="form-control block w-full uppercase px-2 py-2 text-xs font-medium text-gray-700"
              >
                DATE D'ARRIVÉE
              </label>
              <input
                type="datetime-local"
                id="arrivalDate"
                className="form-control block w-full uppercase px-4 py-2 text-xs font-medium text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                required="true"
                min={departDate || nowDate}
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
              />
            </div>
            <div class="md:col-span-2">
              <label
                for="price"
                className="form-control block w-full uppercase px-2 py-2 text-xs font-medium text-gray-700"
              >
                LE PRIX
              </label>

              <input
                type="number"
                id="price"
                className="form-control block w-full uppercase px-4 py-2 text-xs font-medium text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                required="true"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreakpointsVoyage;
