const express = require("express");
const router = express.Router();

const controlPatients = require("../controllers/controllerPatients");

module.exports = function () {

    router.get("/list", controlPatients.ListCLients);

    return router;
};