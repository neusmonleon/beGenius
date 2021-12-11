import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui icons

import Subject from "@material-ui/icons/Subject";
// core components
import GridContainer from "../Components/Grid/GridContainer.js";
import GridItem from "../Components/Grid/GridItem.js";
import Card from "../Components/Card/Card.js";
import CardBody from "../Components/Card/CardBody.js";
import Button from "../Components/CustomButtons/Button.js";
import color1 from "../../assets/img/luismoreno.jpg";
import color3 from "../../assets/img/luismoreno.jpg";
import color2 from "../../assets/img/luismoreno.jpg";

import styles from "../../assets/jss/material-kit-react/views/ecommerceSections/productsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionProducts() {
  //styles
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <h2>News in fashion</h2>
        <GridContainer>
          <GridItem md={4} sm={4}>
            <Card background style={{ backgroundImage: `url(${color1})` }}>
              <CardBody background>
                <h6
                  className={classNames(classes.cardCategory, classes.textInfo)}
                >
                  Productivity Apps
                </h6>
                <a href="#pablo">
                  <h3 className={classes.cardTitle}>
                    The best trends in fashion 2021
                  </h3>
                </a>
                <p className={classes.description}>
                  Don{"'"}t be scared of the truth because we need to restart
                  the human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </p>
                <Button href="#" round color="white">
                  <Subject /> Read
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md={4} sm={4}>
            <Card background style={{ backgroundImage: `url(${color3})` }}>
              <CardBody background>
                <h6
                  className={classNames(classes.cardCategory, classes.textInfo)}
                >
                  FASHION NEWS
                </h6>
                <a href="#pablo">
                  <h3 className={classes.cardTitle}>
                    Kanye joins the Yeezy team at Adidas
                  </h3>
                </a>
                <p className={classes.description}>
                  Don{"'"}t be scared of the truth because we need to restart
                  the human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </p>
                <Button href="#" round color="white">
                  <Subject /> Read
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md={4} sm={4}>
            <Card background style={{ backgroundImage: `url(${color2})` }}>
              <CardBody background>
                <h6
                  className={classNames(classes.cardCategory, classes.textInfo)}
                >
                  Productivity Apps
                </h6>
                <a href="#pablo">
                  <h3 className={classes.cardTitle}>
                    Learn how to use the new colors of 2021
                  </h3>
                </a>
                <p className={classes.description}>
                  Don{"'"}t be scared of the truth because we need to restart
                  the human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </p>
                <Button href="#" round color="white">
                  <Subject /> Read
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
