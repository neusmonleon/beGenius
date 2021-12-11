import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import PersonIcon from "@material-ui/icons/PersonAddOutlined";
import { LinkedIn, Facebook, Instagram, Twitter } from "@material-ui/icons";
// core components
import GridContainer from "./Components/Grid/GridContainer.js";
import GridItem from "./Components/Grid/GridItem.js";
import Button from "./Components/CustomButtons/Button.js";
import Card from "./Components/Card/Card.js";
import CardBody from "./Components/Card/CardBody.js";
import CardFooter from "./Components/Card/CardFooter.js";

//core components
import Header from "../components/Components/Header/Header.js";
import Footer from "../components/Components/Footer/Footer.js";

import styles from "../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import styleNavbar from "../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

import team1 from "../assets/img/neus.jpeg";
import team2 from "../assets/img/luismoreno2.jpg";
import team3 from "../assets/img/kendall2.jpg";

const useStyles = makeStyles(styles);
const useStyleNavbar = makeStyles(styleNavbar);

export default function TeamPage(props) {
  const classes = useStyles();
  const classesNav = useStyleNavbar();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const [linkedin, setLinkedin] = useState(false);
  useEffect(() => {
    if (linkedin === true) {
      window.open(
        "https://www.linkedin.com/in/neus-monleon-672392141/",
        "_blank"
      );
      // window.location.href =
      //   "https://www.linkedin.com/in/neus-monleon-672392141/";
    }
  }, [linkedin]);

  return (
    <>
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
            </List>
          }
        />
      </div>
      <div className={classes.section}></div>
      <div className={classes.section}>
        <h2 className={classes.title}>Quienes somos:</h2>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain className={classes.justifyCenter}>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team1} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Neus Monleón
                  <br />
                  <small className={classes.smallTitle}>
                    Founder & Fullstack Developer
                  </small>
                </h4>
                <div className={classes.flex}>
                  <LinkedIn
                    onClick={() => {
                      setLinkedin(true);
                    }}
                  />
                </div>
                <CardBody>
                  <p className={classes.description}>
                    ¡Hola a tod@s! Mi trayectoria profesional comienza después
                    de graduarme en Admon. y Dirección de Empresas. Tuve la
                    oportunidad de trabajar en una empresa internacional
                    hotelera, donde he podido pasar por distintos departamentos,
                    desde Real Estate, Financial controller, hasta Control de
                    Gestion y Relación con Inversores. Desde dentro de la
                    empresa me empecé a interesar en la programación y como de
                    ahí podía yo misma adecuar mis propios archivos de análisis
                    para dar una mayor competitividad y efectividad a la
                    empresa,como bien dijo Bill Gates "Creo que todo el mundo
                    debería aprender a programar", eso me llevó a realizar un
                    Bootcamp de Javascript(Code4Jobs), que me dió las
                    herramientas para poder llevar a cabo este proyecto. ¡No
                    puedo estar mas contenta! Mi otra gran pasión es viajar y
                    conocer nuevas culturas.
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-twitter"} />
                  </Button>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-instagram"} />
                  </Button>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-facebook"} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain className={classes.justifyCenter}>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team2} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Luis Moreno
                  <br />
                  <small className={classes.smallTitle}>
                    Social Comunity Manager
                  </small>
                </h4>
                <div className={classes.flex}>
                  <Facebook className={classes.a} />
                  <Instagram className={classes.a} />
                  <Twitter className={classes.a} />
                </div>
                <CardBody>
                  <p className={classes.description}>
                    ¡Hola a todo@s!, soy Luis Moreno, Social Media Manager,
                    Consultor y Formador en Redes Sociales. Me gradué en la
                    universidad de Greenwich (Londres), en marketing. Mi
                    objetivo es obtener un win-win gracias a una buen estrategia
                    en redes sociales. Me apasiona la fotografía, conocer gente
                    y estar cerca de mis amigos.
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-twitter"} />
                  </Button>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-linkedin"} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain className={classes.justifyCenter}>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team3} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Kendall Jenner
                  <br />
                  <small className={classes.smallTitle}>
                    Escritora de enigmas
                  </small>
                </h4>
                <div className={classes.flex}>
                  <Instagram className={classes.a} />
                  <Twitter className={classes.a} />
                </div>
                <CardBody>
                  <p className={classes.description}>
                    Yo soy Kendall, aunque todos me llaman Ken. Mi gran pasión
                    es la Literatura, Filología y Periodismo. Mis novelas
                    favoritas son las de terror y thriller. ¡Adoro aquellas
                    historias en las que hasta el final no sabes quién ha sido
                    el culpable!. En mi tiempo libre escribo, viajo siempre que
                    puedo, para aprender y tener nuevas ideas, y además soy una
                    gran cinefila!
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-twitter"} />
                  </Button>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-instagram"} />
                  </Button>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-facebook"} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer whiteFont />
    </>
  );
}
