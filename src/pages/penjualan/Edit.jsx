import React, { useState, useEffect } from "react";
import LayoutParent from "../../layouts/Parent";
import Api from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import FormatRupiah from "../../components/parent/FormatRupiah";

function PenjualanEdit() {
  document.title = "Edit Penjualan - Toko Ku";

  const [tgl, setTgl] = useState("");
  const [kodePelanggan, setKodePelanggan] = useState("");
  const [pelangganList, setPelangganList] = useState([]);
  const [barangList, setBarangList] = useState([]);
  const [items, setItems] = useState([]);
  const [validation, setValidation] = useState({});
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchPelanggan();
    fetchBarang();
    fetchPenjualan();
  }, []);

  const fetchPelanggan = async () => {
    try {
      const res = await Api.get("/api/pelanggan/list?perPage=200", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPelangganList(res.data.data.data);
    } catch (error) {
      console.error("Error fetch pelanggan:", error);
      setPelangganList([]);
    }
  };

  const fetchBarang = async () => {
    try {
      const res = await Api.get("/api/barang/list?perPage=200", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBarangList(res.data.data.data);
    } catch (error) {
      console.error("Error fetch barang:", error);
      setBarangList([]);
    }
  };

  const fetchPenjualan = async () => {
    try {
      const res = await Api.get(`/api/penjualan/detail/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.data;

      setTgl(data.tgl);
      setKodePelanggan(data.kode_pelanggan);

      // Gabungkan items dengan kode_barang sama supaya qty dijumlah dan subtotal dihitung ulang
      const mergedItems = [];
      data.items.forEach((item) => {
        const existingIndex = mergedItems.findIndex(
          (i) => i.kode_barang === item.kode_barang
        );
        if (existingIndex >= 0) {
          mergedItems[existingIndex].qty += item.qty;
          mergedItems[existingIndex].subtotal =
            mergedItems[existingIndex].qty * mergedItems[existingIndex].harga;
        } else {
          mergedItems.push({
            kode_barang: item.kode_barang,
            qty: item.qty,
            harga: item.barang.harga,
            subtotal: item.qty * item.barang.harga,
          });
        }
      });

      setItems(mergedItems);
    } catch (error) {
      console.error("Error fetch penjualan:", error);
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];

    if (field === "kode_barang") {
      const barang = barangList.find((b) => b.kode === value);
      const harga = barang ? barang.harga : 0;

      updatedItems[index].kode_barang = value;
      updatedItems[index].harga = harga;
      updatedItems[index].subtotal = updatedItems[index].qty * harga;
    } else if (field === "qty") {
      const qty = parseInt(value) || 1;
      updatedItems[index].qty = qty;
      updatedItems[index].subtotal = qty * updatedItems[index].harga;
    } else {
      updatedItems[index][field] = value;
    }

    setItems(updatedItems);
  };

  const addItemRow = () => {
    setItems([...items, { kode_barang: "", qty: 1, harga: 0, subtotal: 0 }]);
  };

  const removeItemRow = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const totalHarga = items.reduce((acc, item) => acc + item.subtotal, 0);

  const updatePenjualan = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Payload hanya kode_barang dan qty
    const payloadItems = items.map(({ kode_barang, qty }) => ({
      kode_barang,
      qty,
    }));

    try {
      await Api.put(
        `/api/penjualan/update/${id}`,
        {
          tgl,
          kode_pelanggan: kodePelanggan,
          items: payloadItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Penjualan berhasil diperbarui", {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      navigate("/Penjualan");
    } catch (error) {
      if (error.response && error.response.data) {
        setValidation(error.response.data);
      } else {
        toast.error("Terjadi kesalahan", { position: "top-right" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <LayoutParent>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="font-weight-bold">
                  <i className="fa fa-edit"></i> Edit Penjualan
                </span>
              </div>
              <div className="card-body">
                <form onSubmit={updatePenjualan}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Tanggal</label>
                    <input
                      type="date"
                      className="form-control"
                      value={tgl}
                      onChange={(e) => setTgl(e.target.value)}
                    />
                    {validation.tgl && (
                      <div className="alert alert-danger mt-2">
                        {validation.tgl[0]}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Pelanggan</label>
                    <select
                      className="form-control"
                      value={kodePelanggan}
                      onChange={(e) => setKodePelanggan(e.target.value)}
                    >
                      <option value="">-- Pilih Pelanggan --</option>
                      {pelangganList.map((p) => (
                        <option key={p.id_pelanggan} value={p.id_pelanggan}>
                          {p.nama}
                        </option>
                      ))}
                    </select>
                    {validation.kode_pelanggan && (
                      <div className="alert alert-danger mt-2">
                        {validation.kode_pelanggan[0]}
                      </div>
                    )}
                  </div>

                  <hr />
                  <h5>Barang</h5>

                  {items.map((item, index) => (
                    <div key={index} className="row mb-3 align-items-center">
                      <div className="col-md-4">
                        <label className="form-label">Barang</label>
                        <select
                          className="form-control"
                          value={item.kode_barang}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "kode_barang",
                              e.target.value
                            )
                          }
                        >
                          <option value="">-- Pilih Barang --</option>
                          {barangList
                            .filter((b) => {
                              // Tampilkan item ini jika:
                              // - Belum dipilih di item lain
                              // - Atau, ini adalah item yang sedang dipilih di row ini
                              const isSelected = items.some(
                                (it, i) =>
                                  it.kode_barang === b.kode && i !== index
                              );
                              return !isSelected;
                            })
                            .map((b) => (
                              <option key={b.kode} value={b.kode}>
                                {b.nama} -{" "}
                                <FormatRupiah angka={parseInt(b.harga)} />
                              </option>
                            ))}
                        </select>
                        {validation[`items.${index}.kode_barang`] && (
                          <div className="alert alert-danger mt-2">
                            {validation[`items.${index}.kode_barang`][0]}
                          </div>
                        )}
                      </div>

                      <div className="col-md-2">
                        <label className="form-label">Qty</label>
                        <input
                          type="number"
                          className="form-control"
                          value={item.qty}
                          min="1"
                          onChange={(e) =>
                            handleItemChange(index, "qty", e.target.value)
                          }
                        />
                        {validation[`items.${index}.qty`] && (
                          <div className="alert alert-danger mt-2">
                            {validation[`items.${index}.qty`][0]}
                          </div>
                        )}
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">Subtotal</label>
                        <input
                          type="text"
                          className="form-control"
                          value={item.subtotal.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                          disabled
                        />
                      </div>

                      <div className="col-md-3 d-flex align-items-end">
                        <button
                          type="button"
                          className="btn btn-danger me-2"
                          onClick={() => removeItemRow(index)}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={addItemRow}
                    >
                      Tambah Barang
                    </button>

                    <h5>
                      Total: <FormatRupiah angka={totalHarga} />
                    </h5>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-success"
                  >
                    {loading ? "Menyimpan..." : "Simpan"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </LayoutParent>
    </React.Fragment>
  );
}

export default PenjualanEdit;
