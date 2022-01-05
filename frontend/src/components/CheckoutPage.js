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

import image from "../assets/img/oark.jpg";

const useStyles = makeStyles(stylesLogin);

export default function CheckoutPage(props) {
  const classes = useStyles();

  const [orderSuccess, setOrderSuccess] = useState(false); //trigger up on correct payment
  const [paymentHash, setPaymentHash] = useState(null);

  useEffect(() => {
    //management of navbar active button
    props.setActiveNav("");
    props.setScrollNav(false);
  });
  //MAKE API CALLL TO REGISTER SUCCESS ORDER
  useEffect(() => {
    if (paymentHash !== null) {
      let articlesCode = props.cart.map((article) => {
        let cloned = {
          ...article,
          codeRedeem: crypto.randomBytes(8).toString("hex"),
        };
        return cloned;
      });
      Axios({
        method: "POST",
        data: {
          articles: articlesCode,
          name: props.logged ? props.name : props.guestUser,
          orderId: paymentHash,
          price: parseInt(props.cartPrice),
          email: props.logged ? props.user : props.guestEmail,
          tickets: 6,
        },
        withCredentials: true,
        url: "http://localhost:3002/orders/new",
      })
        .then((res) => {
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
            props.setCart([]);
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
    // eslint-disable-next-line
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
                {props.alert ? (
                  notification(props.variante, props.mensaje)
                ) : (
                  <></>
                )}
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
                      alert={props.alert}
                      setAlert={props.setAlert}
                      setMensaje={props.setMensaje}
                      setVariante={props.setVariante}
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

function notification(variante, mensaje) {
  if (variante === "success") {
    return (
      <SnackbarContent
        message={<span>{mensaje}</span>}
        close
        color="info"
        icon={Check}
      />
    );
  } else if (variante === "warning") {
    return (
      <SnackbarContent
        message={<span>{mensaje}</span>}
        close
        color="warning"
        icon={Warning}
      />
    );
  } else if (variante === "danger") {
    return (
      <SnackbarContent
        message={<span>{mensaje}</span>}
        close
        color="danger"
        icon="info_outline"
      />
    );
  }
}
