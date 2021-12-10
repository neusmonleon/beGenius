import React from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Warning from "@material-ui/icons/Warning";
import Check from "@material-ui/icons/Check";
// core components
import Header from "../components/Components/Header/Header.js";
import Footer from "../components/Components/Footer/Footer.js";
import Button from "../components/Components/CustomButtons/Button.js";
import GridContainer from "../components/Components/Grid/GridContainer.js";
import GridItem from "../components/Components/Grid/GridItem.js";
import NavPills from "../components/Components/NavPills/NavPills.js";
import Parallax from "../components/Components/Parallax/Parallax.js";
import SnackbarContent from "../components/Components/Snackbar/SnackbarContent.js";

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

import styles from "../assets/jss/material-kit-react/views/profilePage.js";
import styleNavbar from "../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(styles);
const useStyleNavbar = makeStyles(styleNavbar);

export default function ProfilePage(props) {
  const classes = useStyles();
  const classesNav = useStyleNavbar();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navigate = useNavigate();
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  function logout() {
    Axios({
      method: "POST",
      withCredentials: true,
      url: "https://api-begenius.herokuapp.com//logout",
    })
      .then((res) => {
        console.log(res.data);
        if (!res.data.logged) {
          props.setLogged(res.data.logged);
          props.setVariante("success");
          props.setMensaje(res.data.mensaje);
        }
        props.setAlert(true);
        setTimeout(() => {
          //hide notification
          props.setAlert(false);
          if (res.data.logged) {
            navigate("/profile");
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
      <Header
        brand="beGenius"
        color="transparent"
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "info",
        }}
        rightLinks={
          <List className={classes.list}>
            <ListItem className={classesNav.listItem}>
              <Link to={"/"} className={classesNav.listItem}>
                <Button className={classesNav.navLink} color="transparent">
                  Home
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
                Events
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
                  Contact
                </Button>
              </Link>
            </ListItem>
            {/* BUTTON LOGOUT */}

            <ListItem className={classesNav.listItem}>
              <Link to={"/"} className={classesNav.listItem}>
                <Button
                  className={classesNav.navLinkActive}
                  color="transparent"
                  onClick={logout}
                >
                  LOGOUT
                </Button>
              </Link>
            </ListItem>
          </List>
        }
      />
      <Parallax
        small
        filter
        image={require("../assets/img/profile-bg.jpg").default}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
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
                    <h3 className={classes.title}>Christian Louboutin</h3>
                    <h6>DESIGNER</h6>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                An artist of considerable range, Chet Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.{" "}
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Studio",
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
                      tabButton: "Work",
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
                      tabButton: "Favorite",
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
      <Footer />
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
