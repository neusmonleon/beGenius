  //regex for EMAIL (n-words + @ + n-words . {2-3 characters})
  const validateEmail = (mail, props) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    } else {
      props.setVariante("danger");
      props.setMensaje("Formato de email no válido");
      props.setAlert(true);

      setTimeout(() => {
        props.setAlert(false);
        props.setVariante("");
        props.setMensaje("");
      }, 3000);
      return false;
    }
  }

  export default {
    validateEmail
  }