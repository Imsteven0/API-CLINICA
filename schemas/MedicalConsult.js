const Joi = require("joi");

const consultaSchema = Joi.object({
  id: Joi.number().integer().positive(),
  idCita: Joi.number().integer().positive().required(),
  idFuncionario: Joi.number().integer().positive().required(),
  peso: Joi.string().required(),
  altura: Joi.string().required(),
  presion: Joi.string().required(),
  descripcionSintomas: Joi.string().required(),
});

module.exports = consultaSchema;
