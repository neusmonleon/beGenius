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
  MenuItem,
  GridItem,
  FormControl,
  Select,
  InputLabel,
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
  const [filterCity, setFilterCity] = useState(""); //simple dropdown state
  const handleSimple = (event) => {
    //toogle dropdown event
    setFilterCity(event.target.value);
    setIsLoaded(true);
  };

  let battleRoyalCount = 0;
  let playYouWantCount = 0;
  let playCityCount = 0;

  //add cart for each item selected -> cart gets updatecart elements
  useEffect(() => {
    let found = false;
    props.cart.forEach((item, index) => {
      // eslint-disable-next-line
      if (Object.keys(item) == 0) {
        props.cart.splice(index, 1);
      }
      if (
        item.title === updateCart.title &&
        item.location === updateCart.location
      ) {
        item.quantity = item.quantity + 1;
        found = true;
      }
    });
    if (!found) {
      props.setCart([...props.cart, updateCart]);
    }
    //show notification

    // eslint-disable-next-line
  }, [updateCart]);

  //function to create cards from DB
  useEffect(() => {
    setIsLoaded(false);
    Axios({
      method: "GET",
      url: "http://localhost:3002/histories/all",
    })
      .then((res) => {
        if (!res.data.error) {
          //no error
          //Create all card
          let cards = res.data.data.map((card) => {
            //Get amount of each kind of event
            if (card.type === "Battle Royal") {
              // eslint-disable-next-line
              battleRoyalCount = battleRoyalCount + 1;
            } else if (card.type === "playYouWant") {
              // eslint-disable-next-line
              playYouWantCount = playYouWantCount + 1;
            } else if (card.type === "playCity") {
              // eslint-disable-next-line
              playCityCount = playCityCount + 1;
            }
            return (
              <MyCard
                key={card.title + " " + card.location}
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
                active={card.active}
              />
            );
          });
          if (filterCity !== "") {
            setbattleRoyal(
              cards.filter(
                (card) =>
                  card.props.type === "Battle Royal" &&
                  card.props.location === filterCity &&
                  card.props.active === true
              )
            );
            setplayCity(
              cards.filter(
                (card) =>
                  card.props.type === "Conoce la ciudad" &&
                  card.props.location === filterCity &&
                  card.props.active === true
              )
            );
            setplayYouWant(
              cards.filter(
                (card) =>
                  card.props.type === "Standard" &&
                  card.props.location === filterCity &&
                  card.props.active === true
              )
            );
          } else {
            //no filter
            setbattleRoyal(
              cards.filter(
                (card) =>
                  card.props.type === "Battle Royal" &&
                  card.props.active === true
              )
            );
            setplayCity(
              cards.filter(
                (card) =>
                  card.props.type === "Conoce la ciudad" &&
                  card.props.active === true
              )
            );
            setplayYouWant(
              cards.filter(
                (card) =>
                  card.props.type === "Standard" && card.props.active === true
              )
            );
          }

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
        setIsLoaded(true);
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
  }, [filterCity]);

  return (
    <>
      <div className={classes.section}>
        <div className={classes.container}>
          {/* FILTER */}
          <GridContainer className={classes.justifyCenter}>
            <GridItem xs={12} sm={6} md={6} lg={5}>
              <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel
                  htmlFor="simple-select"
                  className={classes.selectLabel}
                >
                  Selecciona una ciudad
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu,
                  }}
                  classes={{
                    select: classes.select,
                  }}
                  value={filterCity}
                  onChange={handleSimple}
                  inputProps={{
                    name: "filterCity",
                    id: "simple-select",
                  }}
                >
                  <MenuItem
                    //disabled
                    value=""
                    classes={{
                      root: classes.selectMenuItem,
                    }}
                  >
                    Ciudades
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected,
                    }}
                    value="Madrid"
                  >
                    Madrid
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected,
                    }}
                    value="Barcelona"
                  >
                    Barcelona
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected,
                    }}
                    value="Bilbao"
                  >
                    Bilbao
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected,
                    }}
                    value="Palma de Mallorca"
                  >
                    Palma de Mallorca
                  </MenuItem>
                </Select>
              </FormControl>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <h2>
              <b> BATTLE ROYAL: </b>
            </h2>
            <h4>
              {" "}
              Eventos creados para los más competidores, un lugar, una fecha, un
              enigma, y una cuenta atrás. ¡Compite contra tod@s y resuelve el
              enigma en el menor tiempo posible! ¿Podréis?{" "}
            </h4>
          </GridContainer>
          <GridContainer className={classes.justifyCenter}>
            {!isLoaded ? (
              <p>loading...</p>
            ) : (
              <Paginator
                itemsPerPage={3}
                items={battleRoyal}
                filterCity={filterCity}
              />
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
