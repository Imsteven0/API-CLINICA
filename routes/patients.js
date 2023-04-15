const express = require("express");
const router = express.Router();

const controlPatients = require("../controllers/controllerPatients");
const auth = require("../middlewares/authJWT");
const rol = require("../middlewares/roles-middleware");

module.exports = function () {
  router.get(
    "/listPatiens",
    auth.verifyToken,
    rol.restrictTo(1),
    controlPatients.ListCLients
  );

  router.post(
    "/addPatients",
    auth.verifyToken,
    rol.restrictTo(1),
    controlPatients.AddClientes
  );

  router.put(
    "/updatePatients",
    auth.verifyToken,
    rol.restrictTo(1),
    controlPatients.UpdateClientes
  );

  router.delete(
    "/deletePatients/:id",
    auth.verifyToken,
    rol.restrictTo(1),
    controlPatients.DeleteClientes
  );

  router.get("/", controlPatients.PublicIP);

  return router;
};
