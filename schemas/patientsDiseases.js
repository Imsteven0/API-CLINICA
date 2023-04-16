const Joi = require('joi');

const pacienteEnfermedadSchema = Joi.object({
  idPaciente: Joi.number().integer().required(),
  enfermedad: Joi.string().max(50).required(),
  descripcion: Joi.string().max(50).required(),
});
