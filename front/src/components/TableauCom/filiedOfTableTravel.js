import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import Cookies from "universal-cookie";
import DeleteIcon from "../../assets/icons/crud/delete";
import UpdateIcon from "../../assets/icons/crud/update";
import Button from "../Buttons/crudButtons";

const FiliedOfTableTravel = ({ element, ...rest }) => {
  const [entryTime, setEntryTime] = useState("");
  const [exitTime, setExitTime] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const cookie = new Cookies();
  const token = cookie.get("access-token", { path: "/admin" });
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    withCredentials: true
  };
  const update = {
    title: "Plus de détails",
    icon: UpdateIcon.call(),
    color: "blue",
    route: "/bus"
  };
  useEffect(() => {
    if (element.Trips[0]?.entry_time) {
      setEntryTime(
        new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        }).format(element.Trips[0]?.entry_time)
      );
      setExitTime(
        new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        }).format(element.Trips[element.Trips.length - 1].exit_time)
      );
    }
  }, []);

  return (
    <tr className="hover:bg-gray-100 w-full text-center">
      <td className="p-4 whitespace-nowrap w-1/6 text-sm font-normal text-gray-500">
        <div className="text-base font-semibold text-gray-900">
          {element.depart_station}
        </div>
      </td>
      <td className="p-4 whitespace-nowrap w-1/6 text-sm font-normal text-gray-500">
        <div className="text-base font-semibold text-gray-900">
          {element.arrival_station}
        </div>
        {/* <div className="text-sm font-normal text-gray-500">#</div> */}
      </td>
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
        {element?.bus?.bus}
      </td>
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
        {entryTime}
      </td>
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
        {exitTime}
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
        //   onClick={() => {
        //     open
        //       ? setOpen(false) && setUpdateField(true)
        //       : setUpdateField(false);
        //   }}
        >
          <Button info={update} className="bg-blue-800"></Button>
        </div>
      </td>
    </tr>
  );
};

export default FiliedOfTableTravel;
