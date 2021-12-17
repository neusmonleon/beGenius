import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// @material-ui/core components
import background from "../assets/img/vintagedetective.jpg";
import { infoColor } from "../assets/jss/material-kit-react";
//import shoppingCartStyle from "../assets/jss/material-kit-react/views/shoppingCartStyle.js";
import {
  DialogContent,
  DialogTitle,
  Dialog,
  AddShoppingCart,
  makeStyles,
  Close,
  Remove,
  Add,
  KeyboardArrowRight,
  Parallax,
  Table,
  Tooltip,
  Button,
  Card,
  CardBody,
  stylesModal,
  shoppingCartStyle,
} from "../ComponentStyle";

const style = {
  ...shoppingCartStyle,
  ...stylesModal,
};
const useStyles = makeStyles(style);

export default function ShoppingCartPage(props) {
  props.setActiveNav("shop");
  props.setScrollNav(false);
  const classes = useStyles();
  const navigate = useNavigate();
  //console.log(props.cart);
  const [checkOut, setCheckOut] = useState([]);
  const [checkOutPrice, setCheckOutPrice] = useState(0);
  const [update, setUpdate] = useState(false);
  const [modifiedQuantity, setModifiedQuantity] = useState(false);
  const [modifiedTotal, setModifiedTotal] = useState(false);
  const [largeModal, setLargeModal] = useState(false);
  

  let total = 0;
  //initialize page on top scroll
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  // ADD/DRAW ROWS OF THE TABLE ( OUR ARTICLES + TOTAL )
  useEffect(() => {
    setModifiedQuantity(false);
    setModifiedTotal(false);
    //create the table items
    // ARTICLES OF THE TABLE
    let shoppingList = props.cart.map((article, index) => {
      if (Object.keys(article) == 0) {
        props.cart.splice(index, 1);
      }
      if (article.price !== undefined && article.quantity !== undefined) {
        total = total + article.price * article.quantity;
      }

      return [
        //
        //  CREATE EACH ARTICLE OF THE CART
        //
        <div className={classes.imgContainer} key={1}>
          <img
            src={article.image}
            alt={article.title}
            className={classes.img}
          />
        </div>,
        <span key={1}>
          {article.title}
          <br />
          <small className={classes.tdNameSmall}>{article.location}</small>
        </span>,
        <span key={1}>
          <small className={classes.tdNumberSmall}>€</small> {article.price}
        </span>,
        <span id="quantity" key={2}>
          {article.quantity}
          {` `}
          <div className={classes.buttonGroup}>
            <Button
              color="info"
              size="sm"
              round
              className={classes.firstButton}
              onClick={() => {
                props.cart.map((item) => {
                  if (
                    item.title === article.title &&
                    item.location === article.location &&
                    item.quantity !== 1
                  ) {
                    //item.quantity = item.quantity - 1;
                    props.cart[index].quantity = item.quantity - 1;
                    setModifiedQuantity(true);
                  }
                  return true;
                });
              }}
            >
              <Remove />
            </Button>
            <Button
              color="info"
              size="sm"
              round
              className={classes.lastButton}
              onClick={() => {
                props.cart.map((item) => {
                  if (
                    item.title === article.title &&
                    item.location === article.location
                  ) {
                    //item.quantity = item.quantity - 1;
                    props.cart[index].quantity = item.quantity + 1;
                    setModifiedQuantity(true);
                  }
                  return true;
                });
              }}
            >
              <Add />
            </Button>
          </div>
        </span>,
        <span key={1}>
          <small className={classes.tdNumberSmall}>€</small>{" "}
          {article.price * article.quantity}
        </span>,
        <Tooltip
          key={1}
          id="close1"
          title="Remove item"
          placement="left"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            link
            className={classes.actionButton}
            onClick={() => {
              props.cart.map((item) => {
                if (
                  item.title === article.title &&
                  item.location === article.location
                ) {
                  props.cart.splice(index, index + 1);
                  if (props.cart.length === 0) {
                    setUpdate(false);
                  }
                  setModifiedQuantity(true);
                }
                return true;
              });
            }}
          >
            <Close />
          </Button>
        </Tooltip>,
      ];
    });
    // END ARTICLES OF THE TABLE

    // FOOTER TABLE OF ARTICLES
    shoppingList.push({
      purchase: true,
      colspan: "1",
      amount: (
        <span>
          {checkOutPrice} <small>€</small>
        </span>
      ),
      col: {
        colspan: 3,
        text: (
          <Button
            color="info"
            round
            onClick={() => {
              props.setCartPrice(checkOutPrice)
              if (props.logged) {
                //logges user
                navigate("/payment");
              } else {
                //options no logged user
                setLargeModal(true);
              }
            }}
          >
            Finalizar compra <KeyboardArrowRight />
          </Button>
        ),
      },
    });
    setModifiedTotal(true);
    // END FOOTER TABLE
    setCheckOutPrice(total);
    setCheckOut(shoppingList);
  }, [props.cart, modifiedQuantity, modifiedTotal]);

  //SHOW CART ONLY WHEN IS NOT EMPTY
  useEffect(() => {
    if (checkOut.length > 1) {
      setUpdate(true);
    }
  }, [checkOut]);



  return update === false ? (
    <>
      <Parallax image={background} filter="dark" small></Parallax>
      <div className={classes.main + " " + classes.mainRaised}>
        <div className={classes.container}>
          <div className={classes.container + " " + classes.padding50}>
            <div>
              <AddShoppingCart className={classes.big} />
            </div>

            <p>
              Oops, tu carrito está vacio, pulsa <Link to="/events">aquí</Link>{" "}
              para ver los eventos disponibles
            </p>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>
      <Parallax image={background} filter="dark" small></Parallax>
      <div className={classes.main + " " + classes.mainRaised}>
        <div className={classes.container}>
          <Card plain>
            <CardBody plain>
              <h3 className={classes.cardTitle}>Shopping Cart</h3>
              <Table
                tableHead={["", "PRODUCT", "PRECIO", "CANTIDAD", "TOTAL", ""]}
                tableData={checkOut}
                tableShopping
                customHeadCellClasses={[
                  classes.textCenter,
                  classes.description,
                  classes.description,
                  classes.textRight,
                  classes.textRight,
                  classes.textRight,
                ]}
                customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
                customCellClasses={[
                  classes.tdName,
                  classes.customFont,
                  classes.customFont,
                  classes.tdNumber,
                  classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
                  classes.tdNumber + " " + classes.textCenter,
                ]}
                customClassesForCells={[1, 2, 3, 4, 5, 6]}
              />
            </CardBody>
          </Card>
        </div>
      </div>
      {/* DIAOLOG MODAL */}
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper:
            classes.modal + " " + classes.modalLarge + " " + classes.background,
        }}
        open={largeModal}
        //TransitionComponent={Transition}
        keepMounted
        onClose={() => setLargeModal(false)}
        aria-labelledby="large-modal-slide-title"
        aria-describedby="large-modal-slide-description"
      >
        <DialogTitle
          id="large-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            simple
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            onClick={() => setLargeModal(false)}
          >
            {" "}
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle + " " + classes.padding50}>
            😲¡ No estás logeado !
          </h4>
          <p>
            Recuerda que para competir en el ranking de beGenius debes ser
            usuario registrado.{<br />}
          </p>
        </DialogTitle>
        <DialogContent
          id="large-modal-slide-description"
          className={
            classes.modalBody +
            " " +
            classes.justifyCenter +
            " " +
            classes.paddingBottom50
          }
        >
          <Link to="/register">
            <Button
              color="info"
              className={classes.buttonColor}
              onClick={() => {
                setLargeModal(false);
              }}
            >
              Registrarme
            </Button>
          </Link>
          <Link to="/login">
            <Button
              color="info"
              className={classes.buttonColor}
              onClick={() => {
                setLargeModal(false);
              }}
            >
              Login
            </Button>
          </Link>
          <Link to="/payment">
            <Button
              color="info"
              className={classes.buttonColor}
              onClick={() => {
                setLargeModal(false);
              }}
            >
              Continuar como invitado
            </Button>
          </Link>
        </DialogContent>
      </Dialog>
      {/* END DIALOG MODAL */}
    </div>
  );
}
