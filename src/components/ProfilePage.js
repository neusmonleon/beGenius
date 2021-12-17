import React from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  makeStyles,
  Warning,
  Check,
  Camera,
  Palette,
  Favorite,
  Button,
  GridContainer,
  GridItem,
  SnackbarContent,
  Parallax,
  NavPills,
  stylesProfile,
} from "../ComponentStyle.js";

//TODO: REFACTORIZAR IMAGENES
import profile from "../assets/img/faces/christian.jpg";
import studio1 from "../assets/img/examples/studio-1.jpg";
import studio2 from "../assets/img/examples/studio-2.jpg";
import studio3 from "../assets/img/examples/studio-3.jpg";
import studio4 from "../assets/img/examples/studio-4.jpg";
import studio5 from "../assets/img/examples/studio-5.jpg";
import work1 from "../assets/img/examples/olu-eletu.jpg";
import work2 from "../assets/img/examples/clem-onojeghuo.jpg";
import work3 from "../assets/img/examples/cynthia-del-rio.jpg";
import work4 from "../assets/img/examples/mariya-georgieva.jpg";
import work5 from "../assets/img/examples/clem-onojegaw.jpg";

import functions from "../components/Sections/functions";

const useStyles = makeStyles(stylesProfile);

export default function ProfilePage(props) {
  props.setActiveNav("profile");
  props.setScrollNav(false);
  const classes = useStyles();
  const imageClasses =
    classes.imgRaised + " " + classes.imgRoundedCircle + " " + classes.imgFluid;
  const navigate = useNavigate();
  const navImageClasses = classes.imgRounded + " " + classes.imgGallery;

  function logout() {
    Axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:3002/logout",
    })
      .then((res) => {
        console.log(res.data);
        if (!res.data.logged) {
          props.setLogged(res.data.logged);
          props.setVariante("success");
          props.setMensaje(res.data.mensaje);
          props.setAlert(true);
        }

        setTimeout(() => {
          //hide notification
          props.setAlert(false);
          if (res.data.logged) {
            navigate("/");
          }
          props.setVariante("");
        }, 3000);
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

  return (
    <div>
      <Parallax
        small
        filter
        image={require("../assets/img/profile-bg.jpg").default}
      />
      <div className={classes.main + " " + classes.mainRaised}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                {props.alert ? notification(props.variante) : <></>}
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{props.name}</h3>
                    <h6>Newbie</h6>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Datos personales",
                      tabIcon: Camera,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={studio1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio2}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={studio5}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio4}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      ),
                    },
                    {
                      tabButton: "Mis partidas",
                      tabIcon: Palette,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work5}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      ),
                    },
                    {
                      tabButton: "Ranking",
                      tabIcon: Favorite,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio1}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      ),
                    },
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
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
        icon="info_outline"
      />
    );
  }
}
