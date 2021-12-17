import { useState, useEffect } from "react";
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
  Tooltip,
  Dialog,
  DialogTitle,
  IconButton,
  Close,
  DialogContent,
  DialogActions,
} from "../../ComponentStyle.js";

function MyCard(props) {
  const style = {
    ...stylesGridBlog,
    ...stylesImages,
    ...stylesCards,
  };
  const useStyles = makeStyles(style);
  const classes = useStyles();

  const [classicModal, setClassicModal] = useState(false); //state toggle modalbox

  return (
    <GridItem md={4} sm={4}>
      <Card blog>
        <CardHeader image>
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
          <Tooltip
            id="tooltip-top"
            title="Añadir a tu cesta"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <Button
              justIcon
              simple
              size="lg"
              color="info"
              onClick={() => {
                //ADD ARTICLE TO PENDING CARD
                props.setUpdateCart({
                  title: props.title,
                  price: props.price,
                  location: props.location,
                  image: props.image,
                  quantity: 1,
                });
              }}
            >
              <AddBox />
            </Button>
          </Tooltip>
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
  );
}

export default MyCard;
