import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";

function Paginator(props) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(props.items);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(
    () => {
      // Fetch items from another resources.
      const endOffset = itemOffset + props.itemsPerPage;
      setCurrentItems(props.items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(props.items.length / props.itemsPerPage));
    },
    [itemOffset, props.itemsPerPage],
    props.battleRoyal
  );

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * props.itemsPerPage) % props.items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <>
      {/* return only cards visibles by itemsPerPage */}
      {currentItems}
      {/* Show pagination item */}
      <ReactPaginate
        nextLabel={<Button color="info">Next</Button>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={<Button>Previous</Button>}
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
    </>
  );
}

export default Paginator;
