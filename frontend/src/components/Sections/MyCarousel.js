import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";

import {
  GridContainer,
  GridItem,
  Card,
  makeStyles,
} from "../../ComponentStyle";

import carouselStyle from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

// import HowtoPlay img from "../../assets/img/How2Play";
import step1 from "../../assets/img/How2Play/One.jpg";
import step2 from "../../assets/img/How2Play/paso2.jpg";
import step3 from "../../assets/img/How2Play/paso3v1.jpg";
import step4 from "../../assets/img/How2Play/step4map.jpg";

const useStyles = makeStyles(carouselStyle);

export default function MyCarousel(props) {
  const classes = useStyles();
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className={classes.section} id="carousel">
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6} className={classes.marginAuto}>
            <h2 className={classes.h2}>Cómo jugar:</h2>
            <Card>
              <Carousel {...settings}>
                <img src={step1} alt="ComoJugar" className="slick-image" />
                <img src={step2} alt="ComoJugar" className="slick-image" />
                <img src={step3} alt="ComoJugar" className="slick-image" />
                <img src={step4} alt="ComoJugar" className="slick-image" />
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
