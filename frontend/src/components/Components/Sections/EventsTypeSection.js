import React from "react";
import Info from "../Typography/Info";

import {
  makeStyles,
  GridContainer,
  GridItem,
  Card,
  CardBody,
  CardHeader,
} from "../../../ComponentStyle";

import eventTypeImg1 from "../../../assets/img/RRSS_Pics/fondo8.jpg";
import eventTypeImg2 from "../../../assets/img/RRSS_Pics/fondo2.jpeg";
import eventTypeImg3 from "../../../assets/img/RRSS_Pics/fondo6.jpg";
import sectionInterestedStyle from "../../../assets/jss/material-kit-react/views/blogPostsSections/sectionInterestedStyle.js";

const useStyles = makeStyles(sectionInterestedStyle);

export default function EventsTypeSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <h3 className={classes.title + " " + classes.textCenter + classes.h6}>
        ¡Tu opinión nos importa!<i> #Share with us</i>{" "}
      </h3>
      <br />
      <GridContainer>
        <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
          <Card plain blog>
            <CardHeader image plain>
              <img src={eventTypeImg1} alt="..." width={330} height={200} />
              <div
                className={classes.coloredShadow}
                style={{
                  backgroundImage: "",
                  opacity: "1",
                }}
              />
            </CardHeader>
            <CardBody plain>
              <Info>
                <h6>TEAMBUILDING</h6>
              </Info>
              <h4 className={classes.cardTitle}>
                Disfruta con tu empresa de los mejores eventos personalizados.
              </h4>
              <p className={classes.description}>
                <i>
                  "La verdad que no me esperaba que fuera tan entretenido. Es
                  importante el trabajo en equipo para conseguir los retos, una
                  idea buenísima para fomentar las relaciones co-departamentales
                  en una empresa. La atención ejemplar y mucha risa y
                  diversión...¡nos encantó la experiencia! <br />
                  <b>Mireia Garcia, 2021.</b>
                </i>
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
          <Card plain blog>
            <CardHeader plain image>
              <img src={eventTypeImg2} alt="..." width={330} height={200} />

              <div
                className={classes.coloredShadow}
                style={{
                  backgroundImage: "",
                  opacity: "1",
                }}
              />
            </CardHeader>
            <CardBody plain>
              <Info>
                <h6>EVENTOS</h6>
              </Info>
              <h4 className={classes.cardTitle}>
                Eventos competitivos, de ocio, educativos, de causa, etc...
              </h4>
              <p className={classes.description}>
                <i>
                  Ha sido una misión súper divertida, bien organizada y
                  gestionada. Los niños se lo han pasado en grande y los mayores
                  hemos podido “exprimir” un poco nuestras neuronas. El personal
                  es muy atento y profesional. Realmente amable y dedicado a la
                  atención al cliente. ¡Volveremos!
                  <br />
                  <b>Rafa Fernandez, 2021.</b>
                </i>
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
          <Card plain blog>
            <CardHeader plain image>
              <img src={eventTypeImg3} alt="..." width={330} height={200} />

              <div
                className={classes.coloredShadow}
                style={{
                  backgroundImage: "",
                  opacity: "1",
                }}
              />
            </CardHeader>
            <CardBody plain>
              <Info>
                <h6>TURISMO </h6>
              </Info>
              <h4 className={classes.cardTitle}>
                ¡Conoce la ciudad como nunca antes la has conocido!
              </h4>
              <p className={classes.description}>
                <i>
                  ¡100% recomendable! Un plan magnfífico para cuando te visita
                  la familia, aunque tengo que decir que llevo viviendo en
                  Madrid toda mi vida, y ¡me sorprendió de la cantidad de
                  historias y curiosidades que no sabía! ¡Una en la misma calle
                  ne la que vivo!
                  <br />
                  <b>Fuensanta Perez, 2021.</b>
                </i>
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
