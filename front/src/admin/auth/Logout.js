import React, { useEffect, useState, useRef, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import Cookies from "universal-cookie";
import logoutIcon from "../../assets/icons/svg/logout";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Logout() {
  const { setAuth } = useAuth();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.sate?.from?.pathname || "/admin/login";
  const handleSubmit = async (e) => {
    cookies.remove("access-token", { path: "/admin" });
    setAuth({});
    navigate(from, { replace: false });
  };
  return (
    <>
      <button
        className="flex justify-start items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={handleSubmit}
      >
        {logoutIcon.call()}
        <span className="flex-1 ml-3 text-[#FE5008] font-bold whitespace-nowrap">
          Se déconnecter
        </span>
      </button>
    </>
  );
}

export default Logout;
