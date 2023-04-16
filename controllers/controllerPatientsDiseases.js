// falta exportar modelo sql/mongoose
const dbPatientsDiseases = require("../database/dataModels/dbPatientsDiseases.js");
const patientsDiseases = require("../schemas/patientsDiseases");

exports.getPatientsDiseasesByID = async (req, res, next) => {
  try {
    const data = await dbPatientsDiseases.getAllPatientsDiseases(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
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
    res
      .status(200)
      .json({ message: "Enfermedad agregada correctamente", id: data[0].id });
  } catch (error) {
    res.status(500).json({ error: error });
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
    res.status(200).json({ message: "Enfermedad actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.DeletePatiensDiseases = async (req, res, next) => {
  try {
    const data = await dbPatientsDiseases.deletePatientDisease(req.params.id);
    res.status(200).json({ info: "Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
