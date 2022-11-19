import React, { Component } from "react";
import DashboardButton  from "../../components/Buttons/sidebarButtons";
import LogoutButton from "../../admin/auth/Logout";
import voyageIcon from "../../assets/icons/svg/voyage";
import addTravelIcon from "../../assets/icons/svg/addTravel";
import displayTravelsIcon from "../../assets/icons/svg/displayTravels";
import statusIcon from "../../assets/icons/svg/status";
import busesIcon from "../../assets/icons/svg/buses";
import addBusesIcon from "../../assets/icons/svg/addBuses";
import busesInfoIcon from "../../assets/icons/svg/busesInfo";
import clientsIcon from "../../assets/icons/svg/clients";
import bookingIcon from "../../assets/icons/svg/booking";
import dashboardIcon from "../../assets/icons/svg/dashboard";
class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  render() {
    const Dashboard = {
      title: "Tableau de bord",
      icon: dashboardIcon.call(),
      route: "/admin",
      children: false
    };

    const Voyages = {
      title: "Voyages",
      icon: voyageIcon.call(),
      children: [
        {
          title: "Ajouter",
          icon: addTravelIcon.call(),
          route: "/admin/travel/create"
        },
        {
          title: "Modifier",
          icon: displayTravelsIcon.call(),
          route: "/admin/travel/edit"
        },
        {
          title: "Statut",
          icon: statusIcon.call(),
          route: "/admin/state"
        }
      ]
    };

    // const Buses = {
    //   title: "Buses",
    //   icon: busesIcon.call(),
    //   children: [
    //     {
    //       title: "Ajouter",
    //       icon: addBusesIcon.call(),
    //       route: "/admin/buses/create"
    //     },
    //     {
    //       title: "Toutes les info",
    //       icon: busesInfoIcon.call(),
    //       route: "/admin/buses"
    //     },
    //     {
    //       title: "Statut",
    //       icon: statusIcon.call()
    //     }
    //   ]
    // };

    const Buses = {
      title: "Buses",
      icon: busesIcon.call(),
      route: "/admin/buses",
      children: false
    };

    const Clients = {
      title: "Clients",
      icon: clientsIcon.call(),
      route: "/admin/clients",
      children: false
    };

    const Booking = {
      title: "Réservation",
      icon: bookingIcon.call(),
      route: "/admin/booking",
      children: false
    };

    return (
      <aside className="w-56" aria-label="Sidebar">
        <div className="flex flex-col justify-between overflow-y-auto h-[650px] py-4 pt-10 px-3 bg-[#212121]">
          <ul className="space-y-2">
            <li>
              <DashboardButton button={Dashboard}></DashboardButton>
            </li>

            {/* Voyages select */}
            <li className="flex items-center flex-col ">
              <DashboardButton button={Voyages}></DashboardButton>
            </li>
            {/* Buses select */}
            <li className="flex items-center flex-col ">
              <DashboardButton button={Buses}></DashboardButton>
            </li>
            {/* Clients select */}
            <li className="flex items-center ">
              <DashboardButton button={Clients}></DashboardButton>
            </li>
            {/* Booking select */}
            <li className="flex items-center ">
              <DashboardButton button={Booking}></DashboardButton>
            </li>
          </ul>
          <div className="">
            <LogoutButton />
          </div>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
