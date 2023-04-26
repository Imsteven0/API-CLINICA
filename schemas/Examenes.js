const Joi = require("joi");

const ExamSchema = Joi.object({
  idConsulta: Joi.number().integer().positive().required(),
  idTipoExamen: Joi.number().integer().positive().required(),
  fechaAsignada: Joi.date.required(),
  idEstado: Joi.number().integer().positive().required(),
});

module.exports = ExamSchema;