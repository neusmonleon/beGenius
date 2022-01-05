import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/paginationStyle.js";
import classNames from "classnames";

function Paginator(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const paginationLink = classNames({
    [classes.paginationLink]: true,
  });
  // const paginationLinkActive = classNames({
  //   [classes.paginationLink]: true,
  //   [classes["info"]]: true,
  // });
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
    // eslint-disable-next-line
    [itemOffset, props.itemsPerPage,props.battleRoyal]
    
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
    <div className={classes.block}>
      {/* return only cards visibles by itemsPerPage */}
      <div className={classes.flex}>{currentItems}</div>
      {/* Show pagination item */}
      <div className={classes.flex}>
        <ReactPaginate
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="Previous"
          pageClassName={classes.paginationItem}
          pageLinkClassName={paginationLink}
          previousClassName={classes.paginationItem}
          previousLinkClassName={paginationLink}
          nextClassName={classes.paginationItem}
          nextLinkClassName={paginationLink}
          breakLabel="..."
          breakClassName={classes.paginationItem}
          breakLinkClassName={paginationLink}
          containerClassName="pagination"
          activeClassName=""
          renderOnZeroPageCount={null}
        />
      </div>
      </div>
  );
}

export default Paginator;
