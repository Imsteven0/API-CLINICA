const Joi = require("joi");

const DiagnosisSchema = Joi.object({
  idConsulta: Joi.number().integer().positive(),
  diagnosticoMedico: Joi.string().max(100).required(),
  fechaDiagnostico: Joi.date().required(),
  idEstado: Joi.number().integer().positive().required(),
});

module.exports = DiagnosisSchema;
