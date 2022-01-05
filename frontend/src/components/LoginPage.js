import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  makeStyles,
  InputAdornment,
  LockSharp,
  Email,
  Warning,
  Check,
  GridContainer,
  GridItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CustomInput,
  SnackbarContent,
  stylesLogin,
} from "../ComponentStyle";

import image from "../assets/img/detective.jpg";

const useStyles = makeStyles(stylesLogin);

export default function LoginPage(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setinputPassword] = useState("");

  useEffect(() => {
    //management of navbar active button
    props.setActiveNav("login");
    props.setScrollNav(false);
  });

  /* LOGIN FUNCTION */
  function login() {
    Axios({
      method: "POST",
      data: {
        email: inputEmail,
        password: inputPassword,
      },
      withCredentials: true,
      url: "http://localhost:3002/login",
    })
      .then((res) => {
        if (res.data.logged) {
          props.setLogged(res.data.logged);
          props.setUser(res.data.user.email);
          props.setVariante("success");
          props.setMensaje(res.data.mensaje);
          props.setName(res.data.user.nombre);
          props.setSurname(res.data.user.apellidos);

          if (res.data.user.image.indexOf("avatar.com") === -1) {
            props.setImageUser("http://localhost:3002/" + res.data.user.image);
          } else {
            props.setImageUser(
              "https://eu.ui-avatars.com/api/?name=" + res.data.user.nombre
            );
          }
        } else {
          props.setLogged(res.data.logged);
          props.setUser(null);
          props.setVariante("danger");
          props.setMensaje(res.data.mensaje);
        }
        //show notification
        props.setAlert(true);
        setTimeout(() => {
          //hide notification
          props.setAlert(false);
          if (res.data.logged) {
            navigate("/profile");
          }
          props.setVariante("");
        }, 1100);
      })
      .catch(() => {
        props.setAlert(true);
        props.setVariante("warning");
        setTimeout(() => {
          props.setAlert(false);
          props.setVariante("");
        }, 3000);
      });
  }
  //scroll auto on top
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
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
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                {props.alert ? notification(props.variante) : <></>}
                <form className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4>Login</h4>
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
      </div>
    </>
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
