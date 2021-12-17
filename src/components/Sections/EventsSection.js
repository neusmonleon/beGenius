import { React, useState, useEffect } from "react";
import Axios from "axios";
import MyCard from "./MyCard.js";
import Paginator from "./Paginator";
import {
  makeStyles,
  GridContainer,
  stylesGridBlog,
  stylesImages,
  stylesCards,
} from "../../ComponentStyle.js";

export default function EventsSection(props) {
  const style = {
    ...stylesGridBlog,
    ...stylesImages,
    ...stylesCards,
  };
  const useStyles = makeStyles(style);
  const classes = useStyles();
  const [battleRoyal, setbattleRoyal] = useState([]); //cards of battle royal
  const [playYouWant, setplayYouWant] = useState([]); //cards of standard
  const [playCity, setplayCity] = useState([]); //cards of cities
  const [isLoaded, setIsLoaded] = useState(false); //async pagination render
  const [updateCart, setUpdateCart] = useState({});
  const [flagAvoidBlank, setFlagAvoidBlank] = useState(false); //traffic ligths to avoid blanks in cart

  let battleRoyalCount = 0;
  let playYouWantCount = 0;
  let playCityCount = 0;

  useEffect(() => {
    let found = false;
    props.cart.forEach((item, index) => {
      if (Object.keys(item) == 0) {
        props.cart.splice(index, 1);
      }
      if (
        item.title === updateCart.title &&
        item.location === updateCart.location
      ) {
        console.log(item.quantity);
        item.quantity = item.quantity + 1;
        console.log(item.quantity);
        found = true;
      }
    });
    if (!found) {
      props.setCart([...props.cart, updateCart]);
    }
    console.log(props.cart);
  }, [updateCart]);

  //function to create cards from DB
  const alert = props.alert;
  useEffect(() => {
    Axios({
      method: "GET",
      url: "https://api-begenius.herokuapp.com/histories/all",
    })
      .then((res) => {
        if (!res.data.error) {
          //no error
          //Create all cards

          let cards = res.data.data.map((card) => {
            //Get amount of each kind of event
            if (card.type === "Battle Royal") {
              battleRoyalCount = battleRoyalCount + 1;
            } else if (card.type === "playYouWant") {
              playYouWantCount = playYouWantCount + 1;
            } else if (card.type === "playCity") {
              playCityCount = playCityCount + 1;
            }
            //console.log(props.cart);
            return (
              <MyCard
                title={card.title}
                price={card.price}
                description={card.description}
                type={card.type}
                image={card.image}
                duration={card.duration}
                date={card.date}
                time={card.time}
                team={card.team}
                startpoint={card.startpoint}
                location={card.location}
                cart={props.cart}
                setCart={props.setCart}
                buttonAdd={1}
                setUpdateCart={setUpdateCart}
                updateCart={updateCart}
              />
            );
          });
          setbattleRoyal(
            cards.filter((card) => card.props.type === "Battle Royal")
          );
          setplayCity(
            cards.filter((card) => card.props.type === "Conoce la ciudad")
          );
          setplayYouWant(
            cards.filter((card) => card.props.type === "Standard")
          );
          //setbattleRoyal(cards);
          setIsLoaded(true);
        } else {
          setIsLoaded(false);
          //API call error
          props.setVariante("danger");
          props.setMensaje(res.mensaje + " " + res.err);
          //show notification
          props.setAlert(true);
          setTimeout(() => {
            //hide notification
            props.setAlert(false);
            props.setVariante("");
          }, 2000);
        }
      })
      .catch(() => {
        props.setVariante("warning");
        props.setMensaje(
          "Error en la llamada a la API. Lo sentimos, vuelva a intentarlo más tarde."
        );
        props.setAlert(true);
        setTimeout(() => {
          props.setAlert(false);
          props.setVariante("");
        }, 3000);
      });
  }, []);

  return (
    <>
      <div className={classes.section}>
        <div className={classes.container}>
          <h2>
            <b> BATTLE ROYAL: </b>
          </h2>
          <h4>
            {" "}
            Eventos creados para los más competidores, un lugar, una fecha, un
            enigma, y una cuenta atrás. ¡Compite contra tod@s y resuelve el
            enigma en el menor tiempo posible! ¿Podréis?{" "}
          </h4>
          <GridContainer>
            {!isLoaded ? (
              <p>loading...</p>
            ) : (
              <Paginator itemsPerPage={3} items={battleRoyal} />
            )}
          </GridContainer>
        </div>
      </div>
      <div className={classes.section}>
        <div className={classes.container}>
          <h2>
            <b> CONOCE LA CIUDAD: </b>
          </h2>
          <h4>
            {" "}
            Seas local o turista, hemos creado estos eventos para conocer los
            lugares y monumentos mas emblématicos de la ciudad, podrás hacer
            turismo a la vez que aprendes los datos mas curiosos y secretos de
            la capital autónoma.{" "}
          </h4>
          <GridContainer>{playCity}</GridContainer>
        </div>
      </div>
      <div className={classes.section}>
        <div className={classes.container}>
          <h2>
            <b> JUEGA CUANDO QUIERAS: </b>
          </h2>
          <h4>
            {" "}
            Seas local o turista, hemos creado estos eventos para conocer los
            lugares y monumentos mas emblématicos de la ciudad, podrás hacer
            turismo a la vez que aprendes los datos mas curiosos y secretos de
            la capital autónoma.{" "}
          </h4>
          <GridContainer>{playYouWant}</GridContainer>
        </div>
      </div>
    </>
  );
}
