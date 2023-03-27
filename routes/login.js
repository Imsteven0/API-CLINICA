const express = require("express");
const router = express.Router();

const controlLogin = require("../controllers/controllerLogin");

module.exports = function () {

    router.post("/register", controlLogin.Register);

    router.post("/login", controlLogin.Login);

    return router;
};