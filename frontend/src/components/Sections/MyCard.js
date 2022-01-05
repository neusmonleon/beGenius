import Badge from "components/Components/Badge/Badge.js";
import { useState } from "react";
import {
  makeStyles,
  GridItem,
  CardBody,
  CardHeader,
  Card,
  stylesGridBlog,
  stylesImages,
  stylesCards,
  AddBox,
  Button,
  Subject,
  Dialog,
  DialogTitle,
  IconButton,
  Close,
  DialogContent,
  DialogActions,
  popoverStyles,
  Popover,
} from "../../ComponentStyle.js";

function MyCard(props) {
  const style = {
    ...stylesGridBlog,
    ...stylesImages,
    ...stylesCards,
    ...popoverStyles,
  };

  const useStyles = makeStyles(style);
  //const useStylesPopover = makeStyles(popoverStyles);
  //const classesPopover = useStylesPopover();
  const classes = useStyles();
  const [anchorElBottom, setAnchorElBottom] = useState(null);
  const [classicModal, setClassicModal] = useState(false); //state toggle modalbox

  return props.price ? (
    // EVENTS CARD
    <GridItem md={4} sm={4}>
      <Card blog={true} className={classes.cardHeaderWithMove}>
        <CardHeader
          image
          onClick={() => {
            setClassicModal(true);
          }}
        >
          <img src={props.image} alt={props.title} width="100%" />
          <div
            className={classes.coloredShadow}
            style={{ backgroundImage: `url("fff")`, opacity: 1 }}
          />
        </CardHeader>
        <CardBody>
          <h4 className={classes.cardCategory + " " + classes.textRose}>
            {props.price} €
          </h4>
          <h4 className={classes.cardTitle}>{props.title}</h4>
          <h5 className={classes.cardTitle}>{props.location}</h5>
          <p className={classes.cardDescription}>
            {props.description.slice(0, 150)} ...
          </p>
          <Button
            round
            color="white"
            onClick={() => {
              setClassicModal(true);
            }}
          >
            <Subject />
            Detalles
          </Button>
          {/* //Tooltip is a "+" button */}
          {/* <Tooltip
            id="tooltip-top"
            title="Añadir a tu cesta"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          > */}
          <Button
            justIcon
            simple
            size="lg"
            color="info"
            onClick={(event) => {
              setAnchorElBottom(event.currentTarget);
              //ADD ARTICLE TO PENDING CARD
              props.setUpdateCart({
                title: props.title,
                price: props.price,
                location: props.location,
                image: props.image,
                quantity: 1,
                date: props.date,
                time: props.time,
                startpoint: props.startpoint,
              });
            }}
          >
            <AddBox />
          </Button>
          <Popover
            classes={{
              paper: classes.popover,
            }}
            open={Boolean(anchorElBottom)}
            anchorEl={anchorElBottom}
            onClose={() => setAnchorElBottom(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div className={classes.popoverBody}>
              Artículo añadido al carrito.
            </div>
          </Popover>
          {/* </Tooltip> */}
        </CardBody>
      </Card>
      <div id="modal-box-events">
        {/* MODAL BOX (hidden by default)  */}
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal,
          }}
          //CHANGE TRUE OR FALSE TO SHOW MODAL
          open={classicModal}
          //TransitionComponent={Transition}
          keepMounted
          onClose={() => {
            setClassicModal(false);
          }}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <IconButton
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => setClassicModal(false)}
            >
              <Close className={classes.modalClose} />
            </IconButton>

            <h4 className={classes.modalTitle}>{props.title}</h4>
          </DialogTitle>
          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <img src={props.image} alt={props.title} width="100%" />
            <p>
              {" "}
              <b>¿Dónde?:</b>
              {props.location}
            </p>
            <p>
              {" "}
              <b>¿Cuándo?:</b> {props.date}
            </p>
            <p>
              {" "}
              <b>Descripción: </b>
              {props.description}
            </p>
            <p>
              {" "}
              <b>Hora de inicio: </b>
              {props.time}
            </p>
            <p>
              {" "}
              <b>Duración: </b>
              {props.duration}
            </p>
            <p>
              {" "}
              <b>Punto de partida: </b>
              {props.startpoint}
            </p>
            <p>
              {" "}
              <b> Nº máx. de personas: </b>
              {props.team}
            </p>
            <p>
              {" "}
              <b> Precio: </b>
              {props.price} €
            </p>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button
              onClick={() => {
                setClassicModal(false);
              }}
              color="info"
              round
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
        {/* END MODAL BOX */}
      </div>
    </GridItem>
  ) : (
    // ORDERS CARDS
    <GridItem md={6} sm={6}>
      <Card blog={true}>
        <CardHeader image>
          <img src={props.image} alt={props.title} width="100%" />
          <div
            className={classes.coloredShadow}
            style={{ backgroundImage: `url("fff")`, opacity: 1 }}
          />
        </CardHeader>
        <CardBody>
          <h4 className={classes.cardTitle}>{props.title}</h4>
          <p>Lugar: {props.location}</p>
          <p>Fecha: {props.date}</p>
          Código: <Badge color="info">{props.codeRedeem}</Badge>
          <img
            src={`https://qrickit.com/api/qr.php?d=${props.codeRedeem}&addtext=beGenius&txtcolor=000000&fgdcolor=12B3C8
&bgdcolor=FFFFFF&qrsize=150&t=p&e=m`}
            alt="qr"
          ></img>
        </CardBody>
      </Card>
    </GridItem>
  );
}

export default MyCard;
