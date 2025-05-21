//import react router dom

import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

//=======================================================================
//ADMIN
//=======================================================================

//import view Login
import Login from "../pages/auth/Login.jsx";
//import component private routes
import PrivateRoute from "./PrivateRoutes";
import Dashboard from "../pages/dashboard/index.jsx";

import Pelanggan from "../pages/pelanggan/Index.jsx";
import PelangganCreate from "../pages/pelanggan/Create.jsx";

import PelangganEdit from "../pages/pelanggan/Edit.jsx";

import Barang from "../pages/barang/Index.jsx";
import BarangCreate from "../pages/barang/Create.jsx";

import BarangEdit from "../pages/barang/Edit.jsx";

import Penjualan from "../pages/penjualan/Index.jsx";
import PenjualanDetail from "../pages/penjualan/Detail.jsx";
import PenjualanCreate from "../pages/penjualan/Create.jsx";
import PenjualanEdit from "../pages/penjualan/Edit.jsx";

function RoutesIndex() {
  const token = Cookies.get("token");

  return (
    <Routes>
      {/* redirect from "/" */}
      <Route
        path="/"
        element={
          token ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      {/* route "/admin/login" */}
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/pelanggan"
        element={
          <PrivateRoute>
            <Pelanggan />
          </PrivateRoute>
        }
      />

      <Route
        path="/pelanggan/tambah"
        element={
          <PrivateRoute>
            <PelangganCreate />
          </PrivateRoute>
        }
      />

      <Route
        path="/pelanggan/ubah/:id"
        element={
          <PrivateRoute>
            <PelangganEdit />
          </PrivateRoute>
        }
      />

      <Route
        path="/barang"
        element={
          <PrivateRoute>
            <Barang />
          </PrivateRoute>
        }
      />

      <Route
        path="/barang/tambah"
        element={
          <PrivateRoute>
            <BarangCreate />
          </PrivateRoute>
        }
      />

      <Route
        path="/barang/ubah/:id"
        element={
          <PrivateRoute>
            <BarangEdit />
          </PrivateRoute>
        }
      />

      <Route
        path="/penjualan"
        element={
          <PrivateRoute>
            <Penjualan />
          </PrivateRoute>
        }
      />

      <Route
        path="/penjualan/tambah"
        element={
          <PrivateRoute>
            <PenjualanCreate />
          </PrivateRoute>
        }
      />

      <Route
        path="/penjualan/detail/:id"
        element={
          <PrivateRoute>
            <PenjualanDetail />
          </PrivateRoute>
        }
      />

      <Route
        path="/penjualan/ubah/:id"
        element={
          <PrivateRoute>
            <PenjualanEdit />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default RoutesIndex;
