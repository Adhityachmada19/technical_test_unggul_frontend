import React from "react";

//import Link
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  return (
    <React.Fragment>
      <div className="list-group list-group-flush">
        <Link
          className={
            splitLocation[1] === "dashboard"
              ? "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active"
              : "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase"
          }
          to="/dashboard"
        >
          <i className="fa fa-tachometer-alt me-2"></i> Dashboard
        </Link>
        <Link
          className={
            splitLocation[1] === "pelanggan"
              ? "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active"
              : "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase"
          }
          to="/pelanggan"
        >
          <i className="fa fa-users me-2"></i> Pelanggan
        </Link>
        <Link
          className={
            splitLocation[1] === "barang"
              ? "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active"
              : "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase"
          }
          to="/barang"
        >
          <i className="fas fa-box me-2"></i> BARANG
        </Link>
        <Link
          className={
            splitLocation[2] === "penjualan"
              ? "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active"
              : "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase"
          }
          to="/penjualan"
        >
          <i className="fa fa-money-bill me-2"></i>Penjualan
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Sidebar;
