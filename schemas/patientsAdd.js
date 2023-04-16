const Joi = require("joi");

const pacienteSchemaAdd = Joi.object({

  nombre: Joi.string().required(),
  apellidos: Joi.string().required(),
  cedula: Joi.string().length(9).required(),
  direccion: Joi.string().required(),
  telefono: Joi.string().required(),
  peso: Joi.string().required(),
  fechaNacimiento: Joi.date().required(),
  altura: Joi.string().required(),
  tipoSangre: Joi.string().required()
});

module.exports = pacienteSchemaAdd;
