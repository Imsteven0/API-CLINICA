const Joi = require('joi');

const pacienteContactoSchema = Joi.object({
  id: Joi.number().integer().positive(),
  idPaciente: Joi.number().integer().positive().required(),
  idParentezco: Joi.number().integer().positive().required(),
  nombre: Joi.string().max(20).required(),
  apellidos: Joi.string().max(20).required(),
  telefono: Joi.string().max(20).required(),
  direccion: Joi.string().max(100).required(),
});

module.exports = pacienteContactoSchema;
