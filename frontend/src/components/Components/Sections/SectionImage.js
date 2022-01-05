import React from "react";
// @material-ui/core components
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridContainer from "../../Components/Grid/GridContainer.js";
import GridItem from "../../Components/Grid/GridItem.js";
import Card from "../../Components/Card/Card.js";
import CardHeader from "../../Components/Card/CardHeader.js";
import CardBody from "../../Components/Card/CardBody.js";
import Muted from "../../Components/Typography/Muted.js";
import Button from "../../Components/CustomButtons/Button.js";

import bg10 from "assets/img/city-wallpaper.jpeg";

import sectionImageStyle from "../../../assets/jss/material-kit-react/views/blogPostsSections/sectionImageStyle.js";

const useStyles = makeStyles(sectionImageStyle);

export default function SectionImage() {
  const classes = useStyles();
  return (
    <div
      className={classes.section}
      style={{ backgroundImage: "url(" + bg10 + ")" }}
    >
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <Card profile plain className={classes.textLeft}>
              <GridContainer>
                <GridItem xs={12} sm={5} md={5}>
                  <CardHeader image plain>
                    <img
                      src="https://i.ibb.co/KDc9HyJ/Untitled-design-1.jpgg"
                      alt="Imagen evento"
                      width="210 mm"
                      height="210 mm"
                    />
                  </CardHeader>
                </GridItem>
                <GridItem xs={12} sm={7} md={7}>
                  <CardBody plain>
                    <h4 className={classes.cardTitle}>MASCARA VENECIANA</h4>
                    <Muted>
                      <h6 className={classes.cardh6}>
                        Madrid y Palma de Mallorca
                      </h6>
                    </Muted>
                    <p className={classes.description}>
                      Cuenta la leyenda que antiguamente las máscaras tapaban el
                      rostro de nariz para arriba... ¿Es más facil delinquir
                      reconociendo los labios o los ojos?
                    </p>
                  </CardBody>
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Card profile plain className={classes.textLeft}>
              <GridContainer>
                <GridItem xs={12} sm={5} md={5}>
                  <CardHeader image plain>
                    <img
                      src="https://i.ibb.co/Mfdr9BN/Untitled-210-x-210-mm-1.png"
                      alt="imagen del evento"
                      width="210 mm"
                      height="210 mm"
                    />
                  </CardHeader>
                </GridItem>
                <GridItem xs={12} sm={7} md={7}>
                  <CardBody plain>
                    <h4 className={classes.cardTitle}>
                      {" "}
                      <> HACKATON </>{" "}
                    </h4>
                    <Muted>
                      <h6 className={classes.cardh6}>Madrid</h6>
                    </Muted>
                    <p className={classes.description}>
                      ¡Por primera vez, un street scape para programadores!
                      Cónoce todos los detalles en la seccion eventos. ¡Date
                      prisa!
                    </p>
                  </CardBody>
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem>
            <Link to="/events">
              <Button color="info">Ver todos los eventos.</Button>
            </Link>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
