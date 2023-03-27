const dbCollaborators = require("../database/dataModels/dbCollaborators.js");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.Register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await dbCollaborators.verifyEmailExist(email);

    if (oldUser.length > 0) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = {
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    };

    const addUser = await dbCollaborators.addCollaborators(user);

    const token = jwt.sign({ user_id: addUser, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    user.token = token;

    await dbCollaborators.updateTokenCollaborator(addUser, token);

    res.status(201).json(user);
  } catch (err) {
    res.status(400).send("Ops algo salio mal!");
  }
};

exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await dbCollaborators.verifyCredentialsLogin(email);

    if (user.length > 0 && (await bcrypt.compare(password, user[0].password))) {
      const token = jwt.sign(
        { user_id: user[0].id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      await dbCollaborators.updateTokenCollaborator(user[0].id, token);

      user[0].token = token;

      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Ops algo salio mal!");
  }
};
