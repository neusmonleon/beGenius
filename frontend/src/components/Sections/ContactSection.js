import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import IconoTeamBuilding from "../../assets/img/teambuilding.jpg";
import IconoEducacion from "../../assets/img/educacion.jpg";
import IconoEventos from "../../assets/img/eventos.jpg";

//components
import GridContainer from "../Components/Grid/GridContainer.js";
import GridItem from "../Components/Grid/GridItem.js";
import CustomInput from "../Components/CustomInput/CustomInput.js";
import Button from "../Components/CustomButtons/Button.js";
import SnackbarContent from "../Components/Snackbar/SnackbarContent.js";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";

import styles from "../../assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

//Effect to slow down modal box
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
Transition.displayName = "Transition";

const useStyles = makeStyles(styles);

export default function ContactSection(props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false); //state toggle notification
  const [classicModal, setClassicModal] = useState(false); // state if the contact modal requires are ok and filled.

  //regex for EMAIL (n-words + @ + n-words . {2-3 characters})
  function validateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    } else {
      props.setVariante("danger");
      props.setMensaje("Formato de email no válido");
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
        props.setVariante("");
        props.setMensaje("");
      }, 3000);
      return false;
    }
  }

  //FUNCTION CONTACT US VIA MAIL

  function sendMail() {
    if (name !== "" && message !== "" && validateEmail(mail)) {
      props.setVariante("success");
      props.setMensaje("Formulario correcto");
      setAlert(true);
      setClassicModal(true);

      setTimeout(() => {
        setAlert(false);
        props.setVariante("");
        props.setMensaje("");
      }, 3000);
      //todo: enviar mail
    }
  }


  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Contáctanos</h2>
          <h4 className={classes.description}>
            ¿Te ha quedado alguna duda? ¿Tienes un evento especial y te gustaría
            hacer algo diferente? ¿Quieres hacer un teambuilding en tu empresa?
            Podemos ofrecer servicios personalizados. Escríbenos mediante el
            siguiente formulario y te contestaremos lo antes posible. ¡Gracias!
          </h4>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <img src={IconoTeamBuilding} alt="iconos" width="80%" />
            </GridItem>
            <GridItem xs={12} sm={6} md={4}>
              <img src={IconoEducacion} alt="iconos" width="80%" />
            </GridItem>
            <GridItem xs={12} sm={6} md={4}>
              <img src={IconoEventos} alt="iconos" width="80%" />
            </GridItem>
          </GridContainer>
          {alert ? notification(props.variante, props.mensaje) : <></>}

          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Nombre"
                  id="name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (e) => setName(e.target.value),
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="E-mail"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (e) => setMail(e.target.value),
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Mensaje"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea,
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                  onChange: (e) => setMessage(e.target.value),
                }}
              />
              <GridItem xs={12} sm={12} md={4}>
                <Button
                  color="info"
                  onClick={() => {
                    sendMail();
                    console.log("send mail");
                  }}
                >
                  Enviar mensaje
                </Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
      {/* MODAL BOX  */}

      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        //CHANGE TRUE OR FALSE TO SHOW MODAL
        open={classicModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setClassicModal(false);
        }}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setClassicModal(false)}
          >
            <Close className={classes.modalClose} />
          </IconButton>

          <h4 className={classes.modalTitle}>¡Enviado!</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <p>Te responderemos en la mayor brevedad posible. ¡Muchas gracias!</p>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button
            onClick={() => {
              setClassicModal(false);
            }}
            color="info"
            round
          >
            Aceptar
          </Button>{" "}
        </DialogActions>
      </Dialog>
      {/* END MODAL BOX */}
    </div>
  );
}

//show component according to the type of message (success, danger or warning)
function notification(type, mensaje) {
  if (type === "success") {
    return (
      <SnackbarContent
        message={
          <span>
            <b>SUCCESS:</b> {mensaje === "" ? "Login correcto." : mensaje}
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
            <b>ALERT:</b>{" "}
            {mensaje === "" ? "Error en la llamada al servidor." : mensaje}
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
            <b>ALERT:</b> {mensaje === "" ? "Error en el Login." : mensaje}
          </span>
        }
        close
        color="danger"
        icon={Warning}
      />
    );
  }
}
