const Joi = require("joi");

const official = Joi.object({
  id: Joi.number().integer().positive(),
  idRol: Joi.number().integer().positive().required(),
  cedula: Joi.string(),
});

module.exports = official;
