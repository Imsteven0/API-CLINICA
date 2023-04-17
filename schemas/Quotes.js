const Joi = require("joi");

const citaSchema = Joi.object({
  id: Joi.number().integer().positive(),
  especialidad: Joi.string().required(),
  idPaciente: Joi.number().integer().positive().required(),
  idFuncionario: Joi.number().integer().positive().required(),
  fecha: Joi.string().max(50).required(),
  estado: Joi.number().integer().required(),
});


module.exports = citaSchema;