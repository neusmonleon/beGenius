/*
 _________________________
/\                        \
\_|   Express Server      |
  |  _____________________|_
  \_/______________________/
*/

const express = require("express");
//Request body middleware , parse request , for upload own profile images
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const session = require("express-session");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// expresion para llamadas POST/PUT
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let ranking = require("./ranking");
let histories = require("./histories");
let orders = require("./orders");
require("dotenv").config(); //importar variables de entorno
const cookieParser = require("cookie-parser");
const mongo = require("mongodb");
const MongoStore = require("connect-mongo");
const secret = "qwerty";
const crypto = require("crypto");
//Autentication and session Passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/ranking", ranking);
app.use("/histories", histories);
app.use("/orders", orders);

/*
 _________________________
/\                        \
\_|   Autentication and   |
  |     session Passport  |
  |  _____________________|_
  \_/______________________/
*/

//variable to controle amount of output showed ion feedback
let feedback = {
  //specific feedback autentication
  middle: false,
  provider: false, // true = specific, false = generic
  mensaje: "",
};

// handle storage using multer //------PROFILE IMAGE UPLOAD--------
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
let upload = multer({ storage: storage });
// serving static files
app.use("/uploads", express.static("uploads"));

//------Session Passport management
app.use(
  session({
    secret: secret, //secret of the session
    resave: false, //stop reset with each call
    saveUninitialized: false, //stop empty sessions
    store: MongoStore.create({
      mongoUrl: process.env.URL_MONGO,
      dbName: "begenius",
      collectionName: "sessions",
      ttl: 1000 * 60 * 60 * 24, //Time To Live sessions
      autoRemove: "native", //Remove TTL completed sessions.
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //Expiration cookie browser client
    },
  })
);
app.use(cookieParser(secret));
app.use(passport.initialize());
app.use(passport.session());

//Control feedback  as a middlewere
if (feedback.middle) {
  app.use((req, res, next) => {
    console.log("Express Middleware");
    console.log(req.session ? req.session : "Session not found");
    console.log(req.user ? req.user : "User not found");
    next();
  });
}

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      feedback.mensaje = "";
      if (email != "" && password != "") {
        app.locals.db
          .collection("users")
          .findOne({ email: email }, function (err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              feedback.provider
                ? (feedback.mensaje = "User not registered")
                : (feedback.mensaje = "Bad Login");
              return done(null, false);
            }
            if (
              !validatePassword(
                password,
                user.password.hash,
                user.password.salt
              )
            ) {
              feedback.provider
                ? (feedback.mensaje = "Bad Password")
                : (feedback.mensaje = "Bad Login");
              return done(null, false);
            }
            feedback.mensaje = "Login successfully";
            return done(null, user);
          });
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  //console.log("-> Serialize");
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  //console.log("-> Deserialize");
  app.locals.db
    .collection("users")
    .findOne({ email: user.email }, function (err, usuario) {
      if (err) {
        return done(err);
      }
      if (!usuario) {
        return done(null, null);
      }
      return done(null, usuario);
    });
});
/*
 _________________________
/\                        \
\_|   Database MongoDB    |
  |  _____________________|_
  \_/______________________/
*/
mongo.MongoClient.connect(process.env.URL_MONGO, (err, client) => {
  err
    ? (console.log("??? MongoDB NO connected"), console.log(`error ${err}`))
    : ((app.locals.db = client.db("begenius")),
      console.log("??? MongoDB connected successfully"));
});

/*
 _________________________
/\                        \
\_|        Routes         |
  |  _____________________|_
  \_/______________________/
*/
app.get("/", (req, res) => {
  req.isAuthenticated()
    ? res.send({
        logged: true,
        mensaje: "Authentication OK. Loading profile of " + req.user,
        user: req.user,
        cookie: req.session.cookie.expires,
      })
    : res.send({
        logged: false,
        mensaje: "Can not access to the profile without login",
        cookie: req.session.cookie.expires,
      });
});

//Call to login - first step authentication session with passport --- LOCAL ---
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/api",
    failureRedirect: "/api/fail",
  })
);

