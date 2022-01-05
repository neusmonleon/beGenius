import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";

import styles from "../../../assets/jss/material-kit-react/views/componentsSections/completedStyle.js";

const useStyles = makeStyles(styles);

export default function SectionCompletedExamples(props) {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            {props.title == null ? (
              <h2>Completed with examples</h2>
            ) : (
              <h2>{props.title}</h2>
            )}
            {props.text == null ? (
              <h4>
                The kit comes with three pre-built pages to help you get started
                faster. You can change the text and images and you{"'"}re good
                to go. More importantly, looking at them will give you a picture
                of what you can build with this powerful kit.
              </h4>
            ) : (
              <h4>{props.text}</h4>
            )}
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
