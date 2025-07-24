/* eslint-disable-next-line no-unused-vars */
import React, { memo, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/appContext';
import ReactPaginate from 'react-paginate';
import OrderTrain from '../OrderTrain/OrderTrain';
import './OrderPagination.css';

function Items({ data }) {
  return data && data.items ? (
    data.items.map((item, index) => <OrderTrain key={index} item={item} />)
  ) : (
    <>Результаты не найдены</>
  );
}

Items.propTypes = {
  data: PropTypes.object.isRequired,
};

function PaginatedItems({ itemsPerPage, routes, onChange }) {
  const [pageCount, setPageCount] = useState(0);
/* eslint-disable-next-line no-unused-vars */
  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = ({ selected }) => {
    const offset = Math.min(selected * itemsPerPage, routes.items.length);
    setItemOffset(offset);
    onChange(offset);
  };

  useEffect(() => {
    if (!routes || !routes.items) return;
    const totalItems = routes.items.length;
    setPageCount(Math.ceil(totalItems / itemsPerPage));
  }, [itemsPerPage, routes]);

  return (
    <>
      <Items data={routes} />
      {routes && routes.items && routes.items.length > 0 && (
        <ReactPaginate
          className="pagination-wrapper"
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      )}
    </>
  );
}

PaginatedItems.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  routes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function OrderPagination({ routes, onChange }) {
  const { appState } = useContext(AppContext);

  return (
    <div className="order-pagination">
      <PaginatedItems
        itemsPerPage={Number(appState?.limit ?? 5)}
        routes={routes}
        onChange={onChange}
      />
    </div>
  );
}

OrderPagination.propTypes = {
  routes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

export default memo(OrderPagination);