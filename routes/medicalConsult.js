const express = require("express");
const router = express.Router();

const controllerMedicalConsult = require("../controllers/controllerMedicalConsult.js");
const auth = require("../middlewares/authJWT");
const rol = require("../middlewares/roles-middleware");

module.exports = function () {
  router.get(
    "/listMedicalConsult",
    auth.verifyToken,
    rol.restrictTo(1),
    controllerMedicalConsult.ListMedicalConsult
  );

  router.post(
    "/addMedicalConsult",
    auth.verifyToken,
    rol.restrictTo(1),
    controllerMedicalConsult.AddMedicalConsult
  );

  router.put(
    "/updateMedicalConsult",
    auth.verifyToken,
    rol.restrictTo(1),
    controllerMedicalConsult.UpdateMedicalConsult
  );

  router.delete(
    "/deleteMedicalConsult/:id",
    auth.verifyToken,
    rol.restrictTo(1),
    controllerMedicalConsult.DeleteMedicalConsult
  );

  return router;
};
