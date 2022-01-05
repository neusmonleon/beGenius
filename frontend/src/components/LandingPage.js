import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//MATERIAL UI
import Carousel from "./Sections/MyCarousel.js";
import SectionImage from "../components/Components/Sections/SectionImage";
import EventsTypeSection from "../components/Components/Sections/EventsTypeSection";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Close,
  makeStyles,
  GridContainer,
  GridItem,
  Button,
  Parallax,
  stylesNavbar,
  SectionCompletedExamples,
  stylesLandingSectionExample,
  sectionInterestedStyle,
} from "../ComponentStyle.js";
//STYLES
const styles = {
  ...stylesLandingSectionExample,
  ...stylesNavbar,
};
const useStyle = makeStyles(styles);
const useIntStyles = makeStyles(sectionInterestedStyle);
const useModalStyle = makeStyles(sectionInterestedStyle);

export default function LandingPage(props) {
  const classes = useStyle();
  const classesInt = useIntStyles();
  const classesModal = useModalStyle();
  const [largeModal, setLargeModal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  /*  MODAL COOOKIES  */
  // eslint-disable-next-line
  useEffect(() => {
    props.setActiveNav("home");
    props.setScrollNav(true);
    if (window.localStorage.getItem("cookies") === null) {
      setLargeModal(true);
    }
  });

  return (
    <>
      {/* Section with video */}
      <div className={classes.section + " " + classes.sectionNoPadding}>
        <Parallax filter image={require("../assets/img/salon.jpg").default}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title + " " + classes.white}>
                  be Smart, be Clever, be a Genius
                </h1>
                <br />
                <Button
                  color="danger"
                  size="lg"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setShowVideo(true);
                  }}
                >
                  <i className="fas fa-play" />
                  Watch video
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
      </div>
      {/* Text section */}
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.container + " " + classes.sectionLanding}>
              <SectionCompletedExamples
                title={
                  "Reúne a tus amigos y familiares para un día de diversión, repleto de enigmas y risas"
                }
                text={
                  "¡Pasar tiempo de calidad con las personas que amas no debería ser un asesinato! ¿O si? BeGenius crea experiencias inmersivas al aire libre que transforman las calles de la ciudad en aventuras imperdibles. Ya sea uno de nuestros eventos públicos o una actividad privada de formación de equipos, únete a miles de jugadores y encuentra una aventura de BeGenius cerca de ti."
                }
              />
            </div>
          </GridItem>
        </GridContainer>
        {/* EVENTS SECTION */}
        <div>
          <SectionImage />
        </div>
        {/* EVENTS AND COMMENTS SECTION */}
        <div>
          <EventsTypeSection className={classesInt} />
        </div>
        {/* CAROUSEL SECTION */}
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Carousel />
          </GridItem>
        </GridContainer>
      </div>
      {/* DIALOG MODAL */}
      {showVideo ? (
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
          open={showVideo}
          keepMounted
          onClose={() => {
            setShowVideo(false);
          }}
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
              className={
                classesModal.modalCloseButton + " " + classesModal.description
              }
              key="close"
              aria-label="Close"
              onClick={() => {
                setShowVideo(false);
              }}
            >
              <Close className={classesModal.modalClose} />
            </Button>
          </DialogTitle>
          <DialogContent
            id="large-modal-slide-description"
            className={classesModal.modalBody}
          >
            <div className="video-responsive">
              <iframe
                title="video"
                width="550"
                height="480"
                src={`https://www.youtube.com/embed/2MXiH7YWRuI`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </DialogContent>
        </Dialog>
      ) : (
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
          //TransitionComponent={Transition}
          keepMounted
          onClose={() => {
            setLargeModal(false);
            window.localStorage.setItem("cookies", "accepted");
          }}
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
              onClick={() => {
                setLargeModal(false);
                window.localStorage.setItem("cookies", "accepted");
              }}
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
                window.localStorage.setItem("cookies", "accepted");
              }}
            >
              Aceptar
            </Button>
          </DialogContent>
        </Dialog>
      )}
      {/* END DIALOG MODAL*/}
    </>
  );
}
