const Joi = require("joi");

const citaSchema = Joi.object({
  especialidad: Joi.string().required(),
  idPaciente: Joi.number().integer().positive().required(),
  idFuncionario: Joi.number().integer().positive().required(),
  fecha: Joi.date().required(),
  estado: Joi.number().integer().required(),
});


module.exports = citaSchema;