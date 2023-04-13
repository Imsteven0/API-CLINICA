const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
Middleware que verifica la autenticación del token.
@returns {function} next - Devuelve la función de middleware si se verifica la autenticación del token.
*/

exports.verifyToken = (req, res, next) => {
  // Obtiene el token de autorización desde el cuerpo, los parámetros de consulta o los encabezados de la solicitud
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // Si no hay token, devuelve un mensaje de error
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    // Verifica el token utilizando la clave secreta
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    // Almacena la información del usuario en el objeto de solicitud
    req.user = decoded;
  } catch (err) {
    // Si el token no es válido, devuelve un mensaje de error
    return res.status(401).send("Invalid Token");
  }
  // Si el token es válido, llama a la función de middleware siguiente
  return next();
};
