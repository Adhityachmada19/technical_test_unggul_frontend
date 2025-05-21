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

function Penjualan() {
  //title page
  document.title = "Penjualan - Toko Ku";

  //state posts
  const [penjualan, setPenjualan] = useState([]);

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
    await Api.get(`/api/penjualan/list?search=${searchQuery}&page=${page}`, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data response to state "categories"
      setPenjualan(response.data.data.data);

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
  const deletePenjualan = (id) => {
    // alert("HEllo", id);
    //show confirm alert
    confirmAlert({
      title: "Apakah Kamu Yakin ?",
      message: "ingin menghapus data ini ?",
      buttons: [
        {
          label: "Ya Hapus",
          onClick: async () => {
            await Api.delete(`/api/penjualan/delete/${id}`, {
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
                  <i className="fa fa-money-bill"></i> Penjualan
                </span>
              </div>
              <div className="card-body">
                <form onSubmit={searchHandlder} className="form-group">
                  <div className="input-group mb-3">
                    <Link
                      to="/penjualan/tambah"
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
                          Nota
                        </th>
                        <th className="text-center" scope="col">
                          Nama Pelanggan
                        </th>
                        <th className="text-center" scope="col">
                          Tanggal
                        </th>

                        <th className="text-center" scope="col">
                          SubTotal
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
                      ) : penjualan.length > 0 ? (
                        penjualan.map((jual, index) => (
                          <tr key={index}>
                            <td className="text-center">
                              {++index + (currentPage - 1) * perPage}
                            </td>
                            <td className="text-center">{jual.id_nota}</td>
                            <td className="text-center">
                              {jual.pelanggan.nama}
                            </td>
                            <td className="text-center">{jual.tgl}</td>
                            <td className="text-center">
                              <FormatRupiah angka={parseInt(jual.subtotal)} />
                            </td>
                            <td className="text-center">
                              <Link
                                to={`/penjualan/detail/${jual.id_nota}`}
                                className="btn btn-sm btn-success me-2"
                              >
                                <i className="fa fa-file"></i>
                              </Link>
                              <Link
                                to={`/penjualan/ubah/${jual.id_nota}`}
                                className="btn btn-sm btn-primary me-2"
                              >
                                <i className="fa fa-pencil-alt"></i>
                              </Link>
                              <button
                                onClick={() => deletePenjualan(jual.id_nota)}
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

export default Penjualan;
