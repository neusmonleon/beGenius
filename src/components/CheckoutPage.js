import React from "react";
import Stripe from "./Sections/Stripe";
import { useState, useEffect } from "react";
import Axios from "axios";
import crypto from "crypto";
import {
  makeStyles,
  Warning,
  Check,
  GridContainer,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  SnackbarContent,
  stylesLogin,
} from "../ComponentStyle";

//TODO Refactoriazr imagenes
import image from "../assets/img/oark.jpg";

const useStyles = makeStyles(stylesLogin);

export default function CheckoutPage(props) {
  props.setActiveNav("");
  props.setScrollNav(false);

  const classes = useStyles();

  const [orderSuccess, setOrderSuccess] = useState(false); //trigger up on correct payment
  const [paymentHash, setPaymentHash] = useState(null);

  //MAKE API CALLL TO REGISTER SUCCESS ORDER
  useEffect(() => {
    if (paymentHash !== null) {
      Axios({
        method: "POST",
        data: {
          articles: props.cart,
          name: props.logged ? props.name : props.guestUser,
          orderId: paymentHash,
          price: parseInt(props.cartPrice),
          email: props.logged ? props.user: props.guestEmail,
          tickets: 6,
          codeRedeem: crypto.randomBytes(8).toString("hex"),
        },
        withCredentials: true,
        url: "http://localhost:3002/orders/new",
      })
        .then((res) => {
          console.log(res.data);
          if (!res.data.error) {
            props.setVariante("success");
            props.setMensaje(res.data.mensaje);
          } else {
            props.setVariante("danger");
            props.setMensaje(res.data.mensaje);
          }
          //show notification
          props.setAlert(true);
          setTimeout(() => {
            //hide notification
            props.setAlert(false);
            props.setVariante("");
          }, 2000);
        })
        .catch(() => {
          props.setVariante("warning");
          props.setMensaje("Error on API CALL");
          props.setAlert(true);
          setTimeout(() => {
            props.setAlert(false);
            props.setVariante("");
            props.setMensaje("");
          }, 3000);
        });
    }
  }, [orderSuccess]);

  return (
    <>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",

          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                {props.alert ? notification(props.variante) : <></>}
                <form className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4>Pago</h4>
                  </CardHeader>
                  <CardBody>
                    {/* STRIPE MODAL */}
                    <Stripe
                      guestEmail={props.guestEmail}
                      guestUser={props.guestUser}
                      setGuestEmail={props.setGuestEmail}
                      setGuestUser={props.setGuestUser}
                      setOrderSuccess={setOrderSuccess}
                      paymentHash={paymentHash}
                      setPaymentHash={setPaymentHash}
                      name={props.name}
                      logged={props.logged}
                      user={props.user}
                    />
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

//todo refactorizar
//show component according to the type of message (success, danger or warning)
function notification(type) {
  if (type === "success") {
    return (
      <SnackbarContent
        message={
          <span>
            <b>SUCCESS ALERT:</b> Login correcto.
          </span>
        }
        close
        color="success"
        icon={Check}
      />
    );
  } else if (type === "warning") {
    return (
      <SnackbarContent
        message={
          <span>
            <b>WARNING ALERT:</b> Error en la llamada al servidor.
          </span>
        }
        close
        color="warning"
        icon={Warning}
      />
    );
  } else if (type === "danger") {
    return (
      <SnackbarContent
        message={
          <span>
            <b>DANGER ALERT:</b> Error en el Login.
          </span>
        }
        close
        color="danger"
        icon={Warning}
      />
    );
  }
}
