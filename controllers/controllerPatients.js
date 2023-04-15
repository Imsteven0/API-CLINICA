// falta exportar modelo sql/mongoose
const dbPatients = require("../database/dataModels/dbPatiets.js");
const pacienteSchema = require("../schemas/Patients.js");

exports.PublicIP = async (req, res, next) => {
  res
    .status(200)
    .json({ Status: "Servidor UP correctamente, API Clinica Calderon." });
};

exports.ListCLients = async (req, res, next) => {
  try {
    const data = await dbPatients.getAllPatients();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.AddClientes = async (req, res, next) => {
  try {
    const { error, value } = pacienteSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }
    const {
      nombre,
      apellidos,
      cedula,
      direccion,
      telefono,
      peso,
      fechaNacimiento,
      altura,
      enfermedades,
      tipoSangre,
      alergias,
    } = value;

    newPatientId = await dbPatients.addPatient(value);
    if (newPatientId[0].id) {
      return res.status(200).json({
        message: "Paciente agregado correctamente",
        id: newPatientId[0].id,
      });
    } else {
      return res.status(500).json({ error: newPatientId });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.UpdateClientes = async (req, res, next) => {
  try {
    const { error, value } = pacienteSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }
    const {
      id,
      nombre,
      apellidos,
      cedula,
      direccion,
      telefono,
      peso,
      fechaNacimiento,
      altura,
      enfermedades,
      tipoSangre,
      alergias,
    } = value;

    const result = await dbPatients.updatePatient(value);
    if (result.rowsAffected[0] === 1) {
      return res
        .status(200)
        .json({ message: "Paciente actualizado correctamente" });
    } else {
      return res.status(500).json({ error: result });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.DeleteClientes = async (req, res, next) => {
 console.log('entro')
  try {
    const data = await dbPatients.deletePatient(req.params.id);
    res.status(200).json({idEliminado: data});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
