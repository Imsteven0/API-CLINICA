const express = require("express");
const router = express.Router();

const controlOfficials = require("../controllers/controllerOfficials");
const auth = require("../middlewares/authJWT");
const rol = require("../middlewares/roles-middleware");

module.exports = function () {
  router.get(
    "/listOfficials",
    auth.verifyToken,
    rol.restrictTo(1),
    controlOfficials.GetAllOfficials
  );

  router.put(
    "/updateOfficials",
    auth.verifyToken,
    rol.restrictTo(1),
    controlOfficials.UpdateOfficial
  );

  router.delete(
    "/deleteOfficials/:cedula",
    auth.verifyToken,
    rol.restrictTo(1),
    controlOfficials.DeleteOfficial
  );

  return router;
};
