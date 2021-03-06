import React , {useEffect}from "react";
import {
  makeStyles,
  Warning,
  Check,
  GridContainer,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  SnackbarContent,
  Accordion,
  stylesLogin,
} from "../ComponentStyle.js";

import image from "../assets/img/lotsquestions.jpg";

const useStyle = makeStyles(stylesLogin);

export default function FaqsPage(props) {
  const classes = useStyle();

  useEffect(() => {
    //management of navbar active button
    props.setActiveNav("faqs");
    props.setScrollNav(false);
  });
  //scroll to top
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  return (
    <>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                {props.alert ? notification(props.variante) : <></>}
                <form className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    FAQS
                  </CardHeader>
                  <p className={classes.divider}>
                    Os resolvemos las dudas mas demandadas:
                  </p>
                  <CardBody>
                    <Accordion
                      active={0}
                      collapses={[
                        {
                          title: "¿Qué es un Street Scape?",
                          content: `Un Street Escape, también llamado Escape Room
                            Exterior, Escape Street, City Escape o Escape Outdoor,
                            es un juego que guarda los mismos elementos de un un
                            scape room, pero en vivo, un toque detectivesco real,
                            en el que un grupo de jugadores deben resolver un reto
                            planteado por una historia, en un tiempo máximo
                            determinado, descifrando enigmas, acertijos y puzzles,
                            utilizando como escenario las calles, plazs y rincones
                            de una ciudad o población.`,
                        },
                        {
                          title: "¿Cuántas personas puedes participar?",
                          content: `¡Tantas como quieran jugar! Eso sí, dependerá del tipo
                            de Street Scape escogido. Generalmente suelen ser
                            juegos de un máximo de 6 personas por partida. Eso
                            quiere decir que si sois un grupo menor es probable
                            que debais poner vuestro cerebro a náxima potencia, y
                            en el caso de ser un grupo mayor, debereis dividiros y
                            ¡Competir entre vosotros!.Recordad, que hay partidas
                            en las que competireis con muchísimos otros grupos,
                            por lo que debereis ser, organizados, rapidos y
                            astutos.`,
                        },
                        {
                          title: "¿A partir de que edad se puede jugar?",
                          content: `En los Street Escapes pueden participar personas, y
                            otros seres interdimensionales, entre los 14 y los 200
                            años (si hay alguno mayor preguntad). Los menores de
                            esa edad pueden jugar siempre que algún adulto se
                            responsabilice de ellos.`,
                        },

                        {
                          title: "¿Qué tipos de Street Scape existen?",
                          content: `Hemos intentado abarcar todas las opciones para que
                            nadie se quede sin jugar, actualmente disponemos de:
                            1.Eventos especiales: Son Street Scapes que se
                            celebran en un dia y hora determinado, y por lo tanto
                            vais a contrareloj, y competís con muchísimos otros
                            grupos. Gana quien descifre el enigma en el menor
                            tiempo posible; 2. Street Scape tradicional: Son
                            aquellos que podeis reqlizar en cualquier momento,
                            ¡Una tarde de fin de semana, es perfecto! ;3. City
                            Street Scape: Hemos creado rutas turísticas de algunas
                            ciudades, para que podais visitar los monumentos y
                            lugares mas emblematicos de esa ciudad a la vez que
                            conoceis todas sus curiosidades y misterios;
                            4.Personalizados: Si tienes un evento especial, como
                            un cumpleaños, una despedida, un teambuiling para tu
                            empresa, o cualquier otra celebración, escríbenos y
                            personalizaremos la historia y el lugar donde se pueda
                            celebrar el Street Scape. Trabajo en equipo.`,
                        },
                        {
                          title: "¿Qué precio tienen los Street Scape?",
                          content: `El precio estandar actual de 35€-40/partida, con un
                          máximo de 6 jugadores, eso quiere decir que como mucho
                          podreis utilizar el código de la partida en un máximo
                          de seis terminales. Pueden haber variacionres en
                          eventos especiales, y en los eventos
                          personalializados.`,
                        },
                        {
                          title: "¿Son siempre historias de miedo/detective?",
                          content: `¡Para nada! Aunque la tendencia es pensar eso, hay
                          tantas historias como colores posibles, de detectives,
                          policiacas, asesinos, ladrones, piratas y su busqueda
                          del tesoro, gimkanas, educativas, conoce tu ciudad,
                          etc...`,
                        },
                        {
                          title: "¿Qué beneficios tiene un Street Scape?",
                          content: `Entre otros beneficios, los juegos de street scape
                          mejoran el: Desarrollo de la memoria. No deja de ser
                          importante y entre ellos está la concentración,
                          intuición, creatividad y velocidad mental. Alta
                          sensación de logro. Es lo que hace resolver pruebas y
                          enigmas y conseguir el objetivo con tu equipo.
                          Educativo. Es una forma de aprendizaje mediante
                          juegos. Además el desarrollo intelectual como la
                          resolución de problemas son dos puntos fuertes que
                          también pueden servir en la vida cotidiana. Mejoran la
                          autoconfianza,la comunicación, por eso funciona bien
                          en los Team building ya que mejora la calidad del
                          trabajo y la toma de decisiones, la empatía es una
                          cualidad que facilita las relaciones entre compañeros.
                          Libera serotoninas y reduce el sedentarismo y una
                          rutina pobre en el área de la diversión.`,
                        },
                      ]}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}></CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>

      <div></div>
    </>
  );
}

//show component according to the type of message (success, danger or warning)
function notification(type) {
  if (type === "success") {
    return (
      <SnackbarContent
        message={
          <span>
            <b>SUCCESS ALERT:</b> Login correcto.
          </span>
        }
        close
        color="success"
        icon={Check}
      />
    );
  } else if (type === "warning") {
    return (
      <SnackbarContent
        message={
          <span>
            <b>WARNING ALERT:</b> Error en la llamada al servidor.
          </span>
        }
        close
        color="warning"
        icon={Warning}
      />
    );
  } else if (type === "danger") {
    return (
      <SnackbarContent
        message={
          <span>
            <b>DANGER ALERT:</b> Error en el Login.
          </span>
        }
        close
        color="danger"
        icon={Warning}
      />
    );
  }
}
