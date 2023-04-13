const express = require("express");
const router = express.Router();

const controlQoutes = require("../controllers/controllerQuotes");
const auth = require("../middlewares/authJWT");
const rol = require("../middlewares/roles-middleware");

module.exports = function () {
  router.post(
    "/ListQuotesByDate",
    auth.verifyToken,
    rol.restrictTo(2),
    controlQoutes.ListQuotesByDate
  );

  router.post(
    "/AddQoutes",
    auth.verifyToken,
    rol.restrictTo(2),
    controlQoutes.AddQoutes
  );

  router.put(
    "/UpdateQuote",
    auth.verifyToken,
    rol.restrictTo(2),
    controlQoutes.UpdateQuote
  );

  router.delete(
    "/DeleteQuote/:id",
    auth.verifyToken,
    rol.restrictTo(2),
    controlQoutes.DeleteQuote
  );

  return router;
};
