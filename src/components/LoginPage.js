import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import {
  makeStyles,
  InputAdornment,
  Twitter,
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

//TODO Refactoriazr imagenes
import image from "../assets/img/detective.jpg";

const useStyles = makeStyles(stylesLogin);

export default function LoginPage(props) {
  props.setActiveNav("login");
  props.setScrollNav(false);

  const classes = useStyles();
  const navigate = useNavigate();

  /* LOGIN FUNCTION */
  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setinputPassword] = useState("");

  function login() {
    Axios({
      method: "POST",
      data: {
        email: inputEmail,
        password: inputPassword,
      },
      withCredentials: true,
      url: "https://api-begenius.herokuapp.com/login",
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.logged) {
          props.setLogged(res.data.logged);
          props.setUser(res.data.user.email);
          props.setVariante("success");
          props.setMensaje(res.data.mensaje);
          props.setName(res.data.user.nombre);
        } else {
          props.setLogged(res.data.logged);
          props.setUser(null);
          props.setVariante("danger");
          props.setMensaje(res.data.mensaje);
        }
        //show notification
        props.setAlert(true);
        console.log(props.name);
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
  React.useEffect(() => {
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
