const express = require("express");
const router = express.Router();

// Get all histories
router.get("/all", function (req, res) {
  let db = req.app.locals.db;
  db.collection("histories")
    .find()
    .toArray(function (err, datos) {
      err
        ? res.send({
            error: true,
            data: datos,
            mensaje: "Error in the db call",
            err,
          })
        : res.send({
            error: false,
            data: datos,
            mensaje: "All histories showed.",
          });
    });
});

//Get history info by title
router.get("/info", function (req, res) {
  let db = req.app.locals.db;
  db.collection("histories")
    .find({ title: req.query.title })
    .toArray(function (err, datos) {
      err
        ? res.send({
            error: true,
            data: datos,
            err,
          })
        : res.send({
            error: false,
            data: datos,
          });
    });
});

//Create new history
router.post("/new", (req, res) => {
  req.app.locals.db
    .collection("histories")
    .find({ title: req.body.title })
    .toArray((err, histories) => {
      if (err) {
        //Error with the find call
        res.send({ error: true, content: err });
      } else {
        if (histories.length > 0) {
          res.send({ error: true, content: "Historia ya existe." });
        } else {
          req.app.locals.db.collection("histories").insertOne(
            {
              title: req.body.title,
              image: req.body.image,
              description: req.body.description,
              level: req.body.level,
              price: parseInt(req.body.price),
              location: req.body.location,
              age: parseInt(req.body.age),
              type: req.body.type,
              active: req.body.active,
              duration: req.body.duration,
              date: req.body.date,
              time: req.body.time,
              team: req.body.team,
              startpoint: req.body.startpoint,
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
                    mensaje: "New history registered",
                  });
            }
          );
        }
      }
    });
});

//Delete the history
router.delete("/delete", (req, res) => {
  req.app.locals.db
    .collection("histories")
    .deleteOne({ title: req.body.title }, function (err, datos) {
      err
        ? res.send({
            error: true,
            data: datos,
            mensaje: "Error in the db elimination:",
            err,
          })
        : res.send({
            error: false,
            data: datos,
            mensaje: "Deleted the history: " + req.body.title,
          });
    });
});

//Modify a history
router.put("/modify", (req, res) => {
  req.app.locals.db
    .collection("histories")
    .find({ title: req.body.title })
    .toArray((err, histories) => {
      if (err) {
        //Error with the find call
        res.send({ error: true, content: err });
      } else {
        if (histories.length <= 0) {
          res.send({ error: true, content: "Historia no existe." });
        } else {
          req.app.locals.db.collection("histories").updateOne(
            { title: req.body.title },
            {
              $set: {
                image: req.body.image,
                description: req.body.description,
                level: req.body.level,
                price: parseInt(req.body.price),
                location: req.body.location,
                age: parseInt(req.body.age),
                type: req.body.type,
                active: req.body.active,
                duration: req.body.duration,
                date: req.body.date,
                time: req.body.time,
                team: req.body.team,
                startpoint: req.body.startpoint,
              },
            },
            function (err, datos) {
              err
                ? res.send({
                    error: true,
                    data: datos,
                    mensaje: "Error in the db updated:",
                    err,
                  })
                : res.send({
                    error: false,
                    data: datos,
                    mensaje: "The history has been modified",
                  });
            }
          );
        }
      }
    });
});

module.exports = router;
