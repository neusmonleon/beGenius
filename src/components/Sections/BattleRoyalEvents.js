import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import { GridContainer } from "Components/Grid/GridContainer.js";
import GridItem from "../Components/Grid/GridItem.js";
import Card from "../Components/Card/Card.js";
import CardHeader from "../Components/Card/CardHeader.js";
import CardBody from "../Components/Card/CardBody.js";
import CardFooter from "../Components/Card/CardFooter.js";
import Button from "../Components/CustomButtons/Button.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui icons
import AddButton from "@material-ui/icons/AddBox";

import styles from "../../assets/jss/material-kit-react/views/ecommerceSections/latestOffersStyle.js";

import event1 from "../../assets/img/events.jpg";
import event2 from "../../assets/img/events.jpg";
import event3 from "../../assets/img/events.jpg";

const useStyles = makeStyles(styles);

export default function BattleRoyalEvents() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <h2>Eventos "Battle Royal":</h2>
        <GridContainer>
          <GridItem md={4} sm={4}>
            <Card product plain>
              <CardHeader image plain>
                <img src={event1} alt="..." />
              </CardHeader>
              <CardBody className={classes.textCenter} plain>
                <h4 className={classes.cardTitle}>event1</h4>
                <p className={classes.cardDescription}>
                  The structured shoulders and sleek detailing ensure a sharp
                  silhouette. Team it with a silk pocket square and leather
                  loafers.
                </p>
              </CardBody>
              <CardFooter plain>
                <div className={classes.priceContainer}>
                  <span className={classNames(classes.price, classes.priceNew)}>
                    {" "}
                    €743
                  </span>
                </div>
                <div className={classNames(classes.stats, classes.mlAuto)}>
                  <Tooltip
                    id="tooltip-top"
                    title="Añadir a tu cesta"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button justIcon simple size="lg" color="info">
                      <AddButton />
                    </Button>
                  </Tooltip>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem md={4} sm={4}>
            <Card product plain>
              <CardHeader image plain>
                <img src={event3} alt="..." />
              </CardHeader>
              <CardBody className={classes.textCenter} plain>
                <h4 className={classes.cardTitle}>event2</h4>
                <p className={classes.cardDescription}>
                  The structured shoulders and sleek detailing ensure a sharp
                  silhouette. Team it with a silk pocket square and leather
                  loafers.
                </p>
              </CardBody>
              <CardFooter plain>
                <div className={classes.priceContainer}>
                  <span className={classNames(classes.price, classes.priceNew)}>
                    {" "}
                    €743
                  </span>
                </div>
                <div className={classNames(classes.stats, classes.mlAuto)}>
                  <Tooltip
                    id="tooltip-top"
                    title="Añadir a tu cesta"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button justIcon simple size="lg" color="info">
                      <AddButton />
                    </Button>
                  </Tooltip>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem md={4} sm={4}>
            <Card product plain>
              <CardHeader image plain>
                <a href="#pablo">
                  <img src={event2} alt="..." />
                </a>
              </CardHeader>
              <CardBody className={classes.textCenter} plain>
                <h4 className={classes.cardTitle}>event3</h4>
                <p className={classes.cardDescription}>
                  The structured shoulders and sleek detailing ensure a sharp
                  silhouette. Team it with a silk pocket square and leather
                  loafers.
                </p>
              </CardBody>
              <CardFooter plain>
                <div className={classes.priceContainer}>
                  <span className={classNames(classes.price, classes.priceNew)}>
                    {" "}
                    €743
                  </span>
                </div>
                <div className={classNames(classes.stats, classes.mlAuto)}>
                  <Tooltip
                    id="tooltip-top"
                    title="Añadir a tu cesta"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button justIcon simple size="lg" size="lg" color="info">
                      <AddButton />
                    </Button>
                  </Tooltip>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
