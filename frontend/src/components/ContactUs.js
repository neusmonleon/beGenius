import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PersonIcon from "@material-ui/icons/PersonAddOutlined";
import CustomDropdown from "./Components/CustomDropdown/CustomDropdown.js";
import profileImage from "../assets/img/faces/avatar.jpg";

// core components
import Header from "./Components/Header/Header.js";
import Footer from "./Components/Footer/Footer.js";
import GridContainer from "./Components/Grid/GridContainer.js";
import GridItem from "./Components/Grid/GridItem.js";

import Button from "./Components/CustomButtons/Button.js";
import styles from "../assets/jss/material-kit-react/views/landingPage.js";
import styleNavbar from "../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

// Sections for this page
import ContactSection from "./Sections/ContactSection.js";
//import { Link } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyle = makeStyles(styles);
const useStyleNavbar = makeStyles(styleNavbar);

export default function ContanctUs(props) {
  const classesNav = useStyleNavbar();
  const classes = useStyle();
  return (
    <div className={classes.section}>
      <div id="navbar" className={classesNav.navbar}>
        <Header
          brand="beGenius"
          color="dark"
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
              <Link to={"/faqs"} className={classesNav.listItem}>
                <Button className={classesNav.navLink} color="transparent">
                  FAQs
                </Button>
              </Link>
              </ListItem>

              <ListItem className={classesNav.listItem}>
                <Link to={"/contact"} className={classesNav.listItem}>
                  <Button
                    className={classesNav.navLinkActive}
                    color="transparent"
                  >
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
                  <Link
                    to="/register"
                    params=""
                    className={classesNav.listItem}
                  >
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
                        classesNav.navLink +
                        " " +
                        classesNav.imageDropdownButton,
                      color: "transparent",
                    }}
                    dropdownList={[
                      "Me",
                      "Settings and other stuff",
                      "Sign out",
                    ]}
                  />
                </ListItem>
              ) : (
                <></>
              )}
            </List>
          }
        />
      </div>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
            <ContactSection
              variante={props.variante}
              setVariante={props.setVariante}
              mensaje={props.mensaje}
              setMensaje={props.setMensaje}
            />
          </GridItem>
        </GridContainer>
      </div>
      <Footer />
    </div>
  );
}
