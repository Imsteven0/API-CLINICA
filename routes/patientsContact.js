const express = require("express");
const router = express.Router();

const controlPatientsContact = require("../controllers/controllerPatientsContact");
const auth = require("../middlewares/authJWT");
const rol = require("../middlewares/roles-middleware");

module.exports = function () {
  router.get(
    "/patientsContact/:id",
    auth.verifyToken,
    rol.restrictTo(1),
    controlPatientsContact.getPatientsContactByID
  );
  router.post(
    "/patientsContact",
    auth.verifyToken,
    rol.restrictTo(1),
    controlPatientsContact.addPatientsContact
  );
  router.put(
    "/patientsContact",
    auth.verifyToken,
    rol.restrictTo(1),
    controlPatientsContact.updatePatientsContact
  );
  router.delete(
    "/patientsContact/:id",
    auth.verifyToken,
    rol.restrictTo(1),
    controlPatientsContact.DeletePatientsContact
  );

  return router;
};
