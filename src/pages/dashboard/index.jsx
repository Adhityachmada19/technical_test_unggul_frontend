//import react
import React, { useState, useEffect } from "react";

//import layout admin
import LayoutAdmin from "../../layouts/Parent";

//import BASE URL API
import Api from "../../api";

//import js cookie
import Cookies from "js-cookie";

import FormatRupiah from "../../components/parent/FormatRupiah";

function Dashboard() {
  //title page
  document.title = "Dashboard - Toko Ku";

  //set state
  const [pelangganCount, setpelangganCount] = useState(0);
  const [barangCount, setBarangCount] = useState(0);
  const [totalHariIni, setTotalHariIni] = useState(0);

  const [totalBulanIni, setTotalBulanIni] = useState(0);
  const [topPelanggan, setTopPelanggan] = useState([]);
  const [topBarang, setTopBarang] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  // const [sliders, setSliders] = useState(0);
  // const [users, setUsers] = useState(0);

  //token
  const token = Cookies.get("token");

  //function fetchData
  const fetchData = async () => {
    setLoading(true);
    //fetching data from Rest API
    const response = await Api.get("api/dashboard", {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    });

    //get response data
    const data = await response.data.data;
    setLoading(false);
    //assign response data to state
    setpelangganCount(data.total_pelanggan);
    setBarangCount(data.total_barang);
    setTotalHariIni(data.pemasukan_hari_ini);
    setTotalBulanIni(data.pemasukan_bulan_ini);
    setTotal(data.pemasukan_keseluruhan);
    setTopPelanggan(data.top_pelanggan);
    setTopBarang(data.barang_terlaris);
  };
  //hook useEffect
  useEffect(() => {
    //call method "fetchData"
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <LayoutAdmin>
        {/* TOTAL PELANGGAN DAN BARANG */}

        <div className="row mt-4">
          <div className="col-12 col-lg-6 mb-4">
            <div className="card border-0 shadow-sm overflow-hidden">
              <div className="card-body p-0 d-flex align-items-center">
                <div
                  className="bg-primary py-4 px-5 mfe-3"
                  style={{ width: "130px" }}
                >
                  <i className="fas fa-users fa-2x text-white"></i>
                </div>
                <div>
                  <div
                    className="text-value text-primary"
                    style={{ fontSize: 25, fontWeight: 700 }}
                  >
                    {loading ? "Loading..." : pelangganCount}
                  </div>
                  <div className="text-muted text-uppercase font-weight-bold small">
                    PELANGGAN
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4">
            <div className="card border-0 rounded shadow-sm overflow-hidden">
              <div className="card-body p-0 d-flex align-items-center">
                <div
                  className="bg-success py-4 px-5 mfe-3"
                  style={{ width: "130px" }}
                >
                  <i className="fas fa-box fa-2x text-white"></i>
                </div>
                <div>
                  <div
                    className="text-value text-success font-weight-bold"
                    style={{ fontSize: 25, fontWeight: 700 }}
                  >
                    {loading ? "Loading..." : barangCount}
                  </div>
                  <div className="text-muted text-uppercase font-weight-bold small">
                    BARANG
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* END TOTAL PELANGGAN DAN BARANG */}

        {/* TOTAL PEMASUKAN */}

        <div className="row">
          <div className="col-12 col-lg-4 mb-4">
            <div className="card border-0 shadow-sm overflow-hidden">
              <div className="card-body p-0 d-flex align-items-center">
                <div
                  className="bg-primary py-4 px-5 mfe-3"
                  style={{ width: "130px" }}
                >
                  <i className="fas fa-money-bill-wave fa-2x text-white"></i>
                </div>
                <div>
                  <div
                    className="text-value text-primary"
                    style={{ fontSize: 25, fontWeight: 700 }}
                  >
                    {loading ? (
                      "Loading..."
                    ) : (
                      <FormatRupiah angka={totalHariIni} />
                    )}
                  </div>
                  <div className="text-muted text-uppercase font-weight-bold small">
                    PEMASUKAN HARI INI
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 mb-4">
            <div className="card border-0 rounded shadow-sm overflow-hidden">
              <div className="card-body p-0 d-flex align-items-center">
                <div
                  className="bg-warning py-4 px-5 mfe-3"
                  style={{ width: "130px" }}
                >
                  <i className="fas fa-money-bill fa-2x text-white"></i>
                </div>
                <div>
                  <div
                    className="text-value text-warning"
                    style={{ fontSize: 25, fontWeight: 700 }}
                  >
                    {loading ? (
                      "Loading..."
                    ) : (
                      <FormatRupiah angka={totalBulanIni} />
                    )}{" "}
                  </div>
                  <div className="text-muted text-uppercase font-weight-bold small">
                    PEMASUKAN BULAN INI
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 mb-4">
            <div className="card border-0 rounded shadow-sm overflow-hidden">
              <div className="card-body p-0 d-flex align-items-center">
                <div
                  className="bg-success py-4 px-5 mfe-3"
                  style={{ width: "130px" }}
                >
                  <i className="fas fa-coins fa-2x text-white"></i>
                </div>
                <div>
                  <div
                    className="text-value text-success"
                    style={{ fontSize: 25, fontWeight: 700 }}
                  >
                    {loading ? "Loading..." : <FormatRupiah angka={total} />}
                  </div>
                  <div className="text-muted text-uppercase font-weight-bold small">
                    PEMASUKAN KESELURUHAN
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* END TOTAL PEMASUKAN */}

        {/* TOP PELANGGAN DAN TOP BARANG */}

        <div className="row">
          <div className="col-12 col-lg-6 mb-4">
            <div className="card border-0 shadow-sm overflow-hidden">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="mb-3">Top 5 Pelanggan</h5>
                <table
                  className="table table-bordered text-center"
                  style={{ maxWidth: 400 }}
                >
                  <thead className="table-light">
                    <tr>
                      <th>Nama</th>
                      <th>Total Belanja</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={2}>Loading...</td>
                      </tr>
                    ) : topPelanggan.length > 0 ? (
                      topPelanggan.map((pelanggan, index) => (
                        <tr key={index}>
                          <td>{pelanggan.nama}</td>
                          <td>
                            <FormatRupiah
                              angka={parseInt(pelanggan.total_pembelian)}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2}>Data Belum Tersedia</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4">
            <div className="card border-0 shadow-sm overflow-hidden">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="mb-3">Top 5 Barang Terlaris</h5>
                <table
                  className="table table-bordered text-center"
                  style={{ maxWidth: 400 }}
                >
                  <thead className="table-light">
                    <tr>
                      <th>Kode Barang</th>
                      <th>Nama Barang</th>
                      <th>Total Terjual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={3}>Loading ...</td>
                      </tr>
                    ) : topBarang.length > 0 ? (
                      topBarang.map((barang, index) => (
                        <tr key={index}>
                          <td>{barang.kode_barang}</td>
                          <td>{barang.nama}</td>
                          <td>{barang.total_terjual}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3}>Data Belum Tersedia</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* END TOP PELANGGAN DAN TOP BARANG */}
      </LayoutAdmin>
    </React.Fragment>
  );
}

export default Dashboard;
