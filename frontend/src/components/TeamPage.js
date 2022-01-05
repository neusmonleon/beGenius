import React, { useEffect } from "react";
// core components
import {
  makeStyles,
  GridContainer,
  GridItem,
  Button,
  LinkedIn,
  Facebook,
  Instagram,
  Twitter,
  Card,
  CardBody,
  CardFooter,
  stylesTeam2,
} from "../ComponentStyle.js";

//TODO: REFACTORIZAR IMAGENES
import team1 from "../assets/img/neus.jpeg";
import team2 from "../assets/img/luismoreno2.jpg";
import team3 from "../assets/img/kendall2.jpg";

const useStyles = makeStyles(stylesTeam2);

export default function TeamPage(props) {
  useEffect(() => {
    props.setActiveNav("teamwork");
    props.setScrollNav(false);
  });

  const classes = useStyles();
  const imageClasses =
    classes.imgRaised + " " + classes.imgRoundedCircle + " " + classes.imgFluid;

  //scroll to top
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  return (
    <>
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
                  <a
                    href="https://www.linkedin.com/in/neus-monleon"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn />
                  </a>
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
                    empresa,como bien dijo Steve Jobs - "Creo que todo el mundo
                    debería aprender a programar" - , eso me llevó a realizar un
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
    </>
  );
}
