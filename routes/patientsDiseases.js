const express = require("express");
const router = express.Router();

const controlPatients = require("../controllers/controllerPatientsDiseases");
const auth = require("../middlewares/authJWT");
const rol = require("../middlewares/roles-middleware");

module.exports = function () {
  router.get(
    "/patientsDiseases/:id",
    auth.verifyToken,
    rol.restrictTo(1),
    controlPatients.getPatientsDiseasesByID
  );
  router.post(
    "/patientsDiseases",
    auth.verifyToken,
    rol.restrictTo(1),
    controlPatients.addPatientsDiseases
  );

  router.put(
    "/patientsDiseases",
    auth.verifyToken,
    rol.restrictTo(1),
    controlPatients.updatePatientsDiseases
  );

  router.delete(
    "/patientsDiseases/:id",
    auth.verifyToken,
    rol.restrictTo(1),
    controlPatients.DeletePatiensDiseases
  );

  return router;
};