//Redirecto to go after accept session authentication. Asume correct login
app.all("/api", (req, res) => {
  res.send({
    logged: true,
    mensaje: feedback.mensaje,
    user: req.user,
  });
});

//Redirecto to go after failed session authentication. Asume failed login
app.all("/api/fail", (req, res) => {
  res.send({
    logged: false,
    mensaje: feedback.mensaje,
  });
});

//Manual session expiration
app.post("/logout", (req, res) => {
  req.logOut(), //cookie expired
    res.send({
      logged: false,
      mensaje: "Logout successfully",
    });
  //res.redirect("/");
});

//Create new user: require[email & password]
app.post("/signup", (req, res) => {
  req.app.locals.db
    .collection("users")
    .find({ email: req.body.email })
    .toArray((err, users) => {
      if (err) {
        res.send({ error: true, content: err });
      } else {
        if (users.length > 0) {
          res.send({ error: true, content: "Email ya registrado." });
        } else {
          let passwordCrypt = createPassword(req.body.password);
          req.app.locals.db.collection("users").insertOne(
            {
              nombre: req.body.nombre,
              apellidos: req.body.apellido,
              email: req.body.email,
              password: { hash: passwordCrypt.hash, salt: passwordCrypt.salt },
              fechaNacimiento: req.body.fechaNacimiento,
              newsletter: req.body.newsletter,
              image: `https://eu.ui-avatars.com/api/?name=${req.body.nombre}`,
            },
            (err1, data) => {
              err1
                ? res.send({ error: true, content: err1 })
                : res.send({
                    error: false,
                    contenido: data,
                  });
            }
          );
        }
      }
    });
});

app.get("/profile", (req, res) => {
  req.isAuthenticated()
    ? res.send({
        logged: true,
        mensaje: "Authentication OK. Loading profile of " + req.user,
        user: req.user,
      })
    : res.send({
        logged: false,
        mensaje: "Can not access to the profile without login",
      });
});

app.put("/editprofile", function (req, res) {
  if (req.body.modify.password !== undefined) {
    let passwordCrypt = createPassword(req.body.modify.password);
    req.body.modify.password = passwordCrypt;
  }
  app.locals.db.collection("users").updateOne(
    { email: req.body.filter.email },
    {
      $set: req.body.modify,
    },
    function (error, datos) {
      if (error === null) {
        res.send({ error: true, mensaje: "Ha habido un error. " + error });
      } else {
        res.send({
          error: false,
          mensaje: "Usuario editado correctamente",
          datos: datos,
        });
      }
    }
  );
});

app.delete("/deleteuser", function (req, res) {
  if (req.isAuthenticated() === false) {
    return res.status(401).send({
      mensaje:
        "No estas logueado. Por favor, accede primero con tus credenciales.",
    });
  }
  req.app.locals.db
    .collection("users")
    .deleteOne({ email: req.body.email }, function (error, datos) {
      if (error !== null) {
        res.send({ mensaje: "Error en el servidor. " + error });
      } else {
        res.send({ mensaje: "Usuario eliminado correctamente" });
      }
    });
});

// handle single file upload
app.post("/uploadfile", upload.single("dataFile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: "Please upload a file." });
  }
  console.log("File uploaded: " + file);
  return res.send({
    message: "File uploaded successfully.",
    status: 200,
    file: file,
  });
});
/*
 _________________________
/\                        \
\_|     Server STATUS     |
  |  _____________________|_
  \_/______________________/
*/

app.listen(process.env.PORT || 3000, (err) => {
  err
    ? console.error("??? Server NOT connected")
    : console.log("??? Server connected to the port " + process.env.PORT);
});

/*
 _________________________
/\                        \
\_|      Functions        |
  |  _____________________|_
  \_/______________________/
*/

function createPassword(password) {
  let salt = crypto.randomBytes(32).toString("hex");
  let genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return {
    salt: salt,
    hash: genHash,
  };
}

function validatePassword(password, hash, salt) {
  let hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hashVerify === hash;
}
