import React from "react";

import {
  makeStyles,
  GridContainer,
  GridItem,
  stylesLandingPage,
  ContactSection,
  Parallax,
} from "ComponentStyle.js";

const useStyle = makeStyles(stylesLandingPage);

export default function ContanctUs(props) {
  props.setActiveNav("contact");
  props.setScrollNav(false);

  const classes = useStyle();
  return (
    <>
      <Parallax mini image={require("../assets/img/Contactus2.jpg").default}> </Parallax>
      <div className={classes.main + " " + classes.mainRaised}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}></GridItem>
          <GridItem cs={12} sm={12} md={8}>
            <ContactSection
              variante={props.variante}
              setVariante={props.setVariante}
              mensaje={props.mensaje}
              setMensaje={props.setMensaje}
            />
          </GridItem>
        </GridContainer>
      </div>
    </>
  );
}
