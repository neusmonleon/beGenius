import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import MyCard from "./Sections/MyCard.js";
import { useState } from "react";
import { Shop } from "@material-ui/icons";
import {
  DialogTitle,
  IconButton,
  Close,
  DialogContent,
  Dialog,
  DialogActions,
  makeStyles,
  Warning,
  Check,
  Button,
  GridContainer,
  GridItem,
  SnackbarContent,
  Parallax,
  NavPills,
  stylesProfile,
  PersonAddOutlined,
  styleCheckbox,
  CardBody,
  CustomInput,
  Switch,
  FormControlLabel,
  LockSharp,
  Email,
  InputAdornment,
  PeopleAltRounded,
} from "../ComponentStyle.js";

const useStyles = makeStyles(stylesProfile);
const useStylesCheckbox = makeStyles(styleCheckbox);

export default function ProfilePage(props) {
  const classes = useStyles();
  const classesCheckbox = useStylesCheckbox();
  const imageClasses =
    classes.imgRaised + " " + classes.imgRoundedCircle + " " + classes.imgFluid;
  const navigate = useNavigate();
  /* STATES FUNCTION */
  const [inputName, setInputName] = useState(props.name); //state input name
  const [inputSurname, setInputSurname] = useState(props.surname); //state input surname
  const [inputEmail, setinputEmail] = useState(props.user); //state input email
  const [inputPassword, setinputPassword] = useState(""); //state input password
  const [inputPassword2, setinputPassword2] = useState(""); //state input password 2
  // eslint-disable-next-line
  const [greenLine, setGreenLine] = useState(false); //state password color
  // eslint-disable-next-line
  const [redLine, setRedLine] = useState(false); //state password 2 color
  const [checkedNewsletter, setCheckedNewsletter] = useState(
    props.checkedNewsletter
  );
  const [ordersUser, setOrdersUser] = useState([]);
  const [classicModal, setClassicModal] = useState(false); //state toggle modalbox
  const [loyalty, setLoyalty] = useState(0);
  const [loyaltyImg, setLoyaltyImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //management of navbar active button
    props.setActiveNav("profile");
    props.setScrollNav(false);
  });
  /*
 _________________________
/\                        \
\_| Upload image workflow |
  |  _____________________|_
  \_/______________________/
*/

  //Select profile file
  // eslint-disable-next-line
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(props.imageUser);
  const [avatarImage, setAvatarImage] = useState(false); //trigger up when user image is readable

  //File chooser to get file
  let fileInput = React.createRef();
  let reader = new FileReader();

  //UPDATE PROFILE PICTURE
  const handleImageChange = (e) => {
    setIsLoading(true);
    //Get file from file chooser (FileReader:is a component from react)
    //files[0] because is single select
    let file = e.target.files[0];
    // load the file/image choosed
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
      if (file !== null) {
        const formData = new FormData();
        formData.append("dataFile", file);
        Axios({
          method: "POST",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
          url: "http://localhost:3002/uploadfile",
        })
          .then((res) => {
            if (res.status === 200) {
              //MODIFY USER INFO
              let data = {
                filter: {
                  email: props.user,
                },
                modify: { image: res.data.file.path },
              };
              Axios({
                method: "PUT",
                data: data,
                url: "http://localhost:3002/editprofile",
              }).then((res2) => {
                if (!res2.error) {
                  props.setImageUser(
                    "http://localhost:3002/" + res.data.file.path
                  );
                  setAvatarImage(false);
                  props.setMensaje("Imagen actualizada");
                  props.setVariante("success");
                  props.setAlert(true);
                  setIsLoading(false);
                  setTimeout(() => {
                    props.setAlert(false);
                    props.setMensaje("");
                    props.setVariante("");
                  }, 2000);
                } else {
                  props.setMensaje("Error al actualizar la imagen");
                  props.setVariante("danger");
                  props.setAlert(true);
                  setIsLoading(false);
                  setTimeout(() => {
                    props.setAlert(false);
                    props.setMensaje("");
                    props.setVariante("");
                  }, 2000);
                }
              });
            } else {
              props.setMensaje("Respuesta del servidor no válida");
              props.setVariante("warning");
              props.setAlert(true);
              setIsLoading(false);
              setTimeout(() => {
                props.setAlert(false);
                props.setMensaje("");
                props.setVariante("");
              }, 2000);
            }
          })
          .catch((err) => {
            props.setMensaje("Error en en servidor: " + err);
            props.setVariante("warning");
            props.setAlert(true);
            setIsLoading(false);
            setTimeout(() => {
              props.setAlert(false);
              props.setVariante("");
            }, 3000);
          });
      } else {
        props.setMensaje(
          "Debe seleccionar una imagen para modificar su avatar"
        );
        props.setVariante("warning");
        props.setAlert(true);
        setIsLoading(false);
        setTimeout(() => {
          props.setAlert(false);
          props.setMensaje("");
          props.setVariante("");
        }, 2000);
      }
    };
    //(readAsDataURL:is a component from FileReader (react))
    if (file) {
      reader.readAsDataURL(file);
      //
    }
  };
  const handleClick = () => {
    //open the file choosed refered on ReactRef
    fileInput.current.click();
  };
  const handleRemove = () => {
    setIsLoading(true);
    setFile(null);
    setImagePreviewUrl("https://eu.ui-avatars.com/api/?name=" + props.name);
    let data = {
      filter: { email: props.user },
      modify: { image: "https://eu.ui-avatars.com/api/?name=" + props.name },
    };
    Axios({
      method: "PUT",
      data: data,
      url: "http://localhost:3002/editprofile",
    }).then((res) => {
      if (!res.error) {
        props.setImageUser("https://eu.ui-avatars.com/api/?name=" + props.name);
        setAvatarImage(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
    fileInput.current.value = null;
  };

  //load on demand(async) data profile
  useEffect(() => {
    setIsLoading(true);
    //avoid null object no modified by user
    if (props.imageUser !== null) {
      setinputEmail(props.user);
      setCheckedNewsletter(props.checkedNewsletter);
      setImagePreviewUrl(props.imageUser);
      setIsLoading(false);
      setInputName(props.name);
      setInputSurname(props.surname);

      //CHECK IF IMAGE IS AVATAR
      if (props.imageUser.indexOf("avatars.com") !== -1) {
        setAvatarImage(true);
      }
    }
    // eslint-disable-next-line
  }, [props.imageUser, isLoading]);

  //function to update info modified by user
  function updateUserInfo() {
    props.setName(inputName);
    props.setSurname(inputSurname);
    props.setCheckedNewsletter(checkedNewsletter);
    setIsLoading(true);
    if (inputName !== "" && inputSurname !== "") {
      let data;
      if (inputPassword === "") {
        data = {
          filter: { email: inputEmail },
          modify: {
            nombre: inputName,
            apellidos: inputSurname,
            newsletter: checkedNewsletter,
          },
        };
        Axios({
          method: "PUT",
          data: data,
          withCredentials: true,
          url: "http://localhost:3002/editprofile",
        })
          .then((res) => {
            if (!res.data.error) {
              props.setVariante("success");
              props.setMensaje("Usuario actualizado");
              props.setAlert(true);
              props.setName(inputName);
              props.setSurname(inputSurname);
              props.setCheckedNewsletter(checkedNewsletter);
              setinputEmail(props.user);
              setCheckedNewsletter(props.checkedNewsletter);

              setTimeout(() => {
                setIsLoading(false);
                props.setAlert(false);
                props.setVariante("");
                props.setMensaje("");
              }, 3000);
            } else {
              setIsLoading(false);

              props.setVariante("danger");
              props.setMensaje(res.data.mensaje);
              props.setAlert(true);

              setTimeout(() => {
                props.setAlert(false);
                props.setVariante("");
                props.setMensaje("");
              }, 3000);
            }
          })
          .catch((error) => {
            props.setAlert(true);
            props.setVariante("warning");
            props.setMensaje("Error en la llamada al servidor: " + error);
            setTimeout(() => {
              props.setAlert(false);
              props.setVariante("");
            }, 3000);
          });
      } else {
        if (
          inputPassword === inputPassword2 &&
          validatePassword(inputPassword)
        ) {
          data = {
            filter: { email: inputEmail },
            modify: {
              nombre: inputName,
              apellidos: inputSurname,
              password: inputPassword,
              newsletter: checkedNewsletter,
            },
          };
          Axios({
            method: "PUT",
            data: data,
            withCredentials: true,
            url: "http://localhost:3002/editprofile",
          })
            .then((res) => {
              if (!res.data.error) {
                props.setVariante("success");
                props.setMensaje(res.data.mensaje);
                props.setAlert(true);
                props.setName(inputName);
                props.setSurname(inputSurname);
                setIsLoading(false);

                setTimeout(() => {
                  props.setAlert(false);
                  props.setVariante("");
                  props.setMensaje("");
                }, 3000);
              } else {
                setIsLoading(false);

                props.setVariante("danger");
                props.setMensaje(res.data.mensaje);
                props.setAlert(true);

                setTimeout(() => {
                  props.setAlert(false);
                  props.setVariante("");
                  props.setMensaje("");
                }, 3000);
              }
            })
            .catch((error) => {
              props.setAlert(true);
              props.setVariante("warning");
              props.setMensaje(error.data.content);
              setTimeout(() => {
                props.setAlert(false);
                props.setVariante("");
              }, 3000);
            });
        } else {
          props.setMensaje(
            "Por seguridad debes poner de nuevo tu contraseña.\nLa contraseña debe coincidir y contener MAYÚSCULAS, minusculas y número."
          );
          props.setVariante("warning");
          props.setAlert(true);
          setTimeout(() => {
            props.setAlert(false);
            props.setVariante("");
            props.setMensaje("");
          }, 4000);
        }
      }
    } else {
      props.setMensaje("Nombre o Apellidos no válido");
      props.setVariante("warning");
      props.setAlert(true);

      setIsLoading(false);
      setTimeout(() => {
        props.setAlert(false);
        props.setVariante("");
        props.setMensaje("");
      }, 3000);
    }
  }

  function logout() {
    Axios({
      method: "POST",
      data: {
        email: props.user,
      },
      withCredentials: true,
      url: "http://localhost:3002/logout",
    })
      .then((res) => {
        props.setLogged(false);
        if (res.data.logged === false) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Delete user by email (must be logged)
  function deleteUser(email) {
    Axios({
      method: "DELETE",
      data: { email: email },
      withCredentials: true,
      url: "http://localhost:3002/deleteuser",
    }).then((res) => {
      if (!res.data.error) {
        props.setVariante("success");
        props.setMensaje(res.data.mensaje);
        props.setAlert(true);

        setTimeout(() => {
          props.setAlert(false);
          props.setVariante("");
          props.setMensaje("");
        }, 3000);
      } else {
        props.setVariante("danger");
        props.setMensaje(res.data.mensaje);
        props.setAlert(true);

        setTimeout(() => {
          props.setAlert(false);
          props.setVariante("");
          props.setMensaje("");
        }, 3000);
      }
    });
  }

  function getOrdersByUser(email) {}

  useEffect(() => {
    if (loyalty <= 9) {
      setLoyaltyImg(
        <>
          <p>Eugenius Bronze</p>
          <img
            src="broncegenius.png"
            alt="imagen bronze"
            width={214}
            height={188}
          ></img>
        </>
      );
    } else if (loyalty >= 10 && loyalty <= 20) {
      setLoyaltyImg(
        <>
          <p>Eugenius Silver</p>
          <img
            src="silverbegenius.png"
            alt="imagen silver"
            width={214}
            height={188}
          ></img>
        </>
      );
    } else {
      setLoyaltyImg(
        <>
          <p>Eugenius Gold</p>
          <img
            src="goldengenius.png"
            alt="imagen gold"
            width={214}
            height={188}
          ></img>
        </>
      );
    }
    // eslint-disable-next-line
  }, [loyalty]);

  //Get cards/orders by user
  useEffect(() => {
    if (props.user !== null || props.user !== undefined) {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3002/orders/user?email=${props.user}`,
      }).then((res) => {
        let loyaltyTemp = 0;
        let orders = res.data.data.map((order) => {
          return order.articles.map((article) => {
            let articlesAmount = [];
            for (let i = 0; i < article.quantity; i++) {
              loyaltyTemp += 1 * article.quantity;
              articlesAmount.push(
                <MyCard
                  key={article.title + " " + article.location + i}
                  title={article.title}
                  location={article.location}
                  image={article.image}
                  date={article.date}
                  time={article.time}
                  codeRedeem={article.codeRedeem}
                />
              );
            }
            return articlesAmount;
          });
        });
        setLoyalty(loyaltyTemp);
        setOrdersUser(orders);
        if (!res.data.error) {
          props.setVariante("success");
          props.setMensaje(res.data.mensaje);
          props.setAlert(true);

          setTimeout(() => {
            props.setAlert(false);
            props.setVariante("");
            props.setMensaje("");
          }, 3000);
        } else {
          props.setVariante("danger");
          props.setMensaje(res.data.mensaje);
          props.setAlert(true);

          setTimeout(() => {
            props.setAlert(false);
            props.setVariante("");
            props.setMensaje("");
          }, 3000);
        }
      });
      setOrdersUser(getOrdersByUser(props.user));
    }
    // eslint-disable-next-line
  }, [props.user]);
  return (
    <div>
      <Parallax
        small
        filter
        image={require("../assets/img/profile-bg.jpg").default}
      />
      <div className={classes.main + " " + classes.mainRaised}>
        <div>
          <div className={classes.container}>
            {/* IMAGE SECTION */}
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <img
                    src={imagePreviewUrl}
                    alt="profile"
                    className={imageClasses}
                  />
                </div>
              </GridItem>
              {/* //button select image */}
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.container}>
                  <input
                    hidden
                    type="file"
                    onChange={handleImageChange}
                    ref={fileInput}
                  />
                  <div className={classes.container}>
                    {avatarImage ? (
                      <Button
                        className={classes.buttonSmall}
                        color="info"
                        onClick={() => handleClick()}
                      >
                        {"Seleccionar imagen"}
                      </Button>
                    ) : (
                      <span>
                        <Button
                          className={classes.buttonSmall}
                          color="info"
                          onClick={() => handleClick()}
                        >
                          Cambiar imagen
                        </Button>
                        {props.imageUser !== null ? <br /> : null}
                        <Button
                          className={classes.buttonSmall}
                          color="warning"
                          onClick={() => handleRemove()}
                        >
                          <i className="fas fa-times" /> Eliminar imagen
                        </Button>
                      </span>
                    )}
                  </div>
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <br />

                <br />
              </GridItem>
              <GridItem xs={8} sm={8} md={8}>
                <div className={classes.name}>
                  <h2 color="warning" className={classes.title}>
                    ¡Hola {props.name}!
                  </h2>
                </div>
              </GridItem>
            </GridContainer>
            {/* END IMAGE SECTION */}
            {isLoading ? (
              <p>Loading ...</p>
            ) : (
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                  <NavPills
                    alignCenter
                    color="primary"
                    tabs={[
                      // --------------------------------------------SECTION INFO USER
                      {
                        tabButton: "Datos personales",
                        tabIcon: PersonAddOutlined,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={12}>
                              <CardBody>
                                <CustomInput
                                  labelText="Nombre*"
                                  id="name"
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                  value={inputName}
                                  inputProps={{
                                    defaultValue: props.name,
                                    onChange: (e) => {
                                      setInputName(e.target.value);
                                    },
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <PeopleAltRounded
                                          className={classes.inputIconsColor}
                                        />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                <CustomInput
                                  labelText="Apellido*"
                                  id="surnames"
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                  value={inputSurname}
                                  inputProps={{
                                    defaultValue: props.surname,
                                    onChange: (e) => {
                                      setInputSurname(e.target.value);
                                    },
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <PeopleAltRounded
                                          className={classes.inputIconsColor}
                                        />
                                      </InputAdornment>
                                    ),
                                  }}
                                />

                                <CustomInput
                                  labelText="Email (este campo no es modificable)"
                                  className={classes.colorGray}
                                  id="email"
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                  value={inputEmail}
                                  inputProps={{
                                    className: classes.colorGray,
                                    color: "secondary",
                                    disabled: true,
                                    defaultValue: inputEmail,
                                    onChange: (e) =>
                                      setinputEmail(e.target.value),
                                    type: "email",
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Email
                                          className={classes.inputIconsColor}
                                        />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                <CustomInput
                                  labelText="Clave o Password*"
                                  id="pass"
                                  success={greenLine}
                                  error={redLine}
                                  value={inputPassword}
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                  inputProps={{
                                    onChange: (e) => {
                                      setinputPassword(e.target.value);
                                    },
                                    type: "password",
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <LockSharp
                                          className={classes.inputIconsColor}
                                        />
                                      </InputAdornment>
                                    ),
                                    autoComplete: "off",
                                  }}
                                />
                                <CustomInput
                                  labelText="Repetir Clave o Password*"
                                  id="pass2"
                                  success={greenLine}
                                  error={redLine}
                                  value={inputPassword2}
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                  inputProps={{
                                    onChange: (e) => {
                                      setinputPassword2(e.target.value);
                                    },
                                    type: "password",
                                    autoComplete: "off",
                                  }}
                                />
                                {/* TOGGLE NEWSLETTER */}
                                <div>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        color="primary"
                                        checked={checkedNewsletter}
                                        onChange={() => {
                                          props.setCheckedNewsletter(!checkedNewsletter)
                                          setCheckedNewsletter(
                                            !checkedNewsletter
                                          );
                                        }}
                                        value={checkedNewsletter}
                                        classes={{
                                          switchBase:
                                            classesCheckbox.switchBase,
                                          checked:
                                            classesCheckbox.switchChecked,
                                          thumb: classesCheckbox.switchIcon,
                                          track: classesCheckbox.switchBar,
                                        }}
                                      />
                                    }
                                    classes={{
                                      label: classesCheckbox.label,
                                    }}
                                    label={
                                      checkedNewsletter
                                        ? "¡Suscribirme a la newsletter!"
                                        : "No quiero suscribirme a la newsletter"
                                    }
                                  />
                                </div>
                                {props.alert ? (
                                  notification(props.variante, props.mensaje)
                                ) : (
                                  <></>
                                )}
                                <Button
                                  color="info"
                                  onClick={() => {
                                    updateUserInfo();
                                  }}
                                >
                                  {"Guardar cambios"}
                                </Button>
                                <Button
                                  color="danger"
                                  onClick={() => {
                                    setClassicModal(true);
                                  }}
                                >
                                  {"Eliminar cuenta 😔"}
                                </Button>
                              </CardBody>
                            </GridItem>
                          </GridContainer>
                        ),
                      },
                      // ------ USER ORDERS
                      {
                        tabButton: "Mis partidas",
                        tabIcon: Shop,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={12}>
                              {/* LOYALTY */}
                              <h4>
                                <b>Categoría:</b>
                                {props.loyalty}
                                {loyaltyImg}
                              </h4>
                            </GridItem>

                            {/* ORDERS */}
                            {ordersUser}
                          </GridContainer>
                        ),
                      },
                    ]}
                  />
                </GridItem>
              </GridContainer>
            )}
            {/* PROFILE TABS SECTION */}
          </div>
        </div>
      </div>
      {/* MODAL BOX  */}
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
            onClick={() => {
              setClassicModal(false);
            }}
          >
            <Close className={classes.modalClose} />
          </IconButton>

          <h4 className={classes.modalTitle}>¡Recuerda!</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <p>
            ¿Deseas realmente eliminar tu cuenta? Este proceso es irreversible.
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
            Cancelar
          </Button>{" "}
          <Link to="/">
            <Button
              onClick={() => {
                setClassicModal(false);
                deleteUser(inputEmail);
                logout();
                props.setLogged(false);
              }}
              color="danger"
              round
            >
              Aceptar
            </Button>{" "}
          </Link>
        </DialogActions>
      </Dialog>
      {/* END MODAL BOX */}
    </div>
  );

  function notification(variante, mensaje) {
    if (variante === "success") {
      return (
        <SnackbarContent
          message={<span>{mensaje}</span>}
          close
          color="info"
          icon={Check}
        />
      );
    } else if (variante === "warning") {
      return (
        <SnackbarContent
          message={<span>{mensaje}</span>}
          close
          color="warning"
          icon={Warning}
        />
      );
    } else if (variante === "danger") {
      return (
        <SnackbarContent
          message={<span>{mensaje}</span>}
          close
          color="danger"
          icon="info_outline"
        />
      );
    }
  }

  // At least 1 Uppercase 1 lowercase 1 number and between 8-32 characters
  function validatePassword(pwd) {
    if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,32})$/.test(pwd)) {
      return true;
    }
    return false;
  }
}
