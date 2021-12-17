/*
 _________________________
/\                        \
\_|   Components Import   |
  |  _____________________|_
  \_/______________________/
*/
import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages for this app
import Components from "./components/Components/Components";
import LandingPage from "./components/LandingPage.js";
import ProfilePage from "./components/ProfilePage.js";
import LoginPage from "./components/LoginPage.js";
import RegisterPage from "./components/RegisterPage.js";
import ContactUs from "./components/ContactUs.js";
import FaqsPage from "./components/FaqsPage.js";
import TeamPage from "./components/TeamPage";
import PoliticaPage from "./components/PoliticaPage";
import EventosPage from "./components/EventosPage";
import ShoppingCartPage from "./components/ShoppingCartPage";
import CheckoutPage from "./components/CheckoutPage";
import { Header, Footer } from "./ComponentStyle";
//TODO Revisar cabecera
import {
  makeStyles,
  stylesNavbar,
  stylesEvents2,
  SnackbarContent,
  Warning,
  Check,
} from "./ComponentStyle.js";

/*
 _________________________
/\                        \
\_|     Render APP        |
  |  _____________________|_
  \_/______________________/
*/

export default function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [logged, setLogged] = useState(false);
  const [variante, setVariante] = useState(""); //kind of alert(warning, danger, info)
  const [mensaje, setMensaje] = useState(null); // message notification
  const [alert, setAlert] = useState(false); //switch notification on/off
  const [scrollNav, setScrollNav] = useState(false); //switch scroll navbar on/off
  const [activeNav, setActiveNav] = useState("home");
  const [cart, setCart] = useState([]); //shopping cart
  const [cartPrice, setCartPrice] = useState(0); //shopping cart
  const [guestUser, setGuestUser] = useState(null); //guest name
  const [guestEmail, setGuestEmail] = useState(null); //guest email

  //styles
  const useStylesNavbar = makeStyles(stylesNavbar);
  const useStyles = makeStyles(stylesEvents2);
  const classesNav = useStylesNavbar();
  const classes = useStyles();
  //const [acceptedCookies, setAcceptedCookies] = useState(false); // cookies management
  //Function to check if user have cookie to keep logged the session

  function checkSession() {
    // console.log("checkSession");
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3002/",
    })
      .then((res) => {
        //Check user logged
        if (res.data.logged) {
          setLogged(res.data.logged);
          setUser(res.data.user.email);
          setName(res.data.user.nombre);
        } else {
          setLogged(res.data.logged);
          setUser(null);
        }
        // if (res.data.cookie.slice(0, 10) != "") {
        //   let date = new Date();
        //   let today =
        //     date.getFullYear() +
        //     "-" +
        //     (date.getMonth() + 1) +
        //     "-" +
        //     date.getDate();
        //   let cookieDate = res.data.cookie.slice(0, 10);
        //   if (cookieDate > today) {
        //     console.log("ok");
        //   } else {
        //     console.log("caca");
        //   }

        //   console.log(cookieDate + " - " + today);
        // }
      })
      .catch(() => {
        setVariante("danger");
        setMensaje(
          "Ha ocurrido un error con el servidor. Pruebe en unos minutos."
        );
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          setVariante("");
          setMensaje("");
        }, 3000);
      });
  }

  useEffect(() => {
    checkSession();
  }, []);
  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <>
      <BrowserRouter>
        <div id="navbar" className={classesNav.navbar}>
          {scrollNav ? (
            <Header
              logged={logged}
              setLogged={setLogged}
              active={activeNav}
              alert={alert}
              setAlert={setAlert}
              variante={variante}
              setVariante={setVariante}
              mensaje={mensaje}
              setMensaje={setMensaje}
              color="transparent"
              changeColorOnScroll={{
                height: 150,
                color: "dark",
              }}
              fixed
            />
          ) : (
            <Header
              logged={logged}
              setLogged={setLogged}
              active={activeNav}
              color="dark"
              fixed
            />
          )}
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                logged={logged}
                setLogged={setLogged}
                alert={alert}
                setAlert={setAlert}
                setActiveNav={setActiveNav}
                setScrollNav={setScrollNav}
              />
            }
          />
          {/* <Route path="/landing-page" component={LandingPage} /> */}
          <Route
            path="/profile"
            element={
              <ProfilePage
                logged={logged}
                setLogged={setLogged}
                user={user}
                setUser={setUser}
                variante={variante}
                setVariante={setVariante}
                mensaje={mensaje}
                setMensaje={setMensaje}
                alert={alert}
                setAlert={setAlert}
                setActiveNav={setActiveNav}
                setScrollNav={setScrollNav}
                name={name}
                setName={setName}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RegisterPage
                logged={logged}
                setLogged={setLogged}
                user={user}
                setUser={setUser}
                variante={variante}
                setVariante={setVariante}
                mensaje={mensaje}
                setMensaje={setMensaje}
                alert={alert}
                setAlert={setAlert}
                setActiveNav={setActiveNav}
                setScrollNav={setScrollNav}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                name={name}
                setName={setName}
                logged={logged}
                setLogged={setLogged}
                user={user}
                setUser={setUser}
                variante={variante}
                setVariante={setVariante}
                mensaje={mensaje}
                setMensaje={setMensaje}
                alert={alert}
                setAlert={setAlert}
                setActiveNav={setActiveNav}
                setScrollNav={setScrollNav}
              />
            }
          />
          <Route
            path="/faqs"
            element={
              <FaqsPage
                logged={logged}
                setActiveNav={setActiveNav}
                setScrollNav={setScrollNav}
              />
            }
          />
          <Route
            path="/teamwork"
            element={
              <TeamPage
                logged={logged}
                setActiveNav={setActiveNav}
                setScrollNav={setScrollNav}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <ContactUs
                logged={logged}
                variante={variante}
                setVariante={setVariante}
                mensaje={mensaje}
                setMensaje={setMensaje}
                alert={alert}
                setAlert={setAlert}
                setActiveNav={setActiveNav}
                setScrollNav={setScrollNav}
              />
            }
          />
          <Route path="/components" element={<Components logged={logged} />} />
          <Route
            path="/privacy"
            element={
              <PoliticaPage
                setActiveNav={setActiveNav}
                setScrollNav={setScrollNav}
              />
            }
          />
          <Route
            path="/events"
            element={
              <EventosPage
                logged={logged}
                alert={alert}
                setAlert={setAlert}
                mensaje={mensaje}
                setMensaje={setMensaje}
                variante={variante}
                setVariante={setVariante}
                setActiveNav={setActiveNav}
                setScrollNav={setScrollNav}
                cart={cart}
                setCart={setCart}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <ShoppingCartPage
                logged={logged}
                alert={alert}
                setAlert={setAlert}
                mensaje={mensaje}
                setMensaje={setMensaje}
                variante={variante}
                setVariante={setVariante}
                setActiveNav={setActiveNav}
                setScrollNav={setScrollNav}
                cart={cart}
                setCart={setCart}
                cartPrice={cartPrice}
                setCartPrice={setCartPrice}
              />
            }
          />
          <Route
            path="/payment"
            element={
              <CheckoutPage
                setGuestEmail={setGuestEmail}
                setGuestUser={setGuestUser}
                guestEmail={guestEmail}
                guestUser={guestUser}
                cart={cart}
                setCart={setCart}
                cartPrice={cartPrice}
                setPrice={setCartPrice}
                name={name}
                setName={setName}
                logged={logged}
                setLogged={setLogged}
                user={user}
                setUser={setUser}
                variante={variante}
                setVariante={setVariante}
                mensaje={mensaje}
                setMensaje={setMensaje}
                alert={alert}
                setAlert={setAlert}
                setActiveNav={setActiveNav}
                setScrollNav={setScrollNav}
              />
            }
          />
        </Routes>
        <Footer whiteFont />
      </BrowserRouter>
    </>
  );
}
