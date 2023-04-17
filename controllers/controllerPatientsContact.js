const dbPatientsContact = require("../database/dataModels/dbPatientsContact.js");
const pacienteSchema = require("../schemas/patientsContact");

exports.getPatientsContactByID = async (req, res, next) => {
  try {
    const data = await dbPatientsContact.getAllPatientsContact(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error });
  }
};

exports.addPatientsContact = async (req, res, next) => {
  console.log("entro");
  try {
    const { error, value } = pacienteSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    const data = await dbPatientsContact.addPatientContact(req.body);
    res
      .status(200)
      .json({ message: "Contacto agregado correctamente", id: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.updatePatientsContact = async (req, res, next) => {
  try {
    const { error, value } = pacienteSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }
    const data = await dbPatientsContact.updatePatientContact(req.body);
    if (data[0] > 0) {
      res.status(200).json({ message: "Contacto actualizado correctamente" });
    } else {
      return res.status(400).json({ error: "Error al actualizar" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.DeletePatientsContact = async (req, res, next) => {
  try {
    const data = await dbPatientsContact.deletePatientContact(req.params.id);
    if (data[0] > 0) {
      res.status(200).json({ message: "Eliminado correctamente" });
    } else {
      return res.status(400).json({ error: "Error al eliminar, Verifique si el registro existe" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
