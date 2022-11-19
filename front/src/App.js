import React, { useState, useEffect, Component } from "react";
import { Routes, Route, Router } from "react-router-dom";
import AdminRoutes from "./admin/router";
import RequireAuth from "./utils/RequireAuth";
import AdminLogin from "./admin/auth/Login";

class App extends Component {
  render() {
    const location = window.location.pathname;
    const role = location.split("/")[1] == "admin";
    if (role) {
      return (
        <>
          <Routes>
            <Route path="admin/login" element={<AdminLogin />}></Route>
            <Route element={<RequireAuth />}>
              <Route path="admin/*" element={<AdminRoutes />} />
            </Route>
          </Routes>
        </>
      );
    }
  }
}

export default App;
