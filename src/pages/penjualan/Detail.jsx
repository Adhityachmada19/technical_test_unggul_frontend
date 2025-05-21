import React, { useEffect, useState } from "react";
//import layout admin
import LayoutParent from "../../layouts/Parent";
import Api from "../../api"; // Ganti sesuai path API-mu
import { Link, useParams } from "react-router-dom";
import FormatRupiah from "../../components/parent/FormatRupiah";
import Cookies from "js-cookie";
function PenjualanDetail() {
  //title page
  document.title = "Detail Penjualan - Toko Ku";
  const { id } = useParams(); // Ambil ID dari URL
  const [penjualan, setPenjualan] = useState(null);
  const [loading, setLoading] = useState(true);

  //token
  const token = Cookies.get("token");

  const fetchDetail = async () => {
    setLoading(true);
    await Api.get(`/api/penjualan/detail/${id}`, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data response to state "categories"
      setPenjualan(response.data.data);

      setLoading(false);
    });
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!penjualan) return <div>Data tidak ditemukan</div>;

  // Hitung total harga

  return (
    <React.Fragment>
      <LayoutParent>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-body">
                <h4 className="mb-4 fw-bold">🧾 Detail Penjualan</h4>

                {/* Informasi Umum */}
                <div className="mb-3">
                  <strong>ID Nota:</strong>{" "}
                  <span className="text-primary">{penjualan.id_nota}</span>
                  <br />
                  <strong>Tanggal Transaksi:</strong> {penjualan.tanggal}
                </div>

                {/* Informasi Pelanggan */}
                <div className="mb-4">
                  <h6 className="fw-bold">👤 Informasi Pelanggan</h6>
                  <p>
                    <strong>Nama:</strong> {penjualan.pelanggan?.nama}
                  </p>
                  <p>
                    <strong>Jenis Kelamin:</strong>{" "}
                    <span
                      className={`badge ${
                        penjualan.pelanggan?.jenis_kelamin === "PRIA"
                          ? "bg-primary"
                          : "bg-danger"
                      }`}
                    >
                      {penjualan.pelanggan?.jenis_kelamin === "PRIA"
                        ? "Laki-laki"
                        : "Perempuan"}
                    </span>
                  </p>
                  <p>
                    <strong>Domisili:</strong> 🏠{" "}
                    {penjualan.pelanggan?.domisili}
                  </p>
                </div>

                {/* Tabel Penjualan */}
                <div className="table-responsive">
                  <h6 className="fw-bold">📦 Item Penjualan</h6>
                  <table className="table table-bordered table-striped table-hover">
                    <thead className="table-success">
                      <tr>
                        <th>No</th>
                        <th>Nama Barang</th>
                        <th>Jumlah</th>
                        <th>Harga</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {penjualan.items.map((item, index) => {
                        const subtotal = item.qty * item.barang.harga;
                        return (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.barang.nama}</td>
                            <td>{item.qty}</td>
                            <td>
                              <FormatRupiah angka={item.barang.harga} />
                            </td>
                            <td>
                              <FormatRupiah angka={subtotal} />
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="table-warning fw-bold">
                        <td colSpan="4" className="text-end">
                          Total
                        </td>
                        <td>
                          <FormatRupiah angka={penjualan.subtotal} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-end mt-3">
                    <Link to="/penjualan" className="btn btn-sm btn-secondary">
                      <i className="fa fa-arrow-left"></i> Kembali
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutParent>
    </React.Fragment>
  );
}

export default PenjualanDetail;
