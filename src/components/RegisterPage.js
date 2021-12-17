import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
//
import {
  InputAdornment,
  makeStyles,
  Close,
  Check,
  Warning,
  PeopleAltRounded,
  Datetime,
  Twitter,
  LockSharp,
  Email,
  GridContainer,
  GridItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CustomInput,
  SnackbarContent,
  SectionCompletedExamples,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  CustomLinearProgress,
  stylesLogin,
  styleCheckbox,
  Slide,
  Parallax,
} from "../ComponentStyle.js";

import image from "../assets/img/detective2.jpg";

//Styles for classes template
const useStyleCheckbox = makeStyles(styleCheckbox);
const useStyles = makeStyles(stylesLogin);

//Effect to slow down modal box
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
Transition.displayName = "Transition";

export default function RegisterPage(props) {
  props.setActiveNav("register");
  props.setScrollNav(false);
  /* Register ANIMATION */
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
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
      props.setAlert(true);

      setTimeout(() => {
        props.setAlert(false);
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
                  props.setAlert(true);

                  setTimeout(() => {
                    props.setAlert(false);
                    props.setVariante("");
                    props.setMensaje("");
                  }, 3000);
                }
              })
              .catch((error) => {
                props.setAlert(true);
                props.setVariante("warning");
                props.setMensaje(error.data.content);
                setTimeout(() => {
                  props.setAlert(false);
                  props.setVariante("");
                }, 3000);
              });
          } else {
            props.setMensaje(
              "Debes aceptar las condiciones y términos para registrarte."
            );
            props.setVariante("warning");
            props.setAlert(true);
            setTimeout(() => {
              props.setAlert(false);
              props.setVariante("");
              props.setMensaje("");
            }, 3000);
          }
        } else {
          props.setMensaje("Email no válido");
          props.setVariante("warning");
          props.setAlert(true);
          setTimeout(() => {
            props.setAlert(false);
            props.setVariante("");
            props.setMensaje("");
          }, 3000);
        }
      } else {
        props.setMensaje(
          "Las claves no coinciden o el formato es incorrecto (La clave debe contener al menos 8 caracteres y mayúsculas, minúsculas y números)."
        );
        props.setVariante("danger");
        props.setAlert(true);
        setTimeout(() => {
          props.setAlert(false);
          props.setVariante("");
          props.setMensaje("");
        }, 6000);
      }
    } else {
      props.setMensaje("Algún campo obligatorio no ha sido rellenado");
      props.setVariante("warning");
      props.setAlert(true);
      setTimeout(() => {
        props.setAlert(false);
        props.setVariante("");
        props.setMensaje("");
      }, 3000);
    }
  }

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",

          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <SectionCompletedExamples
            title={"¡Únete gratis y descubre tu siguiente juego favorito!"}
            text={
              "Registrándote podrás subir de nivel, competir contra el resto del mundo y ver todos tus progresos."
            }
          />
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
                //TransitionComponent={Transition}
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
                  {props.alert ? (
                    notification(props.variante, props.mensaje)
                  ) : (
                    <></>
                  )}
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
                            color="primary"
                            checked={checkedNewsletter}
                            onChange={() =>
                              setCheckedNewsletter(!checkedNewsletter)
                            }
                            value={checkedNewsletter}
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
