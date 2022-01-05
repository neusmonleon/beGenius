const express = require("express");
const router = express.Router();

// Get all the results for all users
router.get("/all", function (req, res) {
  let db = req.app.locals.db;
  db.collection("ranking")
    .find()
    .toArray(function (error, datos) {
      if (error !== null) {
        res.send({ mensaje: "Ha habido un error. " + error });
      } else {
        res.send(datos);
      }
    });
});

// Get all the results from a logged user
router.get("/user", function (req, res) {
  let db = req.app.locals.db;
  db.collection("ranking")
    .find({ email: req.query.email })
    .toArray(function (error, datos) {
      if (error !== null) {
        res.send({ mensaje: "Ha habido un error. " + error });
      } else {
        res.send(datos);
      }
    });
});

//Create a ranking
router.post("/new", (req, res) => {
  req.app.locals.db.collection("ranking").insertOne(
    {
      team: req.body.team,
      email: req.body.email,
      time: req.body.time,
      streetscape: req.body.streetscape,
    },
    function (err, datos) {
      err
        ? res.send({
            error: true,
            data: datos,
            mensaje: "Error in the db insertion:",
            err,
          })
        : res.send({
            error: false,
            data: datos,
            mensaje: "New ranking registered",
          });
    }
  );
});

//Delete all ranking registers for a user
router.delete("/deleteAllUser", (req, res) => {
  req.app.locals.db
    .collection("ranking")
    .deleteMany({ email: req.body.email }, function (err, datos) {
      err
        ? res.send({
            error: true,
            data: datos,
            mensaje: "Error in the db deletion:",
            err,
          })
        : res.send({
            error: false,
            data: datos,
            mensaje: "Deleted all registered ranking for the user"+req.body.email,
          });
    });
});

module.exports = router;
