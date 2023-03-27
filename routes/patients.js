const express = require("express");
const router = express.Router();

const controlPatients = require("../controllers/controllerPatients");

const auth = require("../middlewares/authJWT");

module.exports = function () {

    router.get("/listPatiens", auth.verifyToken, controlPatients.ListCLients);

    return router;
};