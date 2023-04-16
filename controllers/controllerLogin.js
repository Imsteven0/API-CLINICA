const dbCollaborators = require("../database/dataModels/dbCollaborators.js");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.Register = async (req, res, next) => {
  try {
    const { cedula, password } = req.body;

    if (!(cedula && password)) {
      return res.status(409).json({ error: "All input is required" });
    }

    let dataCedula = await getCedula(cedula);

    if (dataCedula === "error") {
      return res.status(409).json({ error: "Cedula no valida" });
    } else {
      const oldUser = await dbCollaborators.verifyEmailCedula(cedula);

      if (oldUser.length > 0) {
        return res
          .status(409)
          .json({ error: "User Already Exist. Please Login" });
      }

      encryptedPassword = await bcrypt.hash(password, 10);

      const user = {
        nombre: dataCedula.firstname1,
        apellidos: dataCedula.lastname,
        cedula: cedula.toLowerCase(),
        password: encryptedPassword,
      };

      const addUser = await dbCollaborators.addCollaborators(user);

      const token = jwt.sign(
        { user_id: addUser, cedula },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      const usuario = await dbCollaborators.verifyCredentialsLogin(cedula);

      await dbCollaborators.updateTokenCollaborator(addUser, token);

      res.status(200).json({
        id: usuario[0].idRol,
        rol: usuario[0].descripcionRol,
        token: token,
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(409).json({ error: "Ops algo salio mal!" });
  }
};

exports.Login = async (req, res, next) => {
  try {
    const { cedula, password } = req.body;

    if (!(cedula && password)) {
      return res.status(409).json({ error: "All input is required" });
    }

    const user = await dbCollaborators.verifyCredentialsLogin(cedula);

    if (user.length > 0 && (await bcrypt.compare(password, user[0].password))) {
      const token = jwt.sign(
        { user_id: user[0].id, cedula },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      await dbCollaborators.updateTokenCollaborator(user[0].id, token);

      user[0].token = token;

      res.status(200).json({
        id: user[0].idRol,
        rol: user[0].descripcionRol,
        token: user[0].token,
      });
    } else {
      return res.status(409).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("Ops algo salio mal!");
  }
};

const getCedula = async (cedula) => {
  try {
    const response = await fetch("https://apis.gometa.org/cedulas/" + cedula, {
      method: "GET",
    });
    const data = await response.json();
    if (data.resultcount > 0 && data.cedula.trim() !== "") {
      return data.results[0];
    } else {
      return "error";
    }
  } catch (error) {
    console.log("Fetch request failed:", error.message);
    return "error";
  }
};
