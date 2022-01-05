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
import { makeStyles, stylesNavbar } from "./ComponentStyle.js";

/*
 _________________________
/\                        \
\_|     Render APP        |
  |  _____________________|_
  \_/______________________/
*/

export default function App() {
  const [checkedNewsletter, setCheckedNewsletter] = useState(false);
  const [birthdate, setBirthdate] = useState(false); //state date picker
  const [inputPassword, setinputPassword] = useState(""); //state input password
  const [surname, setSurname] = useState(null);
  const [user, setUser] = useState(null);
  const [imageUser, setImageUser] = useState(null);
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
  const [loyalty, setLoyalty] = useState(null); //loyalty

  //styles
  const useStylesNavbar = makeStyles(stylesNavbar);
  const classesNav = useStylesNavbar();
  //const [acceptedCookies, setAcceptedCookies] = useState(false); // cookies management
  //Function to check if user have cookie to keep logged the session
  //Check session
  useEffect(() => {
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
          setCheckedNewsletter(res.data.user.newsletter);
          setBirthdate(res.data.user.fechaNacimiento);
          setinputPassword(res.data.user.password.hash);
          setSurname(res.data.user.apellidos);
          setLoyalty(res.data.user.loyalty);
          if (res.data.user.image.indexOf("avatar.com") === -1) {
            setImageUser("http://localhost:3002/" + res.data.user.image);
          } else {
            setImageUser(
              "https://eu.ui-avatars.com/api/?name=" + res.data.user.nombre
            );
          }
        } else {
          setImageUser(
            "https://eu.ui-avatars.com/api/?name=" + res.data.user.nombre
          );
          setLogged(res.data.logged);
          setUser(null);
        }
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
        }, 2000);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <div id="navbar" className={classesNav.navbar}>
          {scrollNav ? (
            <Header
              cart={cart}
              imageUser={imageUser}
              setImageUser={setImageUser}
              logged={logged}
              name={name}
              setName={setName}
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
              cart={cart}
              imageUser={imageUser}
              setImageUser={setImageUser}
              logged={logged}
              name={name}
              setName={setName}
              setLogged={setLogged}
              active={activeNav}
              alert={alert}
              setAlert={setAlert}
              variante={variante}
              setVariante={setVariante}
              mensaje={mensaje}
              setMensaje={setMensaje}
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
          <Route
            path="/profile"
            element={
              <ProfilePage
                loyalty={loyalty}
                setLoyalty={setLoyalty}
                checkedNewsletter={checkedNewsletter}
                setCheckedNewsletter={setCheckedNewsletter}
                birthdate={birthdate}
                setBirthdate={setBirthdate}
                inputPassword={inputPassword}
                setinputPassword={setinputPassword}
                surname={surname}
                setSurname={setSurname}
                imageUser={imageUser}
                setImageUser={setImageUser}
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
                imageUser={imageUser}
                setImageUser={setImageUser}
                setSurname={setSurname}
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
