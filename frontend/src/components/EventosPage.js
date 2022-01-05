import React, { useEffect } from "react";
import { useState } from "react";
import EventsSection from "./Sections/EventsSection.js";
import {
  GridContainer,
  GridItem,
  Parallax,
  Button,
  Card,
  CardBody,
  CustomInput,
  InputAdornment,
  Mail,
  makeStyles,
  stylesEvents2,
  Warning,
  SnackbarContent,
  Check,
} from "../ComponentStyle.js";

import rompecabezas from "../assets/img/rompecabezas.jpg";

export default function EventPage(props) {
  const [inputEmail, setinputEmail] = useState(""); //state input email
  const useStyles = makeStyles(stylesEvents2);
  const classes = useStyles();

  useEffect(() => {
    props.setActiveNav("events");
    props.setScrollNav(false);
  });

  function validateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    } else {
      props.setVariante("danger");
      props.setMensaje("Formato de email no válido");
      props.setAlert(true);

      setTimeout(() => {
        props.setAlert(false);
        props.setVariante("");
        props.setMensaje("");
      }, 3000);
      return false;
    }
  }

  return (
    <div>
      <Parallax image={require("../assets/img/nadaldark.jpg").default} small>
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              md={8}
              sm={8}
              className={
                classes.mlAuto + " " + classes.mrAuto + " " + classes.textCenter
              }
            >
              <div className={classes.brand}>
                <h1 className={classes.title}>Eventos</h1>
                <h4>
                  <b>¿Preparados para jugar?</b> Diviertete con los tuyos en
                  estos eventos.
                </h4>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classes.main + " " + classes.mainRaised}>
        {/* SECTIONS */}

        <div id="battleRoyalEvents" className={classes.container}></div>
        <EventsSection {...props} />
      </div>
      {/* SUBSCRIBE */}
      <div
        className={classes.subscribeLine + " " + classes.subscribeLineImage}
        style={{ backgroundImage: `url(${rompecabezas})` }}
      >
        <div className={classes.container}>
          {props.alert ? notification(props.variante) : <></>}
          <GridContainer>
            <GridItem
              xs={12}
              sm={6}
              md={8}
              className={classes.mlAuto + " " + classes.mrAuto}
            >
              <div className={classes.textCenter}>
                <h3 className={classes.title}>
                  Suscríbete a nuestra Newsletter
                </h3>
                <p className={classes.description}>
                  ¡Únete a nosotros y recibe todas las novedades semanalmente!
                  ¡Nosotros odiamos también el spam, así que no te preocupes por
                  eso!
                </p>
              </div>

              <Card raised className={classes.card}>
                <CardBody className={classes.cardBody}>
                  <form>
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6} lg={8}>
                        <CustomInput
                          id="emailPreFooter"
                          formControlProps={{
                            fullWidth: true,
                            className: classes.cardForm,
                          }}
                          value={inputEmail}
                          inputProps={{
                            onChange: (e) => setinputEmail(e.target.value),
                            startAdornment: (
                              <InputAdornment position="start">
                                <Mail />
                              </InputAdornment>
                            ),
                            placeholder: "Escribe tu e-mail...",
                          }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={6} md={6} lg={4}>
                        <Button
                          color="rose"
                          block
                          className={classes.subscribeButton}
                          onClick={() => {
                            if (validateEmail(inputEmail)) {
                              props.setVariante("success");
                              props.setMensaje("Email enviado");
                              props.setAlert(true);

                              setTimeout(() => {
                                props.setAlert(false);
                                props.setVariante("");
                                props.setMensaje("");
                              }, 3000);
                            }
                          }}
                        >
                          Suscribirme
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </form>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

function notification(type) {
  if (type === "success") {
    return (
      <SnackbarContent
        message={
          <span>
            <b>¡Perfecto!:</b> Bienvenido a beGenius.
          </span>
        }
        close
        color="info"
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
            <b>ERROR:</b> Error al suscribirte. Revisa los campos.
          </span>
        }
        close
        color="danger"
        icon={Warning}
      />
    );
  }
}
