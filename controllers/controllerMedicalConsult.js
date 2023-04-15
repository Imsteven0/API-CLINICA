const dbMedicalConsult = require("../database/dataModels/dbMedicalConsult");
const MedicalConsult = require("../schemas/MedicalConsult.js");

exports.ListMedicalConsult = async (req, res) => {
  try {
    let data = await dbMedicalConsult.getAllConsult();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.AddMedicalConsult = async (req, res) => {
  try {
    const { error, value } = MedicalConsult.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }
    const { idCita, idFuncionario, peso, altura, descripcionSintomas } = value;

    newConsultid = await dbMedicalConsult.addConsulta(value);
    if (newConsultid[0].id) {
      return res.status(200).json({
        message: "Consulta agregada correctamente",
        id: newConsultid[0].id,
      });
    } else {
      return res.status(500).json({ error: newConsultid });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.UpdateMedicalConsult = async (req, res) => {
  try {
    const { error, value } = MedicalConsult.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }
    const { id, idCita, idFuncionario, peso, altura, descripcionSintomas } =
      value;

    let rows = await dbMedicalConsult.updateConsult(value);
    if (rows[0].id) {
      return res.status(200).json({
        message: "Consulta actualizada correctamente",
        id: rows[0].id,
      });
    } else {
      return res.status(500).json({ error: rows });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.DeleteMedicalConsult = async (req, res) => {
  try {
    let id = req.params.id;
    let rows = await dbMedicalConsult.deleteConsult(id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
};