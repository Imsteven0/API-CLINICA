const dbCollaborators = require("../database/dataModels/dbCollaborators.js");

/**
 * Middleware de roles para restringir el acceso basado en el tipo de usuario
 * @param {number} role - El número de rol requerido para acceder a la ruta.
 * @returns {function} - Una función middleware que verifica si el usuario tiene el rol adecuado.
 */
function restrictTo(role) {
  return function (req, res, next) {
    // Obtener el token de autenticación del encabezado de autorización
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    // Obtener el tipo de usuario del token de autenticación
    dbCollaborators
      .getRoleUser(token)
      .then((data) => {
        const userRole = data[0].id;

        // Comprobar si el usuario tiene el tipo de usuario correcto
        if (data[0].id === 1) {
          // Si el rol requerido es el de público (1), permitir el acceso a la ruta
          return next();
        } else if (userRole !== role) {
          // Si el rol es diferente al requerido y el rol requerido no es el de público (1)
          return res.status(403).json({
            message: `No tienes permisos para acceder a esta ruta. Tu rol actualmente es ${data[0].descripcion}`,
          });
        }

        // Si el usuario tiene el tipo de usuario correcto o el rol requerido es el de público (1), permitir el acceso a la ruta
        next();
      })
      .catch((error) => {
        console.log(error);
        return res.status(403).json({ message: "Verifique su token." });
      });
  };
}

exports.restrictTo = restrictTo;
