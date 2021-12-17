import React from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import {
  makeStyles,
  IconButton,
  Button,
  Hidden,
  AppBar,
  Toolbar,
  Drawer,
  PersonAddOutlined,
  List,
  Menu,
  stylesHeader,
  stylesNavbar,
  ListItem,
  ShoppingCart,
  Tooltip,
  tooltipsStyle,
} from "ComponentStyle";
// nodejs library to set properties for components
import PropTypes from "prop-types";

//TODO: REFACTORIZE IMAGES
import profileImage from "../../../assets/img/faces/avatar.jpg";
import logo from "../../../assets/img/logo_web.png";

export default function Header(props) {

  
  const useStyles = makeStyles(stylesHeader);
  const useStylesNav = makeStyles(stylesNavbar);
  const classes = useStyles();
  const classesNav = useStylesNav();

  const navigate = useNavigate();

  function logout() {
    Axios({
      method: "POST",
      data: {
        email: props.user,
      },
      withCredentials: true,
      url: "http://localhost:3002/logout",
    })
      .then((res) => {
        console.log(res.data);
        props.setLogged(false);
        if (res.data.logged === false) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //MOBILE OPTION
  const [mobileOpen, setMobileOpen] = React.useState(false);
  //EFFECT TRIGGERED BY SCROLL
  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });
  //TOGGLE MOBILE HAMBURGER MENU
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  //CHANGE COLOR ON SCROLL
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };
  const { color, leftLinks, brand, fixed, absolute, active, logged } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });
  const brandComponent = (
    <Button className={classes.title}>{brand || "beGenius"}</Button>
  );

  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        {leftLinks !== undefined ? brandComponent : null}
        {/* LOGO */}
        <Link to={"/"}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            padding="0"
            onClick={handleDrawerToggle}
          >
            <div>
              <img src={logo} alt="begenius-logo" width="300px"></img>
            </div>
          </IconButton>
        </Link>
        {/* TITLE LANDPAGE */}
        {/* <div className={classes.flex}>
          {leftLinks !== undefined ? (
            <Hidden smDown implementation="css">
              {leftLinks}
            </Hidden>
          ) : (
            brandComponent
          )}
        </div> */}
        {/* RIGHT LINKS */}
        <Hidden smDown implementation="css">
          <List className={classes.list}>
            <ListItem className={classesNav.listItem}>
              <Link to={"/"} className={classesNav.listItem}>
                <Button
                  className={
                    active === "home"
                      ? classesNav.navLinkActive
                      : classesNav.navLink
                  }
                  color="transparent"
                >
                  Inicio
                </Button>
              </Link>
            </ListItem>
            <ListItem className={classesNav.listItem}>
              <Link to={"/events"} className={classesNav.listItem}>
                <Button
                  className={
                    active === "events"
                      ? classesNav.navLinkActive
                      : classesNav.navLink
                  }
                  color="transparent"
                >
                  Eventos
                </Button>
              </Link>
            </ListItem>
            <ListItem className={classesNav.listItem}>
              <Link to={"/faqs"} className={classesNav.listItem}>
                <Button
                  className={
                    active === "faqs"
                      ? classesNav.navLinkActive
                      : classesNav.navLink
                  }
                  color="transparent"
                >
                  FAQs
                </Button>
              </Link>
            </ListItem>
            <ListItem className={classesNav.listItem}>
              <Link to={"/contact"} className={classesNav.listItem}>
                <Button
                  className={
                    active === "contact"
                      ? classesNav.navLinkActive
                      : classesNav.navLink
                  }
                  color="transparent"
                >
                  Contacto
                </Button>
              </Link>
            </ListItem>
            {/* BUTTON LOGIN / LOGOUT */}
            {props.logged === true ? (
              //logout button
              <ListItem className={classesNav.listItem}>
                <Button
                  className={
                    active === "login"
                      ? classesNav.navLinkActive
                      : classesNav.navLink
                  }
                  onClick={() => {
                    logout();
                  }}
                  color="transparent"
                >
                  Logout
                </Button>
              </ListItem>
            ) : (
              //login button
              <ListItem className={classesNav.listItem}>
                <Link to={"/login"} className={classesNav.listItem}>
                  <Button
                    className={
                      active === "login"
                        ? classesNav.navLinkActive
                        : classesNav.navLink
                    }
                    color="transparent"
                  >
                    LogIn
                  </Button>
                </Link>
              </ListItem>
            )}
            <ListItem className={classesNav.listItem}>
              <Link to={"/payment"} className={classesNav.listItem}>
                <Button className={classesNav.navLink} color="transparent">
                  Checkout
                </Button>
              </Link>
            </ListItem>
            {/* BUTTON REGISTER - TERNARY with login */}
            {props.logged === false ? (
              <ListItem className={classesNav.listItem}>
                <Link to="/register" params="" className={classesNav.listItem}>
                  <Button
                    // justIcon
                    round
                    color="info"
                  >
                    <PersonAddOutlined className={classes.icons} />
                    Sign Up
                  </Button>
                </Link>
              </ListItem>
            ) : (
              <></>
            )}
            {/* PROFILE PICTURE */}
            {props.logged === true ? (
              <Tooltip
                title="MI PERFIL"
                placement="top"
                classes={{ tooltip: tooltipsStyle }}
              >
                <Button className={classesNav.listItem} color="transparent">
                  <ListItem className={classesNav.listItem}>
                    <Link to={"/profile"} className={classesNav.listItem}>
                      <Button
                        className={classesNav.listItem}
                        color="transparent"
                        imageDropdownButton
                      >
                        <img
                          src={profileImage}
                          className={classesNav.img}
                          alt="profile"
                        />
                      </Button>
                    </Link>
                  </ListItem>
                </Button>
              </Tooltip>
            ) : (
              <></>
            )}
            <ListItem className={classesNav.listItem}>
              <Link to={"/shop"} className={classesNav.listItem}>
                <Button
                  className={
                    active === "shop"
                      ? classesNav.navLinkActive
                      : classesNav.navLink
                  }
                  color="transparent"
                >
                  <ShoppingCart />
                </Button>
              </Link>
            </ListItem>
          </List>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      {/* //-------------MENU HAMBURGER------------ */}
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classesNav.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {leftLinks}
            {
              <List className={classesNav.list}>
                <ListItem className={classesNav.listItem}>
                  <Link to={"/"} className={classesNav.listItem}>
                    <Button className={classesNav.navLink} color="transparent">
                      Inicio
                    </Button>
                  </Link>
                </ListItem>
                <ListItem className={classesNav.listItem}>
                  <Button
                    href="/events"
                    className={classesNav.navLink}
                    onClick={(e) => e.preventDefault()}
                    color="transparent"
                  >
                    Eventos
                  </Button>
                </ListItem>
                <ListItem className={classesNav.listItem}>
                  <Link to={"/faqs"} className={classesNav.listItem}>
                    <Button className={classesNav.navLink} color="transparent">
                      FAQs
                    </Button>
                  </Link>
                </ListItem>

                <ListItem className={classesNav.listItem}>
                  <Link to={"/contact"} className={classesNav.listItem}>
                    <Button className={classesNav.navLink} color="transparent">
                      Contacto
                    </Button>
                  </Link>
                </ListItem>
                {/* BUTTON LOGIN / LOGOUT */}
                {props.logged === true ? (
                  <ListItem className={classesNav.listItem}>
                    <Link to={"/logout"} className={classesNav.listItem}>
                      <Button
                        className={classesNav.navLinkActive}
                        color="transparent"
                      >
                        LOGOUT
                      </Button>
                    </Link>
                  </ListItem>
                ) : (
                  <ListItem className={classesNav.listItem}>
                    <Link to={"/login"} className={classesNav.listItem}>
                      <Button
                        className={classesNav.navLinkActive}
                        color="transparent"
                      >
                        LOGIN
                      </Button>
                    </Link>
                  </ListItem>
                )}

                {/* BUTTON REGISTER - TERNARY with login */}
                {props.logged === false ? (
                  <ListItem className={classesNav.listItem}>
                    <Link
                      to="/register"
                      params=""
                      className={classesNav.listItem}
                    >
                      <Button
                        // justIcon
                        round
                        color="info"
                      >
                        <PersonAddOutlined className={classesNav.icons} />
                        Sign Up
                      </Button>
                    </Link>
                  </ListItem>
                ) : (
                  <></>
                )}
              </List>
            }
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
}

Header.defaultProp = {
  color: "white",
};

Header.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark",
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark",
    ]).isRequired,
  }),
};
