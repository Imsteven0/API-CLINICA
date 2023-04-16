// falta exportar modelo sql/mongoose
const dbPatientsDiseases = require("../database/dataModels/dbPatientsDiseases.js");
const patientsDiseases = require("../schemas/patientsDiseases");

exports.getPatientsDiseasesByID = async (req, res, next) => {
  try {
    const data = await dbPatientsDiseases.getAllPatientsDiseases(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addPatientsDiseases = async (req, res, next) => {
  try {
    const { error, value } = patientsDiseases.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    const data = await dbPatientsDiseases.addPatientDisease(req.body);
    if (data > 0) {
      res
        .status(200)
        .json({ message: "Enfermedad agregada correctamente", id: data });
    } else {
      return res.status(400).json({ error: "Error al agregar enfermedad" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.updatePatientsDiseases = async (req, res, next) => {
  try {
    const { error, value } = patientsDiseases.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }
    const data = await dbPatientsDiseases.updatePatientDisease(req.body);
    if (data[0] > 0) {
      res
        .status(200)
        .json({ message: "Enfermedad actualizada correctamente", id: data[0] });
    } else {
      return res.status(400).json({ error: "Error al actualizar" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.DeletePatiensDiseases = async (req, res, next) => {
  try {
    const data = await dbPatientsDiseases.deletePatientDisease(req.params.id);
    if (data[0] > 0) {
      res.status(200).json({ message: "Enfermedad eliminada correctamente" });
    } else {
      return res.status(400).json({ error: "Error al eliminar, Verifique si el registro existe" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
