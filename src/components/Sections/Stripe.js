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
  InfoIcon,
} from "../../ComponentStyle";
//import "../../App.css";
import { Link } from "react-router-dom";
import { card } from "assets/jss/material-kit-react";
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

// //TODO revisar
// const SubmitButton = ({ processing, error, children, disabled }) => (
//   <button
//     className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
//     type="submit"
//     disabled={processing || disabled}
//   >
//     {processing ? "Processing..." : children}
//   </button>
// );
// //TODO revisar
// const ErrorMessage = ({ children }) => (
//   <div className="ErrorMessage" role="alert">
//     <svg width="16" height="16" viewBox="0 0 17 17">
//       <path
//         fill="#FFF"
//         d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
//       />
//       <path
//         fill="#6772e5"
//         d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
//       />
//     </svg>
//     {children}
//   </div>
// );
// //TODO revisar
// const ResetButton = ({ onClick }) => (
//   <button type="button" className="ResetButton" onClick={onClick}></button>
// );

const CheckoutForm = (props) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: props.props.user,
    name: props.props.name,
  });

  useEffect(() => {
    if (paymentMethod !== null) {
      //PAYMENT SUCCESSFULLY
      props.props.setPaymentHash(paymentMethod.id);
      props.props.setOrderSuccess(true);
      props.props.setGuestEmail(billingDetails.email);
      props.props.setGuestUser(billingDetails.name);
      console.log(props.props)
    }
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
      <CheckoutForm props={props} />
    </Elements>
  );
};
export default Stripe;
