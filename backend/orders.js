const express = require("express");
const router = express.Router();

// Get all orders
router.get("/all", function (req, res) {
  let db = req.app.locals.db;
  db.collection("orders")
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
            mensaje: "All orders showed.",
          });
    });
});

//Get history info by user
router.get("/user", function (req, res) {
  let db = req.app.locals.db;
  db.collection("orders")
    .find({ email: req.query.email })
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

//Create new order
router.post("/new", (req, res) => {
  req.app.locals.db.collection("orders").insertOne(
    {
      articles: req.body.articles,
      name: req.body.name,
      orderId: req.body.orderId,
      price: req.body.price,
      email: req.body.email,
      tickets: 6,
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
            codeRedeem: req.body.codeRedeem,
            mensaje: "New order registered",
          });
    }
  );
});

//Delete order
router.delete("/delete", (req, res) => {
  req.app.locals.db
    .collection("orders")
    .deleteOne({ orderId: req.body.orderId }, function (err, datos) {
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
            mensaje: "Deleted order: " + req.body.orderId,
          });
    });
});


//Modify order
router.put("/modify", (req, res) => {
  req.app.locals.db
    .collection("histories")
    .find({ orderId: req.body.orderId })
    .toArray((err, orders) => {
      if (err) {
        //Error with the find call
        res.send({ error: true, content: err });
      } else {
        if (orders.length <= 0) {
          res.send({ error: true, content: "Order no existe." });
        } else {
          req.app.locals.db.collection("orders").updateOne(
            { orderId: req.body.orderId },
            {
              $set: {
                articles: req.body.articles,
                name: req.body.name,
                orderId: req.body.orderId,
                price: req.body.price,
                email: req.body.email,
                tickets: req.body.tickets,
                codeRedeem: req.body.codeRedeem,
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
                    mensaje: "The order has been modified",
                  });
            }
          );
        }
      }
    });
});

module.exports = router;
