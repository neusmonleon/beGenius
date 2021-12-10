/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "../components/Components/CustomButtons/Button.js";

// core components
import Header from "./Components/Header/Header.js";
import Footer from "./Components/Footer/Footer.js";
import GridContainer from "./Components/Grid/GridContainer.js";
import GridItem from "./Components/Grid/GridItem.js";
import Parallax from "./Components/Parallax/Parallax.js";
import Clearfix from "./Components/Clearfix/Clearfix.js";

import styleNavbar from "../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";
import profilePageStyle from "../assets/jss/material-kit-react/views/profilePageStyle.js";
const useStyles = makeStyles(profilePageStyle);
const useStyleNavbar = makeStyles(styleNavbar);

export default function PoliticaPage(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  const classesNav = useStyleNavbar();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <div>
      <div id="navbar" className={classesNav.navbar}>
        <Header
          brand="beGenius"
          color="dark"
          fixed
          rightLinks={
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
                <></>
              ) : (
                <ListItem className={classesNav.listItem}>
                  <Link to={"/login"} className={classesNav.listItem}>
                    <Button
                      className={classesNav.navLinkActive}
                      color="transparent"
                    >
                      LogIn
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
                      <PersonIcon className={classesNav.icons} />
                      Sign Up
                    </Button>
                  </Link>
                </ListItem>
              ) : (
                <></>
              )}
            </List>
          }
        />
      </div>
      <Parallax
        image={require("../assets/img/detective.jpg").default}
        filter="dark"
        className={classes.parallax}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <div className={classNames(classes.title + " " + classes.textCenter)}>
            <h1>Política de Privacidad</h1>
          </div>
          <div className={classNames(classes.description)}>
            <p>
              ¡Gracias por jugar nuestros juegos! La presente Política de
              Privacidad describe: - Las formas en las que recopilamos
              información personal sobre usted y por qué lo hacemos - Cómo
              utilizamos su información personal, y - Las opciones que tiene con
              respecto a su información personal. Esta Política de Privacidad se
              aplica a los juegos, sitios web y servicios relacionados de Be
              GeniusThe Game S.L.( en adelante beGenius) , que llamamos
              colectivamente el Servicio. Periódicamente podríamos actualizar
              esta Política de Privacidad mediante la publicación de una versión
              nueva en begeniusthegame.com. Si realizamos algún cambio
              sustancial, se lo informaremos publicando una notificación en el
              Servicio antes de que el cambio entre en vigor. Si continúa usando
              el Servicio después de la fecha de entrada en vigor estará sujeto
              a la nueva Política de Privacidad. CONTACTE CON NOSOTROS Si tiene
              preguntas sobre la protección de la información, o si tiene alguna
              solicitud para resolver problemas con sus datos personales, le
              recomendamos que se comunique con nosotros a través de. Nombre del
              responsable: Be Genius The Game S.L Dirección: C/ Castaños 9, 1º
              B, 48007 , Bilbao, España Teléfono: 632941972 Correo electrónico:
              skpstreet@gmail.com LA INFORMACIÓN QUE RECOPILAMOS Información que
              nos proporciona directamente. Información de contacto (como nombre
              y dirección de correo electrónico) - Nombre y contraseña del
              jugador - Información del perfil (como por ejemplo la fotografía)
              - Sus mensajes al Servicio (como por ejemplo registros del chat y
              boletos de soporte técnico del jugador) - Otra información que
              usted decida proporcionarnos (como por ejemplo, información para
              identificar una cuenta perdida) - Información que recopilamos en
              forma automática. Información sobre su cuenta y el progreso en el
              juego. - Su dirección IP e identificadores de dispositivos móviles
              (como por ejemplo la ID de su dispositivo, ID de publicidad,
              dirección MAC, IMEI). - Información sobre su dispositivo, como por
              ejemplo, el nombre del dispositivo y el sistema operativo, tipo e
              idioma del explorador. - Información que recopilamos como cookies
              y tecnologías similares (ver más a continuación). - Información de
              ubicación general. - Información precisa de geoubicación (GPS, con
              su consentimiento). - Información sobre su uso del Servicio, como
              por ejemplo información del juego y sus interacciones con otros
              jugadores dentro del Servicio. En la mayoría de los casos, también
              creamos una ID específica de StreetSKP para usted cuando usa el
              Servicio. Información que recopilamos de nuestros socios. - Los
              datos que recibimos si usted vincula una herramienta de un tercero
              con el Servicio (como por ejemplo, Facebook, WeChat o Google). -
              Información demográfica (como por ejemplo, determinar la ubicación
              general de su dirección IP). - Información para combatir fraude
              (como por ejemplo, abuso de reembolso en los juegos o fraude en
              vínculos para hacer clic en publicidades). - Información de
              plataformas en las que se ejecutan los juegos (como por ejemplo
              para verificar el pago). - Información para fines publicitarios y
              analíticos, para poder proporcionarle un mejor Servicio. ¿POR QUÉ
              RECOPILAMOS SU INFORMACIÓN? Para hacer funcionar el Servicio. Para
              ejecutar el contrato, procesamos los datos necesarios para - Crear
              cuentas y permitirle jugar nuestros juegos y usar nuestro Servicio
              - Operar el Servicio - Verificar y confirmar pagos - Ofrecer y
              poner a su disposición los productos y servicios que nos solicita
              - Enviarle comunicaciones relacionadas con el Servicio Para que el
              Servicio sea más adecuado para nuestros jugadores. Para
              proporcionarle un Servicio estupendo a nuestros jugadores, tenemos
              un interés legítimo en recopilar y procesar información necesaria
              para - Actualizar y desarrollar perfiles de jugador - Desarrollar
              y mejorar el Servicio y la experiencia del jugador - Manejar
              nuestra relación con usted - Proporcionar funciones sociales como
              parte del Servicio - Personalizar su experiencia del Servicio -
              Responder a sus comentarios y preguntas y prestarle soporte
              técnico al jugador - Proporcionarle las ofertas de Be Genius en el
              Servicio así como también en otros sitios web y servicios de y por
              correo electrónico - Enviarle información relacionada, como por
              ejemplo, actualizaciones, alertas de seguridad y mensajes de
              soporte técnico - Permitirle comunicarse con otros jugadores Para
              mostrarle publicidad personalizada. Para mostrarle publicidad
              personalizada en el Servicio así como también en otros sitios web
              y servicios (inclusive el correo electrónico) tenemos un interés
              legítimo en procesar información necesaria para - Hacer un
              seguimiento del contenido al que usted accede en conexión con el
              Servicio y su comportamiento en línea - Proporcionar, dirigir y
              mejorar nuestra publicidad y el Servicio Para obtener información
              sobre cómo cancelar la característica de publicidad personalizada,
              consulte la sección «Sus derechos y opciones» a continuación. Para
              mantener el Servicio seguro y justo. Asegurar un campo de juego
              parejo en el Servicio es una máxima prioridad para nosotros. Para
              más información sobre nuestra política sobre uso aceptable
              consulte las Condiciones Generales Para mantener el Servicio y sus
              características sociales seguros y justos, para combatir el fraude
              y asegurar un uso de otro modo aceptable, tenemos un interés
              legítimo en procesar la información necesaria para - Analizar y
              monitorear el uso del Servicio y sus funciones sociales - Moderar
              los chats ya sea en forma automática o manual - Tomar medidas
              contra jugadores fraudulentos o que muestran comportamientos
              inadecuados Para analizar, hacer un perfil y segmentar. En todos
              los casos y propósitos anteriores, nosotros podemos analizar,
              hacer un perfil y segmentar toda la información recopilada. Con su
              consentimiento. Con su consentimiento, podríamos procesar su
              información para otros fines, como por ejemplo usar su ubicación
              de GPS para el funcionamiento del juego y poder mostrarle eventos
              locales. QUIÉN PUEDE VER SU INFORMACIÓN Además de Be Genius, otros
              pueden acceder a su información en las siguientes situaciones:
              Otros jugadores y usuarios. Las funciones sociales son un
              componente central de nuestros juegos. Otros jugadores y usuarios
              podrían, por ejemplo, ver la información de su perfil, actividades
              en el juego y leer los mensajes que ha publicado. Socios que
              trabajan para Be Genius. Be Genius tiene socios que realizan
              servicios para nosotros. Estos socios procesan su información
              solamente bajo las instrucciones de Be Genius y de acuerdo con
              estas para proporcionarle el Servicio, como por ejemplo, el
              hosting, soporte técnico para jugadores, publicidad, analítica y
              prevención de fraude. Otras empresas y autoridades públicas. Para
              combatir el fraude y la actividad ilegal, podremos intercambiar
              información con otras empresas y organizaciones y proporcionarla a
              autoridades públicas en respuesta a solicitudes lícitas. También
              podremos divulgar su información basándonos en su consentimiento,
              para cumplir con la ley o para proteger nuestros derechos,
              propiedad o seguridad o los de nuestros jugadores u otros.
              Publicidad y socios de redes sociales. El Servicio incluye
              funciones de nuestros socios, como por ejemplo, herramientas de
              interacción en redes sociales y publicidad en el juego.. Estos
              socios pueden acceder a su información y operar bajo sus propias
              políticas de privacidad. Le recomendamos que consulte sus
              políticas de privacidad para obtener más información sobre sus
              prácticas de procesamiento de la información. TRANSFERENCIAS
              INTERNACIONALES DE LA INFORMACIÓN Nuestro Servicio es global por
              naturaleza y su información por lo tanto puede ser transferida a
              cualquier parte del mundo. Debido a que los distintos países
              pueden tener leyes de protección de información diferentes a las
              de su propio país, tomamos medidas para asegurar la implementación
              de garantías adecuadas para proteger su información según se
              explica en esta Política. Garantías adecuadas que podrán usar
              nuestros socios incluyen cláusulas contractuales estándar
              aprobadas por la Comisión de la Unión Europea y la certificación
              de Escudo de Privacidad en caso de transferencias a los EE. UU.
              SUS DERECHOS Y OPCIONES Exclusión de correos electrónicos y otro
              material de marketing directo. Puede darse de baja de las
              comunicaciones promocionales, como correos electrónicos de
              marketing de parte nuestra siguiendo las instrucciones en dichas
              comunicaciones. Exclusión de publicidad dirigida. En las
              aplicaciones móviles, puede darse de baja de los anuncios basados
              en intereses. Para ello, vaya a la configuración de privacidad de
              su dispositivo Android o iOS y seleccione «limit ad tracking»
              (Apple iOS) u «opt-out of interest based ads» (Android). Para
              darse de baja de ofertas personalizadas en el juego, puede usar
              las opciones que se proporcionan en la configuración del juego.
              ACCESO A LOS DATOS PERSONALES QUE MANTENEMOS SOBRE USTED. Si lo
              solicita, le proporcionaremos una copia de su información personal
              en un formato electrónico. También tiene el derecho de corregir su
              información, hacer que se borre su información, objetar que su
              información se use o comparta, y restringir la forma en la que
              usamos o compartimos su información. Siempre puede retirar su
              consentimiento, por ejemplo, al apagar la función de compartir
              ubicación de su GPS en la configuración de su dispositivo móvil.
              Responderemos a todas las solicitudes en un plazo razonable. Para
              cualquier problema o preocupación que no hayamos resuelto o
              abordado de manera satisfactoria, póngase en contacto con
              nosotros. COOKIES Y TECNOLOGÍAS SIMILARES Al igual que la mayoría
              de los servicios en línea, nosotros y nuestros socios usamos
              cookies y tecnologías similares para proporcionar y personalizar
              el Servicio, analizar el uso, dirigir la publicidad y evitar el
              fraude. Usted puede deshabilitar las cookies en la configuración
              de su explorador, pero algunas partes del Servicio podrían no
              funcionar correctamente. ¿CÓMO PROTEGEMOS SU INFORMACIÓN?
              Garantías de seguridad. Para ayudar a garantizar una experiencia
              segura para el jugador, estamos desarrollando e implementando
              continuamente medidas de seguridad administrativas, técnicas y
              físicas para proteger su información contra el acceso no
              autorizado o la pérdida, el uso inadecuado o la alteración de la
              misma. Conservación de datos. Conservamos su información durante
              el tiempo que su cuenta se encuentre activa o según sea necesario
              para prestarle el Servicio. Por ejemplo, eliminaremos
              periódicamente los datos identificatorios de las cuentas de juego
              no utilizadas y revisamos regularmente y anonimizamos los datos
              innecesarios. Tenga en cuenta que si nos pide que eliminemos su
              información personal, mantendremos su información según sea
              necesario para nuestros legítimos intereses comerciales, como por
              ejemplo, para cumplir con nuestras obligaciones legales, resolver
              disputas y hacer cumplir nuestros contratos. LÍMITES DE EDAD No
              recopilamos deliberadamente ni solicitamos información (a través
              de la publicidad basada en intereses directa o dirigida) a niños
              menores de 13 años, ni permitimos, a sabiendas, que dichos menores
              utilicen nuestros Servicios. Si tiene menos de 13 años, no nos
              envíe información personal sobre usted, como nombre, dirección,
              número de teléfono o dirección de correo electrónico. Ningún menor
              de 13 años puede facilitar información personal. Si descubrimos
              que hemos recopilado información personal de un niño menor de 13
              años, eliminaremos esa información lo más rápido posible. Si cree
              que podemos tener información sobre un menor de 13 años, póngase
              en contacto con nosotros.
            </p>
          </div>

          <Clearfix />
        </div>
      </div>
      <Footer whiteFont />
    </div>
  );
}
