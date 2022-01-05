import React from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Twitter from "@material-ui/icons/Twitter";
import Instagram from "@material-ui/icons/Instagram";
import Whatsapp from "@material-ui/icons/WhatsApp";

import styles from "../../../assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link to="/contact" className={classes.a + " " + classes.block}>
                Contacto
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link to="/teamwork" className={classes.a + " " + classes.block}>
                Nuestro equipo
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link to="/privacy" className={classes.a + " " + classes.block}>
                Términos y Política de privacidad
              </Link>
            </ListItem>
          </List>
        </div>

        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} - beGenius Street Scape.
        </div>
        <></>
        <div className={classes.right}>
          <Twitter className={classes.a} />
          <Instagram className={classes.a} />
          <Whatsapp className={classes.a} />
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
