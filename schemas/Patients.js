const Joi = require("joi");

const pacienteSchema = Joi.object({
  id: Joi.number().integer().required(),
  nombre: Joi.string().required(),
  apellidos: Joi.string().required(),
  cedula: Joi.string().length(9).required(),
  direccion: Joi.string().required(),
  telefono: Joi.string().required(),
  peso: Joi.string().required(),
  fechaNacimiento: Joi.date().required(),
  altura: Joi.string().required(),
  tipoSangre: Joi.string().required(),
});

module.exports = pacienteSchema;
