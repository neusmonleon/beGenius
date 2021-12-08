/*
 _________________________
/\                        \
\_|   Components Import   |
  |  _____________________|_
  \_/______________________/
*/
import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages for this app
import Components from "./components/Components/Components";
import LandingPage from "./components/LandingPage/LandingPage.js";
import ProfilePage from "./components/ProfilePage.js";
import LoginPage from "./components/LoginPage.js";
import RegisterPage from "./components/RegisterPage.js";
import ContactUs from "./components/ContactUs.js";

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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LandingPage logged={logged} setLogged={setLogged} />}
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
              />
            }
          />
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
              />
            }
          />
          <Route
            path="/contact"
            element={
              <ContactUs
                logged={logged}
                setLogged={setLogged}
                variante={variante}
                setVariante={setVariante}
                mensaje={mensaje}
                setMensaje={setMensaje}
              />
            }
          />
          <Route path="/components" element={<Components />} />
          <Route
            path="/logout"
            element={<LandingPage logged={logged} setLogged={setLogged} />}
          />
          {/* <Route path="/events" element={<Events />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
