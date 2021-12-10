import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PersonIcon from "@material-ui/icons/PersonAddOutlined";
import CustomDropdown from "../../components/Components/CustomDropdown/CustomDropdown.js";
import profileImage from "../../assets/img/faces/avatar.jpg";

// core components
import Header from "../Components/Header/Header.js";
import Footer from "../Components/Footer/Footer.js";
import GridContainer from "../Components/Grid/GridContainer.js";
import GridItem from "../Components/Grid/GridItem.js";
import Button from "../Components/CustomButtons/Button.js";
import Slide from "@material-ui/core/Slide";
import Parallax from "../Components/Parallax/Parallax.js";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
// @material-ui/icons
import Close from "@material-ui/icons/Close";

//import styles from "../../assets/jss/material-kit-react/views/landingPage.js";
import styleNavbar from "../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";
import styleModal from "../../assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

//import { Link } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyleNavbar = makeStyles(styleNavbar);
const useStyleModal = makeStyles(styleModal);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function LandingPage(props) {
  const [largeModal, setLargeModal] = React.useState(false);

  const classes = useStyleNavbar();
  const classesModal = useStyleModal();

  useEffect(() => {
    setLargeModal(true);
  }, []);

  return (
    <div className={classes.section}>
      <div id="navbar" className={classes.navbar}>
        <Header
          brand="beGenius"
          color="dark"
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "info",
          }}
          rightLinks={
            <List className={classes.list}>
              <ListItem className={classes.listItem}>
                <Link to={"/"} className={classes.listItem}>
                  <Button className={classes.navLinkActive} color="transparent">
                    Inicio
                  </Button>
                </Link>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Button
                  href="/events"
                  className={classes.navLink}
                  onClick={(e) => e.preventDefault()}
                  color="transparent"
                >
                  Eventos
                </Button>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Link to={"/faqs"} className={classes.listItem}>
                  <Button className={classes.navLink} color="transparent">
                    FAQs
                  </Button>
                </Link>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Link to={"/contact"} className={classes.listItem}>
                  <Button className={classes.navLink} color="transparent">
                    Contacto
                  </Button>
                </Link>
              </ListItem>
              {/* BUTTON LOGIN / LOGOUT */}
              {props.logged === true ? (
                <></>
              ) : (
                <ListItem className={classes.listItem}>
                  <Link to={"/login"} className={classes.listItem}>
                    <Button className={classes.navLink} color="transparent">
                      LogIn
                    </Button>
                  </Link>
                </ListItem>
              )}

              {/* BUTTON REGISTER - TERNARY with login */}
              {props.logged === false ? (
                <ListItem className={classes.listItem}>
                  <Link to="/register" params="" className={classes.listItem}>
                    <Button
                      // justIcon
                      round
                      color="info"
                    >
                      <PersonIcon className={classes.icons} />
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
      <Parallax
        filter
        image={require("../../assets/img/landing-bg.jpg").default}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Story Starts With Us.</h1>
              <h4>
                Every landing page needs a small description after the big bold
                title, that{"'"}s why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <Dialog
        classes={{
          root: classesModal.modalRoot,
          paper:
            classesModal.modal +
            " " +
            classesModal.modalLarge +
            " " +
            classesModal.background,
        }}
        open={largeModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setLargeModal(false)}
        aria-labelledby="large-modal-slide-title"
        aria-describedby="large-modal-slide-description"
      >
        <DialogTitle
          id="large-modal-slide-title"
          disableTypography
          className={classesModal.modalHeader}
        >
          <Button
            simple
            className={classesModal.modalCloseButton}
            key="close"
            aria-label="Close"
            onClick={() => setLargeModal(false)}
          >
            {" "}
            <Close className={classesModal.modalClose} />
          </Button>
          <h4 className={classesModal.modalTitle}>Politica de cookies 🍪</h4>
        </DialogTitle>
        <DialogContent
          id="large-modal-slide-description"
          className={classesModal.modalBody}
        >
          <p>
            Aviso de privacidad: Con su consentimiento, nosotros y nuestros
            socios usamos cookies o tecnologías similares para almacenar,
            acceder y procesar datos personales como su visita en este sitio
            web. Puede retirar su consentimiento u oponerse al procesamiento
            tratamiento de datos basado en intereses legítimos en cualquier
            momento haciendo clic en &nbsp;
            <Link to="/politica-de-privacidad">Politica de Privacidad</Link>
            &nbsp;en este sitio web.
          </p>
          <Button
            className={classesModal.buttonColor}
            onClick={() => {
              setLargeModal(false);
            }}
          >
            Aceptar
          </Button>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
}
