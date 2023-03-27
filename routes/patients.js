const express = require("express");
const router = express.Router();

const controlPatients = require("../controllers/controllerPatients");

const auth = require("../middlewares/authJWT");

module.exports = function () {

    router.get("/list", auth.verifyToken, controlPatients.ListCLients);

    return router;
};