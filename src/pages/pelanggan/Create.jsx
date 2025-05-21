//import react
import React, { useState } from "react";

//import layout admin
import LayoutParent from "../../layouts/Parent";

//import BASE URL API
import Api from "../../api";

//import hook navigate dari react router dom
import { useNavigate } from "react-router-dom";

//import js cookie
import Cookies from "js-cookie";

//import toats
import toast from "react-hot-toast";

function PelangganCreate() {
  //title page
  document.title = "Tambah Pelanggan - Toko Ku";
  const [nama, setNama] = useState("");
  const [domisili, setDomisili] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [validation, setValidation] = useState({});
  const [loading, setLoading] = useState(false);

  //token
  const token = Cookies.get("token");

  //navigate
  const navigate = useNavigate();

  //function "storeCategory"
  const storePelanggan = async (e) => {
    e.preventDefault();
    setLoading(true);
    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("nama", nama);
    formData.append("domisili", domisili);
    formData.append("jenis_kelamin", jenisKelamin);

    await Api.post("/api/pelanggan/store", formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    })
      .then(() => {
        //show toast
        toast.success("Data Berhasil di Tambahkan", {
          duration: 4000,
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        //redirect dashboard page
        navigate("/Pelanggan");
        setLoading(false);
      })
      .catch((error) => {
        //set state "validation"
        setValidation(error.response.data);
        setLoading(false);
      });
  };

  const handleBack = () => {
    navigate("/Pelanggan");
  };

  return (
    <React.Fragment>
      <LayoutParent>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="font-weight-bold">
                  <i className="fa fa-users"></i> Tambah Data Pelanggan
                </span>
              </div>
              <div className="card-body">
                <form onSubmit={storePelanggan}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Nama</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Masukan Nama Pelanggan"
                    />
                  </div>
                  {validation.nama && (
                    <div className="alert alert-danger">
                      {validation.nama[0]}
                    </div>
                  )}
                  <div>
                    {/* Input Domisili */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">Domisili</label>
                      <input
                        type="text"
                        className="form-control"
                        value={domisili}
                        onChange={(e) => setDomisili(e.target.value)}
                        placeholder="Masukan Domisili"
                      />
                      {validation.domisili && (
                        <div className="alert alert-danger mt-2">
                          {validation.domisili[0]}
                        </div>
                      )}
                    </div>

                    {/* Select Jenis Kelamin */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Jenis Kelamin
                      </label>
                      <select
                        className="form-control"
                        value={jenisKelamin}
                        onChange={(e) => setJenisKelamin(e.target.value)}
                      >
                        <option value="">-- Pilih Jenis Kelamin --</option>
                        <option value="PRIA">Pria</option>
                        <option value="WANITA">Wanita</option>
                      </select>
                      {validation.jenis_kelamin && (
                        <div className="alert alert-danger mt-2">
                          {validation.jenis_kelamin[0]}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-md btn-success me-2"
                      disabled={loading}
                    >
                      <i className="fa fa-save"></i>{" "}
                      {loading ? "Loading..." : "TAMBAH"}
                    </button>
                    <button
                      type="reset"
                      className="btn btn-md btn-warning"
                      onClick={() => handleBack()}
                    >
                      <i className="fa fa-redo"></i> KEMBALI
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </LayoutParent>
    </React.Fragment>
  );
}

export default PelangganCreate;
