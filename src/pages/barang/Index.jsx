//import react
import React, { useState, useEffect } from "react";

//import layout admin
import LayoutParent from "../../layouts/Parent";

import Api from "../../api";

//import pagination component

//import js cookie
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import PaginationComponent from "../../components/parent/Pagination";

//import toats
import toast from "react-hot-toast";

//import react-confirm-alert
import { confirmAlert } from "react-confirm-alert";
import FormatRupiah from "../../components/parent/FormatRupiah";

function Barang() {
  //title page
  document.title = "Barang - Toko Ku";

  //state posts
  const [barang, setBarang] = useState([]);

  const [loading, setLoading] = useState(false);
  //state currentPage
  const [currentPage, setCurrentPage] = useState(1);

  //state perPage
  const [perPage, setPerPage] = useState(0);

  //state total
  const [total, setTotal] = useState(0);

  //state search
  const [search, setSearch] = useState("");

  //token
  const token = Cookies.get("token");

  //function "fetchData"
  const fetchData = async (pageNumber, searchData) => {
    //define variable "page"
    const page = pageNumber ? pageNumber : currentPage;

    //define variable "searchQuery"
    const searchQuery = searchData ? searchData : search;
    //fetching data from Rest API

    setLoading(true);
    await Api.get(`/api/barang/list?search=${searchQuery}&page=${page}`, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data response to state "categories"
      setBarang(response.data.data.data);

      //set currentPage
      setCurrentPage(response.data.data.current_page);

      //set perPage
      setPerPage(response.data.data.per_page);

      //total
      setTotal(response.data.data.total);
      setLoading(false);
    });
  };

  //function "searchHandler"
  const searchHandlder = (e) => {
    e.preventDefault();

    //call function "fetchDataPost" with params
    fetchData(1, search);
  };

  //function "deletePelanggan"
  const deleteBarang = (id) => {
    // alert("HEllo", id);
    //show confirm alert
    confirmAlert({
      title: "Apakah Kamu Yakin ?",
      message: "ingin menghapus data ini ?",
      buttons: [
        {
          label: "Ya Hapus",
          onClick: async () => {
            await Api.delete(`/api/barang/delete/${id}`, {
              headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
              },
            }).then(() => {
              //show toast
              toast.success("Data Berhasil Dihapus", {
                duration: 4000,
                position: "top-right",
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              });
              //call function "fetchData"
              fetchData();
            });
          },
        },
        {
          label: "TIdak",
          onClick: () => {},
        },
      ],
    });
  };

  //hook
  useEffect(() => {
    //call function "fetchData"
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <LayoutParent>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="font-weight-bold">
                  <i className="fa fa-box"></i> BARANG
                </span>
              </div>
              <div className="card-body">
                <form onSubmit={searchHandlder} className="form-group">
                  <div className="input-group mb-3">
                    <Link
                      to="/barang/tambah"
                      className="btn btn-md btn-success"
                    >
                      <i className="fa fa-plus-circle"></i> Tambah Data
                    </Link>
                    <input
                      type="text"
                      className="form-control"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Cari Berdasarkan Kode dan Nama"
                    />
                    <button type="submit" className="btn btn-md btn-success">
                      <i className="fa fa-search"></i> Cari
                    </button>
                  </div>
                </form>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hovered">
                    <thead>
                      <tr>
                        <th className="text-center" scope="col">
                          No.
                        </th>
                        <th className="text-center" scope="col">
                          Kode Barang
                        </th>
                        <th className="text-center" scope="col">
                          Nama Barang
                        </th>
                        <th className="text-center" scope="col">
                          Jenis Barang
                        </th>

                        <th className="text-center" scope="col">
                          Harga
                        </th>
                        <th className="text-center" scope="col">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={6} className="text-center">
                            Loading ...
                          </td>
                        </tr>
                      ) : barang.length > 0 ? (
                        barang.map((bar, index) => (
                          <tr key={index}>
                            <td className="text-center">
                              {++index + (currentPage - 1) * perPage}
                            </td>
                            <td className="text-center">{bar.kode}</td>
                            <td className="text-center">{bar.nama}</td>
                            <td className="text-center">{bar.kategori}</td>
                            <td className="text-center">
                              <FormatRupiah angka={parseInt(bar.harga)} />
                            </td>
                            <td className="text-center">
                              <Link
                                to={`/barang/ubah/${bar.kode}`}
                                className="btn btn-sm btn-primary me-2"
                              >
                                <i className="fa fa-pencil-alt"></i>
                              </Link>
                              <button
                                onClick={() => deleteBarang(bar.kode)}
                                className="btn btn-sm btn-danger"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center">
                            Data Belum Tersedia
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <PaginationComponent
                    currentPage={currentPage}
                    perPage={perPage}
                    total={total}
                    onChange={(pageNumber) => fetchData(pageNumber)}
                    position="end"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutParent>
    </React.Fragment>
  );
}

export default Barang;
