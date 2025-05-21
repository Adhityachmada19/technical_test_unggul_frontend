// import React & PropTypes
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";

function PaginationComponent(props) {
  return (
    props.total > 0 && (
      <Pagination
        innerClass={`pagination justify-content-${props.position} mb-0`}
        activePage={props.currentPage}
        activeClass="page-item active"
        itemsCountPerPage={props.perPage}
        totalItemsCount={props.total}
        onChange={props.onChange}
        itemClass="page-item"
        linkClass="page-link"
      />
    )
  );
}

// Tambahkan validasi prop types
PaginationComponent.propTypes = {
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  position: PropTypes.oneOf(["start", "center", "end"]), // atau string biasa jika fleksibel
};

export default PaginationComponent;
