//import React
import React, { useState, useEffect } from "react";

//import component bootstrap
import { NavDropdown } from "react-bootstrap";

//import Sidebar
import Sidebar from "../components/parent/Sidebar";

//import BASE URL API
import Api from "../api";

import PropTypes from "prop-types";
//import js cookie
import Cookies from "js-cookie";

//hook link
import { useNavigate } from "react-router-dom";

//import toats
import toast from "react-hot-toast";

const LayoutParent = ({ children }) => {
  //state user
  const [user, setUser] = useState({});

  //state toggle
  const [sidebarToggle, setSidebarToggle] = useState(false);

  //navigate
  const navigate = useNavigate();

  //token
  const token = Cookies.get("token");

  //function toggle hanlder
  const sidebarToggleHandler = (e) => {
    e.preventDefault();

    if (!sidebarToggle) {
      //add class on body
      document.body.classList.add("sb-sidenav-toggled");

      //set state "sidebarToggle" to true
      setSidebarToggle(true);
    } else {
      //remove class on body
      document.body.classList.remove("sb-sidenav-toggled");

      //set state "sidebarToggle" to false
      setSidebarToggle(false);
    }
  };

  //fetchData
  const fetchData = async () => {
    //fetch on Rest API
    await Api.get("/api/user", {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set state "user"
      setUser(response.data);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call function "fetchData"
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //function logout
  const logoutHandler = async (e) => {
    e.preventDefault();

    await Api.post("/api/auth/logout", null, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      //remove token
      Cookies.remove("token");

      //show toast
      toast.success("Logout Successfully.", {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      //redirect login page
      navigate("/login");
    });
  };

  return (
    <React.Fragment>
      <div className="d-flex sb-sidenav-toggled" id="wrapper">
        <div className="bg-white" id="sidebar-wrapper">
          <div className="sidebar-heading bg-light text-center">
            <i className="fa fa-home"></i> <strong>TOKO KU</strong>{" "}
            <small>ADMIN</small>
          </div>
          <Sidebar />
        </div>
        <div id="page-content-wrapper">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <button
                className="btn btn-success-dark"
                onClick={sidebarToggleHandler}
              >
                <i className="fa fa-list-ul"></i>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                  <NavDropdown
                    title={user.name}
                    className="fw-bold"
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item onClick={logoutHandler}>
                      <i className="fa fa-sign-out-alt me-2"></i> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container-fluid">{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

LayoutParent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutParent;
