const Joi = require("joi");

const consultaSchema = Joi.object({
  idCita: Joi.number().integer().positive().required(),
  idFuncionario: Joi.number().integer().positive().required(),
  peso: Joi.string().required(),
  altura: Joi.string().required(),
  descripcionSintomas: Joi.string().required(),
});

module.exports = consultaSchema;
