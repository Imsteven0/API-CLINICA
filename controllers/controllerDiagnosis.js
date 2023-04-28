const dbDiagnosis = require("../database/dataModels/dbDiagnosis");
const DiagnosisSchema = require("../schemas/Diagnosis");

exports.getAllDiagnosis = async (req, res, next) => {
  try {
    const data = await dbDiagnosis.getAllDiagnosis();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.listDiagnosticByIdConsulta = async (req, res, next) => {
  try {
    const idConsulta = req.params.idConsulta;
    const data = await dbDiagnosis.getDiagnosticByIdConsulta(idConsulta);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addDiagnostic = async (req, res, next) => {
  try {
    const { error, value } = DiagnosisSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }
    const result = await dbDiagnosis.addDiagnostic(value);
    if (result) {
      return res
        .status(200)
        .json({ message: "Diagnostico agregado correctamente", id: result });
    } else {
      return res.status(500).json({ error: result });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.updateDiagnostic = async (req, res, next) => {
  try {
    const { error, value } = DiagnosisSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }
    const result = await dbDiagnosis.updateDiagnostic(value);
    if (result) {
      return res
        .status(200)
        .json({ message: "Diagnostico actualizado correctamente" });
    } else {
      return res.status(500).json({ error: result });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.deleteDiagnostic = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await dbDiagnosis.deleteDiagnostic(id);
    if (result) {
      return res
        .status(200)
        .json({ message: "Diagnostico eliminado correctamente" });
    } else {
      return res.status(500).json({ error: result });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
