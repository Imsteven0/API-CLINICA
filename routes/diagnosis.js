const express = require("express");
const router = express.Router();

const controllerDiagnosis = require("../controllers/controllerDiagnosis.js");
const auth = require("../middlewares/authJWT");
const rol = require("../middlewares/roles-middleware");

module.exports = function () {


  return router;
};
