import React from "react";
import { Header, Footer, Sidebar } from "../components/index";
import { Routes, Route, Switch } from "react-router-dom";
import {
  Dashboard,
  CreateTravels,
  Travels,
  EditTravels,
  Buses,
  TravelsState,
  Login
} from "./index";
const router = () => {
  return (
    <>
      <Header />
      <div className="flex max-h-full">
        <Sidebar />
        <div className="w-full overflow-auto">
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="travel" exact element={<Travels />} />
            <Route path="travel/edit" exact element={<Travels />} />
            <Route path="travel/create" exact element={<CreateTravels />} />
            <Route path="travel/state" exact element={<TravelsState />} />
            <Route path="buses" exact element={<Buses />} />
            <Route path="uses/create" exact element={<CreateTravels />} />
            <Route path="buses/state" exact element={<TravelsState />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default router;
