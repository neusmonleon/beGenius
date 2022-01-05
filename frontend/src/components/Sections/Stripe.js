import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
  ErrorMessage,
} from "@stripe/react-stripe-js";
import {
  Email,
  InputAdornment,
  CustomInput,
  stylesLogin,
  PeopleAltRounded,
  GridItem,
  GridContainer,
  makeStyles,
  Button,
  CheckOutlined,
} from "../../ComponentStyle";
import { Link } from "react-router-dom";
const useStyles = makeStyles(stylesLogin);

//styles for card field
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#1B729D",
      color: "#000000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#bbbbbb",
      },
    },
    invalid: {
      iconColor: "#c82333",
      color: "#c82333",
    },
  },
};

//component with field to fill the form for payment
const CardField = ({ onChange }) => (
  <GridContainer justify="center">
    <GridItem xs={12} sm={12} md={12}>
      <CardElement options={CARD_OPTIONS} onChange={onChange} />
    </GridItem>
  </GridContainer>
);

const CheckoutForm = (props) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: props.props.logged ? props.props.user : "",
    name: props.props.logged ? props.props.name : "",
  });

  useEffect(() => {
    if (paymentMethod !== null) {
      //PAYMENT SUCCESSFULLY
      props.props.setPaymentHash(paymentMethod.id);
      props.props.setOrderSuccess(true);
      props.props.setGuestEmail(billingDetails.email);
      props.props.setGuestUser(billingDetails.name);
      props.props.setMensaje("Pago realizado con éxito");
      props.props.setVariante("success");
      props.props.setAlert(true);
      setTimeout(() => {
        props.props.setMensaje("");
        props.props.setVariante("");
        props.props.setAlert(false);
      }, 2000);
    } // eslint-disable-next-line
  }, [paymentMethod]);

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement("card").focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    // PAYMENT METHOD STRIPE
    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    setProcessing(false);

    // PAYMENT OPERATION
    if (payload.error) {
      setError(payload.error);
    } else {
      setPaymentMethod(payload.paymentMethod);
    }
  };
  return paymentMethod ? (
    <div className="Result">
      <div className="ResultTitle" role="alert">
        ✅ Pago Completado.
      </div>
      <div className="ResultMessage">
        ¡Gracias por tu compra!. Ya queda menos para disfrutar de esta aventura.{" "}
        <br />
        <br />
        ☝🏼 Revisa tu email, deberás recibir el código para canjear. Además si
        eres usuario de beGenius podrás ver toda tu información de compra en tu
        perfil.
        <br />
        <br />
        ℹ️ No se ha realizado el cobro real, pero se ha generado un hash de pago
        simulado: <strong>{paymentMethod.id}</strong>
      </div>
      <br />
      <img
        src={`https://qrickit.com/api/qr.php?d=${paymentMethod.id}&addtext=beGenius&txtcolor=000000&fgdcolor=12B3C8
&bgdcolor=FFFFFF&qrsize=150&t=p&e=m`}
        alt="qr"
      ></img>
      <br />
      <Link to="/">
        <Button color="info">
          <CheckOutlined /> Aceptar
        </Button>
      </Link>
    </div>
  ) : (
    <>
      <CustomInput
        labelText="Nombre*"
        id="nombre"
        formControlProps={{
          fullWidth: true,
        }}
        value={billingDetails.name}
        inputProps={{
          defaultValue: billingDetails.name,
          onChange: (e) =>
            setBillingDetails({ ...billingDetails, name: e.target.value }),
          endAdornment: (
            <InputAdornment position="end">
              <PeopleAltRounded className={classes.inputIconsColor} />
            </InputAdornment>
          ),
        }}
      />
      <CustomInput
        labelText="Email*"
        id="email"
        formControlProps={{
          fullWidth: true,
        }}
        value={billingDetails.email}
        inputProps={{
          //defaultValue: props.logged ? props.user : "",
          defaultValue: billingDetails.email,
          onChange: (e) =>
            setBillingDetails({ ...billingDetails, email: e.target.value }),
          type: "email",
          endAdornment: (
            <InputAdornment position="end">
              <Email className={classes.inputIconsColor} />
            </InputAdornment>
          ),
        }}
      />
      <br />
      <br />
      <CardField
        onChange={(e) => {
          setError(e.error);
          setCardComplete(e.complete);
        }}
      />
      <br />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <Button
        disabled={!cardComplete}
        color="info"
        onClick={() => {
          if (cardComplete) {
            handleSubmit(processing, error, !stripe);
          }
        }}
      >
        Realizar Pago
      </Button>
    </>
  );
};

const apiKey = loadStripe(
  "pk_test_51K74SIC27XWlz6w6hzJOBXH8g8ui0cudHBY51Qm7mTsd6ePOFyUS6mnJHylmVcF44Jo3sutQoc64vwAZXvfQuuWh00JbX7gB4m"
);

const Stripe = (props) => {
  return (
    <Elements stripe={apiKey}>
      {props.logged !== undefined ? <CheckoutForm props={props} /> : <></>}
    </Elements>
  );
};
export default Stripe;
