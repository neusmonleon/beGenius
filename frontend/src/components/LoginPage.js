import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import { Twitter, LockSharp } from "@material-ui/icons";
import Email from "@material-ui/icons/Email";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PersonIcon from "@material-ui/icons/PersonAddOutlined";
import Warning from "@material-ui/icons/Warning";
import Check from "@material-ui/icons/Check";
// core components
import Header from "../components/Components/Header/Header.js";
import Footer from "../components/Components/Footer/Footer.js";
import GridContainer from "../components/Components/Grid/GridContainer.js";
import GridItem from "../components/Components/Grid/GridItem.js";
import Button from "../components/Components/CustomButtons/Button.js";
import Card from "../components/Components/Card/Card.js";
import CardBody from "../components/Components/Card/CardBody.js";
import CardHeader from "../components/Components/Card/CardHeader.js";
import CardFooter from "../components/Components/Card/CardFooter.js";
import CustomInput from "../components/Components/CustomInput/CustomInput.js";
import SnackbarContent from "../components/Components/Snackbar/SnackbarContent.js";

import styles from "../assets/jss/material-kit-react/views/loginPage.js";
import styleNavbar from "../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

//import image from "../assets/img/fondo-web.jpg";
import image from "../assets/img/detective.jpg";
//import image from "../assets/img/fondo-web4.jpg";

const useStyleNavbar = makeStyles(styleNavbar);
const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  /* LOGIN ANIMATION */
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const classesNav = useStyleNavbar();
  const navigate = useNavigate();

  /* LOGIN FUNCTION */
  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setinputPassword] = useState("");
  const [alert, setAlert] = useState(false);

  function login() {
    Axios({
      method: "POST",
      data: {
        email: inputEmail,
        password: inputPassword,
      },
      withCredentials: true,
      url: "https://testbegenius.herokuapp.com//login",
    })
      .then((res) => {
        console.log(res);
        // if(){

        // }
        if (res.data.logged) {
          props.setLogged(res.data.logged);
          props.setUser(res.data.user);
          props.setVariante("success");
          props.setMensaje(res.data.mensaje);
        } else {
          props.setLogged(res.data.logged);
          props.setUser(null);
          props.setVariante("danger");
          props.setMensaje(res.data.mensaje);
        }
        //show notification
        setAlert(true);
        setTimeout(() => {
          //hide notification
          setAlert(false);
          if (res.data.logged) {
            navigate("/profile");
          }
          props.setVariante("");
        }, 3000);
      })
      .catch(() => {
        setAlert(true);
        props.setVariante("warning");
        setTimeout(() => {
          setAlert(false);
          props.setVariante("");
        }, 3000);
      });
  }

  return (
    <div id="navbar" className={classesNav.navbar}>
      <Header
        brand="beGenius"
        color="dark"
        fixed
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
                  <Button
                    className={classesNav.navLinkActive}
                    color="transparent"
                  >
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
          </List>
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
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                {alert ? notification(props.variante) : <></>}
                <form className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4>Login</h4>
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
                  <CardBody>
                    <CustomInput
                      labelText="Email"
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
                      labelText="Clave o Password"
                      id="pass"
                      value={inputPassword}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => setinputPassword(e.target.value),
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockSharp className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      color="info"
                      size="lg"
                      onClick={() => {
                        login();
                      }}
                    >
                      ¡Iniciar sesión!
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
