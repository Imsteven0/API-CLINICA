const Joi = require("joi");

const ExamenSangreSchema = Joi.object({
  id: Joi.number().integer().positive(),
  idExamen: Joi.number().integer().positive(),
  idConsulta: Joi.number().integer().positive().required(),
  fechaAsginada: Joi.date().required(),
  idEstado: Joi.number().integer().positive().required(),
  hemoglobina: Joi.string().required(),
  hematocrito: Joi.string().required(),
  triglicerios: Joi.string().required(),
  colesterol: Joi.string().required(),
  acidoUrico: Joi.string().required(),
  creatinina: Joi.string().required()
});

module.exports = ExamenSangreSchema;
