import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "../Components/Grid/GridContainer.js";
import GridItem from "../Components/Grid/GridItem.js";
import Card from "../Components/Card/Card.js";
import CardHeader from "../Components/Card/CardHeader.js";
import CardBody from "../Components/Card/CardBody.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import dg6 from "../../assets/img/events.jpg";
import dg10 from "../../assets/img/events.jpg";
import dg9 from "../../assets/img/events.jpg";

import styles from "../../assets/jss/material-kit-react/views/ecommerceSections/blogStyle.js";

const useStyles = makeStyles(styles);

export default function SectionBlog() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <h2 className={classes.sectionTitle}> Juega cuando quieras:</h2>
        <GridContainer>
          <GridItem md={4} sm={4}>
            <Card blog>
              <CardHeader image>
                <a href="#pablo">
                  <img src={dg6} alt="..." />
                </a>
                <div
                  className={classes.coloredShadow}
                  style={{ backgroundImage: `url(${dg6})`, opacity: 1 }}
                />
              </CardHeader>
              <CardBody>
                <h6
                  className={classNames(classes.cardCategory, classes.textRose)}
                >
                  Trends
                </h6>
                <h4 className={classes.cardTitle}>
                  <a href="#pablo">
                    Learn how to wear your scarf with a floral print shirt
                  </a>
                </h4>
                <p className={classes.cardDescription}>
                  Don{"'"}t be scared of the truth because we need to restart
                  the human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md={4} sm={4}>
            <Card blog>
              <CardHeader image>
                <a href="#pablo">
                  <img src={dg10} alt="..." />
                </a>
                <div
                  className={classes.coloredShadow}
                  style={{ backgroundImage: `url(${dg10})`, opacity: 1 }}
                />
              </CardHeader>
              <CardBody>
                <h6
                  className={classNames(classes.cardCategory, classes.textRose)}
                >
                  Fashion Week
                </h6>
                <h4 className={classes.cardTitle}>
                  <a href="#pablo">
                    Katy Perry was wearing a Dolce & Gabanna arc dress
                  </a>
                </h4>
                <p className={classes.cardDescription}>
                  Don{"'"}t be scared of the truth because we need to restart
                  the human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md={4} sm={4}>
            <Card blog>
              <CardHeader image>
                <a href="#pablo">
                  <img src={dg9} alt="..." />
                </a>
                <div
                  className={classes.coloredShadow}
                  style={{ backgroundImage: `url(${dg9})`, opacity: 1 }}
                />
              </CardHeader>
              <CardBody>
                <h6
                  className={classNames(classes.cardCategory, classes.textRose)}
                >
                  Fashion Week
                </h6>
                <h4 className={classes.cardTitle}>
                  <a href="#pablo">
                    Check the latest fashion events and which are the trends
                  </a>
                </h4>
                <p className={classes.cardDescription}>
                  Don{"'"}t be scared of the truth because we need to restart
                  the human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </p>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}