import React from "react";
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import PersonIcon from "@material-ui/icons/PersonAddOutlined";
import Warning from "@material-ui/icons/Warning";
import Check from "@material-ui/icons/Check";
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
import SnackbarContent from "./Components/Snackbar/SnackbarContent.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Accordion from "../components/Components/Accordion/Accordion.js";
import CustomDropdown from "../components/Components/CustomDropdown/CustomDropdown.js";
import profileImage from "../assets/img/faces/avatar.jpg";

//Styles
import styles from "../assets/jss/material-kit-react/views/loginPage.js";
import styleNavbar from "../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

//import image from "../assets/img/fondo-web.jpg";
import image from "../assets/img/lotsquestions.jpg";

const useStyleNavbar = makeStyles(styleNavbar);
const useStyles = makeStyles(styles);

export default function FaqsPage(props) {
  /* LOGIN ANIMATION */
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const classesNav = useStyleNavbar();

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
                <Link to={"/faqs"} className={classesNav.listItem}>
                  <Button
                    className={classesNav.navLinkActive}
                    color="transparent"
                  >
                    FAQs
                  </Button>
                </Link>
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
                <ListItem className={classes.listItem}>
                  <CustomDropdown
                    left
                    caret={false}
                    hoverColor="black"
                    dropdownHeader="Dropdown Header"
                    buttonText={
                      <img
                        src={profileImage}
                        className={classes.img}
                        alt="profile"
                      />
                    }
                    buttonProps={{
                      className:
                        classes.navLink + " " + classes.imageDropdownButton,
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
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[cardAnimaton]}>
                {alert ? notification(props.variante) : <></>}
                <form className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    FAQS
                  </CardHeader>
                  <p className={classes.divider}>
                    Os resolvemos las dudas mas demandadas:
                  </p>
                  <CardBody>
                    <Accordion
                      active={0}
                      collapses={[
                        {
                          title: "¿Qué es un Street Scape?",
                          content: `Un Street Escape, también llamado Escape Room
                            Exterior, Escape Street, City Escape o Escape Outdoor,
                            es un juego que guarda los mismos elementos de un un
                            scape room, pero en vivo, un toque detectivesco real,
                            en el que un grupo de jugadores deben resolver un reto
                            planteado por una historia, en un tiempo máximo
                            determinado, descifrando enigmas, acertijos y puzzles,
                            utilizando como escenario las calles, plazs y rincones
                            de una ciudad o población.`,
                        },
                        {
                          title: "¿Cuántas personas puedes participar?",
                          content: `¡Tantas como quieran jugar! Eso sí, dependerá del tipo
                            de Street Scape escogido. Generalmente suelen ser
                            juegos de un máximo de 5 personas por partida. Eso
                            quiere decir que si sois un grupo menor es probable
                            que debais poner vuestro cerebro a náxima potencia, y
                            en el caso de ser un grupo mayor, debereis dividiros y
                            ¡Competir entre vosotros!.Recordad, que hay partidas
                            en las que competireis con muchísimos otros grupos,
                            por lo que debereis ser, organizados, rapidos y
                            astutos.`,
                        },
                        {
                          title: "¿A partir de que edad se puede jugar?",
                          content: `En los Street Escapes pueden participar personas, y
                            otros seres interdimensionales, entre los 14 y los 200
                            años (si hay alguno mayor preguntad). Los menores de
                            esa edad pueden jugar siempre que algún adulto se
                            responsabilice de ellos.`,
                        },
                        ,
                        {
                          title: "¿Qué tipos de Street Scape existen?",
                          content: `Hemos intentado abarcar todas las opciones para que
                            nadie se quede sin jugar, actualmente disponemos de:
                            1.Eventos especiales: Son Street Scapes que se
                            celebran en un dia y hora determinado, y por lo tanto
                            vais a contrareloj, y competís con muchísimos otroso
                            grupos. Gana quien descifre el enigma en el menor
                            tiempo posible. 2. Street Scape tradicional: Son
                            aquellos que podeis reqlizar en cualquier momento,
                            ¡Una tarde de fin de semana, es perfecto! 3. City
                            Street Scape: Hemos creado rutas turísticas de algunas
                            ciudades, para que podais visitar los monumentos y
                            lugares mas emblematicos de esa ciudad a la vez que
                            conoceis todas sus curiosidades y misterios.
                            4.Personalizados: Si tienes un evento especial, como
                            un cumpleaños, una despedida, un teambuiling para tu
                            empresa, o cualquier otra celebración, escribirnos y
                            personalizaremos la historia y el lugar donde se pueda
                            celebrar el Street Scape. Trabajo en equipo.`,
                        },
                        {
                          title: "¿Qué precio tienen los Street Scape?",
                          content: `El precio estandar actual de 35€/partida, con un
                          máximo de 5 jugadores, eso quiere decir que como mucho
                          podreis utilizar el código de la partida en un máximo
                          de cinco terminales. Pueden haber variacionres en
                          eventos especiales, y en los eventos
                          personalializados.`,
                        },
                        {
                          title: "¿Son siempre historias de miedo/detective?",
                          content: `¡Para nada! Aunque la tendencia es pensar eso, hay
                          tantas historias como colores posibles, de detectives,
                          policiacas, asesinos, ladrones, piratas y su busqueda
                          del tesoro, gimkanas, educativas, conoce tu ciudad,
                          etc...`,
                        },
                        {
                          title: "¿Qué beneficios tiene un Street Scape?",
                          content: `Entre otros beneficios, los juegos de street scape
                          mejoran el: Desarrollo de la memoria. No deja de ser
                          importante y entre ellos está la concentración,
                          intuición, creatividad y velocidad mental. Alta
                          sensación de logro. Es lo que hace resolver pruebas y
                          enigmas y conseguir el objetivo con tu equipo.
                          Educativo. Es una forma de aprendizaje mediante
                          juegos. Además el desarrollo intelectual como la
                          resolución de problemas son dos puntos fuertes que
                          también pueden servir en la vida cotidiana. Mejoran la
                          autoconfianza,la comunicación, por eso funciona bien
                          en los Team building ya que mejora la calidad del
                          trabajo y la toma de decisiones, la empatía es una
                          cualidad que facilita las relaciones entre compañeros.
                          Libera serotoninas y reduce el sedentarismo y una
                          rutina pobre en el área de la diversión.`,
                        },
                      ]}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}></CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>

      <div>
        <Footer whiteFont />
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
