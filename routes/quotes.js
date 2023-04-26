const express = require("express");
const router = express.Router();

const controlQoutes = require("../controllers/controllerQuotes");
const auth = require("../middlewares/authJWT");
const rol = require("../middlewares/roles-middleware");

module.exports = function () {
  router.post(
    "/ListQuotesByDate",
    auth.verifyToken,
    rol.restrictTo(1),
    controlQoutes.ListQuotesByDate
  );

  router.get(
    "/listQuotesWithPatients",
    auth.verifyToken,
    rol.restrictTo(1),
    controlQoutes.listCitas
  );

  router.post(
    "/AddQoutes",
    auth.verifyToken,
    rol.restrictTo(1),
    controlQoutes.AddQoutes
  );

  router.put(
    "/UpdateQuote",
    auth.verifyToken,
    rol.restrictTo(1),
    controlQoutes.UpdateQuote
  );

  router.delete(
    "/DeleteQuote/:id",
    auth.verifyToken,
    rol.restrictTo(1),
    controlQoutes.DeleteQuote
  );

  return router;
};
