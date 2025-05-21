import PropTypes from "prop-types";

export default function FormatRupiah({ angka }) {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(angka)
    .replace("Rp", "Rp.");

  return <span>{formatted}</span>;
}

FormatRupiah.propTypes = {
  angka: PropTypes.number.isRequired,
};
