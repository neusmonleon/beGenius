import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/icons
import { Twitter, LockSharp, PeopleAltRounded } from "@material-ui/icons";
import Email from "@material-ui/icons/Email";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PersonIcon from "@material-ui/icons/PersonAddOutlined";
import CustomDropdown from "./Components/CustomDropdown/CustomDropdown.js";
import profileImage from "../assets/img/faces/avatar.jpg";
import Warning from "@material-ui/icons/Warning";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
// core components
import Header from "./Components/Header/Header.js";
import Footer from "./Components/Footer/Footer.js";
import GridContainer from "./Components/Grid/GridContainer.js";
import GridItem from "./Components/Grid/GridItem.js";
import Button from "./Components/CustomButtons/Button.js";
import Card from "./Components/Card/Card.js";
import CardBody from "./Components/Card/CardBody.js";
import CardHeader from "./Components/Card/CardHeader.js";
import CardFooter from "./Components/Card/CardFooter.js";
import CustomInput from "./Components/CustomInput/CustomInput.js";
import SnackbarContent from "./Components/Snackbar/SnackbarContent.js";
import SectionCompletedExamples from "./Components/Sections/SectionCompletedExamples.js";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import CustomLinearProgress from "./Components/CustomLinearProgress/CustomLinearProgress.js";

import styles from "../assets/jss/material-kit-react/views/loginPage.js";
import styleNavbar from "../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";
import styleCheckbox from "../assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
//import styleModalbox from "../assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

import image from "../assets/img/detective2.jpg";

//Styles for classes template
const useStyleNavbar = makeStyles(styleNavbar);
const useStyleCheckbox = makeStyles(styleCheckbox);
const useStyles = makeStyles(styles);

//Effect to slow down modal box
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
Transition.displayName = "Transition";

