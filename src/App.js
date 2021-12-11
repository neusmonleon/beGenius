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
import LandingPage from "./components/LandingPage/LandingPage.js";
import ProfilePage from "./components/ProfilePage.js";
import LoginPage from "./components/LoginPage.js";
import RegisterPage from "./components/RegisterPage.js";
import ContactUs from "./components/ContactUs.js";
import FaqsPage from "./components/FaqsPage.js";
import TeamPage from "./components/TeamPage";
import PoliticaPage from "./components/PoliticaPage";
import EventosPage from "./components/EventosPage";
/*
 _________________________
/\                        \
\_|     Render APP        |
  |  _____________________|_
  \_/______________________/
*/
export default function App() {
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);
  const [variante, setVariante] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [alert, setAlert] = useState(false);
  const [acceptedCookies, setAcceptedCookies] = useState(false); // cookies management
  //Function to check if user have cookie to keep logged the session
  function checkSession() {
    console.log("checkSession");
    Axios({
      method: "GET",
      withCredentials: true,
      url: "https://api-begenius.herokuapp.com/",
    })
      .then((res) => {
        //Check user logged
        if (res.data.logged) {
          setLogged(res.data.logged);
          setUser(res.data.user);
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

  // useEffect(() => {
  //   checkSession();
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                logged={logged}
                setLogged={setLogged}
                alert={alert}
                setAlert={setAlert}
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
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
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
              />
            }
          />
          <Route path="/faqs" element={<FaqsPage logged={logged} />} />
          <Route path="/teamwork" element={<TeamPage logged={logged} />} />
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
              />
            }
          />
          <Route path="/components" element={<Components logged={logged} />} />
          <Route path="/politica-de-privacidad" element={<PoliticaPage />} />
          <Route
            path="/logout"
            element={
              <LandingPage
                logged={logged}
                setLogged={setLogged}
                alert={alert}
                setAlert={setAlert}
              />
            }
          />
          <Route
            path="/eventos"
            element={
              <EventosPage
                logged={logged}
                alert={alert}
                setAlert={setAlert}
                mensaje={mensaje}
                setMensaje={setMensaje}
                variante={variante}
                setVariante={setVariante}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
