const Joi = require("joi");

const ExamenOrinaSchema = Joi.object({
  id: Joi.number().integer().positive(),
  idExamen: Joi.number().integer().positive(),
  idConsulta: Joi.number().integer().positive().required(),
  fechaAsginada: Joi.date().required(),
  idEstado: Joi.number().integer().positive().required(),
  glucosa: Joi.string().required(),
  eritrocitos: Joi.string().required(),
  color: Joi.string().required(),
  leucocitos: Joi.string().required()
});

module.exports = ExamenOrinaSchema;