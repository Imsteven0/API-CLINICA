const express = require("express");
const router = express.Router();

const controllerDiagnosis = require("../controllers/controllerDiagnosis.js");
const auth = require("../middlewares/authJWT");
const rol = require("../middlewares/roles-middleware");

module.exports = function () {
  router.get(
    "/ListDiagnosis",
    auth.verifyToken,
    rol.restrictTo(1),
    controllerDiagnosis.ListDiagnosis
  );

  router.post(
    "/AddDiagnostic",
    auth.verifyToken,
    rol.restrictTo(1),
    controllerDiagnosis.addDiagnostic
  );

  router.put(
    "/UpdateDiagnostic",
    auth.verifyToken,
    rol.restrictTo(1),
    controllerDiagnosis.updateDiagnostic
  );

  router.delete(
    "/DeleteDiagnostic/:id",
    auth.verifyToken,
    rol.restrictTo(1),
    controllerDiagnosis.deleteDiagnostic
  );

  return router;
};
