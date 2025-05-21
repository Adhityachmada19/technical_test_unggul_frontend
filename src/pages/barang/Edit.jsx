//import react
import React, { useEffect, useState } from "react";

//import layout admin
import LayoutParent from "../../layouts/Parent";

//import BASE URL API
import Api from "../../api";

//import hook navigate dari react router dom
import { useNavigate, useParams } from "react-router-dom";

//import js cookie
import Cookies from "js-cookie";

//import toats
import toast from "react-hot-toast";

function BarangEdit() {
  //title page
  document.title = "Ubah Barang - Toko Ku";
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [harga, setHarga] = useState("");
  const [validation, setValidation] = useState({});
  const [loading, setLoading] = useState(false);

  //token
  const token = Cookies.get("token");

  //navigate
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //function "getCategoryById"
  const getBarangById = async () => {
    //get data from server
    const response = await Api.get(`/api/barang/detail/${id}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    });

    //get response data
    const data = await response.data.data;

    //assign data to state "name"
    setNama(data.nama);
    setKategori(data.kategori);
    setHarga(data.harga);
  };

  //function "storeCategory"
  const updateBarang = async (e) => {
    e.preventDefault();
    setLoading(true);
    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("nama", nama);
    formData.append("kategori", kategori);
    formData.append("harga", harga);
    formData.append("_method", "PUT");
    await Api.post(`/api/barang/update/${id}`, formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    })
      .then(() => {
        //show toast
        toast.success("Data Berhasil di Ubah", {
          duration: 4000,
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        //redirect dashboard page
        navigate("/barang");
        setLoading(false);
      })
      .catch((error) => {
        //set state "validation"
        setValidation(error.response.data);
        setLoading(false);
      });
  };

  const handleBack = () => {
    navigate("/barang");
  };

  useEffect(() => {
    getBarangById();
  }, []);
  return (
    <React.Fragment>
      <LayoutParent>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="font-weight-bold">
                  <i className="fa fa-users"></i> Ubah Data Barang
                </span>
              </div>
              <div className="card-body">
                <form onSubmit={updateBarang}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Nama</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Masukan Nama Barang"
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
                      <label className="form-label fw-bold">Kategori</label>
                      <input
                        type="text"
                        className="form-control"
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                        placeholder="Masukan Kategori"
                      />
                      {validation.kategori && (
                        <div className="alert alert-danger mt-2">
                          {validation.kategori[0]}
                        </div>
                      )}
                    </div>

                    {/* Select Jenis Kelamin */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">Harga</label>
                      <input
                        type="number"
                        className="form-control"
                        value={harga}
                        onChange={(e) => setHarga(e.target.value)}
                        placeholder="Masukan Harga"
                      />
                      {validation.harga && (
                        <div className="alert alert-danger mt-2">
                          {validation.harga[0]}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-md btn-success me-2"
                      disabled={loading}
                    >
                      <i className="fa fa-save"></i>{" "}
                      {loading ? "Loading..." : "UBAH"}
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

export default BarangEdit;