export default function RegisterPage(props) {
  /* Register ANIMATION */
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const classesNav = useStyleNavbar();
  const classesCheckbox = useStyleCheckbox();
  //const classesModal = useStyleModalbox();

  /* STATES FUNCTION */
  const [nombre, setNombre] = useState(""); //state input name
  const [apellido, setApellido] = useState(""); //state input surname
  const [inputEmail, setinputEmail] = useState(""); //state input email
  const [birthdate, setBirthdate] = useState(false); //state date picker
  const [inputPassword, setinputPassword] = useState(""); //state input password
  const [greenLine, setGreenLine] = useState(false); //state password color
  const [inputPassword2, setinputPassword2] = useState(""); //state input password 2
  const [redLine, setRedLine] = useState(false); //state password 2 color
  const [classicModal, setClassicModal] = useState(false); //state toggle modalbox
  const [alert, setAlert] = useState(false); //state toggle notification
  const [checked, setChecked] = useState(false); //state checkbox
  const [checkedNewsletter, setCheckedNewsletter] = useState(false);
  const [progress, setProgress] = useState(0);

  //Control feedback password input "green or red" input color
  useEffect(() => {
    if (inputPassword === inputPassword2 && inputPassword !== "") {
      //pwd match
      setGreenLine(true);
      setRedLine(false);
    } else {
      //bad match
      setGreenLine(false);
      setRedLine(true);
    }
  }, [inputPassword, inputPassword2]);

  // PROGRESS BAR UPDATES
  useEffect(() => {
    if (nombre !== "") {
      setProgress(20);
      if (apellido !== "") {
        setProgress(40);
        console.log(birthdate);
        if (birthdate) {
          setProgress(50);
          if (inputEmail !== "") {
            setProgress(60);
            if (inputPassword !== "") {
              setProgress(80);
              if (checked === true) {
                setProgress(100);
              } else {
                setProgress(80);
              }
            } else {
              setProgress(60);
            }
          } else {
            setProgress(50);
          }
        } else {
          setProgress(40);
        }
      } else {
        setProgress(20);
      }
    } else {
      setProgress(0);
    }
  }, [nombre, apellido, inputEmail, inputPassword, checked, birthdate]);

  //Date variables
  // disable future dates
  const moment = require("moment");
  //don't allow less that 16 years old
  const todayLess16 = moment().subtract(16, "Y").format("MM/DD/YYYY");
  const disableFutureDt = (current) => {
    return current.isBefore(todayLess16);
  };
  /*-----------
  FUNCTION REGISTER TO COMPLETE USER REGISTRATION
  -----------
  */

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

  // At least 1 Uppercase 1 lowercase 1 number and between 8-32 characters
  function validatePassword(pwd) {
    if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,32})$/.test(pwd)) {
      return true;
    }
    return false;
  }

  //FUNCTION REGISTER USER - FETCH /signup

  function register() {
    if (nombre !== "" && apellido !== "") {
      if (inputPassword === inputPassword2 && validatePassword(inputPassword)) {
        if (validateEmail(inputEmail)) {
          if (checked) {
            Axios({
              method: "POST",
              data: {
                nombre: nombre,
                apellido: apellido,
                email: inputEmail,
                password: inputPassword,
                fechaNacimiento: birthdate,
                newsletter: checkedNewsletter,
              },
              withCredentials: true,
              url: "http://localhost:3002/signup",
            })
              .then((res) => {
                console.log(res.data);
                if (!res.data.error) {
                  //TODO: Validacion de mail por correo
                  setClassicModal(true);
                } else {
                  props.setVariante("danger");
                  props.setMensaje(res.data.content);
                  setAlert(true);

                  setTimeout(() => {
                    setAlert(false);
                    props.setVariante("");
                    props.setMensaje("");
                  }, 3000);
                }
              })
              .catch((error) => {
                setAlert(true);
                props.setVariante("warning");
                props.setMensaje(error.data.content);
                setTimeout(() => {
                  setAlert(false);
                  props.setVariante("");
                }, 3000);
              });
          } else {
            props.setMensaje(
              "Debes aceptar las condiciones y términos para registrarte."
            );
            props.setVariante("warning");
            setAlert(true);
            setTimeout(() => {
              setAlert(false);
              props.setVariante("");
              props.setMensaje("");
            }, 3000);
          }
        } else {
          props.setMensaje("Email no válido");
          props.setVariante("warning");
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
            props.setVariante("");
            props.setMensaje("");
          }, 3000);
        }
      } else {
        props.setMensaje(
          "Las claves no coinciden o el formato es incorrecto (La clave debe contener al menos 8 caracteres y mayúsculas, minúsculas y números)."
        );
        props.setVariante("danger");
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          props.setVariante("");
          props.setMensaje("");
        }, 6000);
      }
    } else {
      props.setMensaje("Algún campo obligatorio no ha sido rellenado");
      props.setVariante("warning");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
        props.setVariante("");
        props.setMensaje("");
      }, 3000);
    }
  }

  return (
    <div>
      <Header
        brand="beGenius"
        color="dark"
        //fixed
        rightLinks={
          <List className={classesNav.list}>
            <ListItem className={classesNav.listItem}>
              <Link to={"/"} className={classesNav.listItem}>
                <Button className={classesNav.navLink} color="transparent">
                  Inicio
                </Button>
              </Link>
            </ListItem>
            <ListItem className={classesNav.listItem}>
              <Button
                href="/events"
                className={classesNav.navLink}
                onClick={(e) => e.preventDefault()}
                color="transparent"
              >
                Eventos
              </Button>
            </ListItem>
            <ListItem className={classesNav.listItem}>
              <Button
                href="/faqs"
                className={classesNav.navLink}
                onClick={(e) => e.preventDefault()}
                color="transparent"
              >
                FAQs
              </Button>
            </ListItem>
            <ListItem className={classesNav.listItem}>
              <Link to={"/contact"} className={classesNav.listItem}>
                <Button className={classesNav.navLink} color="transparent">
                  Contacto
                </Button>
              </Link>
            </ListItem>
            {/* BUTTON LOGIN / LOGOUT */}
            {props.logged === true ? (
              <></>
            ) : (
              <ListItem className={classesNav.listItem}>
                <Link to={"/login"} className={classesNav.listItem}>
                  <Button className={classesNav.navLink} color="transparent">
                    LogIn
                  </Button>
                </Link>
              </ListItem>
            )}
            {/* BUTTON REGISTER - TERNARY with login */}
            {props.logged === false ? (
              <ListItem className={classesNav.listItem}>
                <Link to="/register" params="" className={classesNav.listItem}>
                  <Button
                    // justIcon
                    round
                    color="info"
                  >
                    <PersonIcon className={classesNav.icons} />
                    Sign Up
                  </Button>
                </Link>
              </ListItem>
            ) : (
              <></>
            )}
            {/* PROFILE PICTURE */}
            {props.logged === true ? (
              <ListItem className={classesNav.listItem}>
                <CustomDropdown
                  left
                  caret={false}
                  hoverColor="black"
                  dropdownHeader="Dropdown Header"
                  buttonText={
                    <img
                      src={profileImage}
                      className={classesNav.img}
                      alt="profile"
                    />
                  }
                  buttonProps={{
                    className:
                      classesNav.navLink + " " + classesNav.imageDropdownButton,
                    color: "transparent",
                  }}
                  dropdownList={["Me", "Settings and other stuff", "Sign out"]}
                />
              </ListItem>
            ) : (
              <></>
            )}
          </List>
        }
      />
      <SectionCompletedExamples
        title={"¡Únete gratis y descubre tu siguiente juego favorito!"}
        text={
          "Registrándote podrás subir de nivel, competir contra el resto del mundo y ver todos tus progresos."
        }
      />
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
            <GridItem xs={12} sm={12} md={6}>
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
                  <Link to="/">
                    <IconButton
                      className={classes.modalCloseButton}
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      onClick={() => setClassicModal(false)}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                  </Link>
                  <h4 className={classes.modalTitle}>¡Recuerda!</h4>
                </DialogTitle>
                <DialogContent
                  id="classic-modal-slide-description"
                  className={classes.modalBody}
                >
                  <p>
                    Para completar el registro, deberás acudir a tu bandeja de
                    correo y confirmar éste registro.
                  </p>
                </DialogContent>
                <DialogActions className={classes.modalFooter}>
                  <Link to="/">
                    <Button
                      onClick={() => {
                        setClassicModal(false);
                      }}
                      color="info"
                      round
                    >
                      Aceptar
                    </Button>{" "}
                  </Link>
                </DialogActions>
              </Dialog>
              {/* END MODAL BOX */}
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4>Regístrate con: </h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Twitter className={classes.inputIconsColor} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>O vía mail:</p>
                  {alert ? notification(props.variante, props.mensaje) : <></>}
                  <CardBody>
                    <CustomLinearProgress
                      variant="determinate"
                      color="info"
                      value={progress}
                    />
                    <CustomInput
                      labelText="Nombre*"
                      id="nombre"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={nombre}
                      inputProps={{
                        onChange: (e) => setNombre(e.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <PeopleAltRounded
                              className={classes.inputIconsColor}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Apellido*"
                      id="apellidos"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={apellido}
                      inputProps={{
                        onChange: (e) => setApellido(e.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <PeopleAltRounded
                              className={classes.inputIconsColor}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Datetime
                      id="fechaNacimiento"
                      dateFormat="DD/MM/YYYY"
                      initialViewDate={todayLess16}
                      timeFormat={false}
                      isValidDate={disableFutureDt}
                      closeOnSelect
                      onChange={(event) => {
                        setBirthdate(true);
                      }}
                      inputProps={{
                        placeholder: "Fecha de nacimiento*",
                      }}
                    />
                    <CustomInput
                      labelText="Email*"
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={inputEmail}
                      inputProps={{
                        onChange: (e) => setinputEmail(e.target.value),
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Clave o Password*"
                      id="pass"
                      success={greenLine}
                      error={redLine}
                      value={inputPassword}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => {
                          setinputPassword(e.target.value);
                        },
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockSharp className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    <CustomInput
                      labelText="Repetir Clave o Password*"
                      id="pass2"
                      success={greenLine}
                      error={redLine}
                      value={inputPassword2}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => {
                          setinputPassword2(e.target.value);
                        },
                        type: "password",
                        autoComplete: "off",
                      }}
                    />
                    {/* CHECKBOX TERMS & CONDITIONS */}
                    <div>
                      <FormControlLabel
                        control={
                          <Switch
                            color="primary"
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                            value={checked}
                            classes={{
                              switchBase: classesCheckbox.switchBase,
                              checked: classesCheckbox.switchChecked,
                              thumb: classesCheckbox.switchIcon,
                              track: classesCheckbox.switchBar,
                            }}
                          />
                        }
                        classes={{
                          label: classesCheckbox.label,
                        }}
                        label={
                          <p>
                            Acepto los términos y condiciones de la&nbsp;
                            <Link to="/politica-de-privacidad">
                              política de privacidad.
                            </Link>
                          </p>
                        }
                      />
                    </div>
                    {/* TOGGLE NEWSLETTER */}
                    <div>
                      <FormControlLabel
                        control={
                          <Switch
                            // checkedIcon="👍🏼"
                            // icon="👎🏼"
                            color="primary"
                            checked={checkedNewsletter}
                            onChange={(event) =>
                              setCheckedNewsletter(event.target.checked)
                            }
                            value={checkedNewsletter}
                            classes={{
                              switchBase: classes.switchBase,
                              checked: classes.switchChecked,
                              thumb: classes.switchIcon,
                              track: classes.switchBar,
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                        }}
                        label={
                          checkedNewsletter
                            ? "¡Suscribirme!"
                            : "No quiero suscribirme"
                        }
                      />
                    </div>
                  </CardBody>

                  <CardFooter className={classes.cardFooter}>
                    <Button
                      round
                      color="info"
                      size="lg"
                      onClick={() => {
                        register();
                        setTimeout(() => {
                          if (props.variante === "success") {
                          }
                        }, 2000);
                      }}
                    >
                      Registrar
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

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
