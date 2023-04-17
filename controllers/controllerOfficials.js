const dbOfficials = require("../database/dataModels/dbOfficials");
const officials = require("../schemas/officials.js");

exports.GetAllOfficials = async (req, res) => {
  try {
    let rows = await dbOfficials.getAllOfficials();
    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      return res.status(500).json({ error: "No hay registros" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.UpdateOfficial = async (req, res) => {
  try {
    const { error, value } = officials.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    let rows = await dbOfficials.updateOfficial(req.body);
    if (rows[0] > 0) {
      return res.status(200).json({
        message: "Funcionario actualizado correctamente",
      });
    } else {
      return res
        .status(500)
        .json({ error: "Verifique si el registro a actualizar existe" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.DeleteOfficial = async (req, res) => {
  try {
    let rows = await dbOfficials.deleteOfficial(req.params.cedula);
    if (rows[0] > 0) {
      return res.status(200).json({
        message: "Funcionario eliminado correctamente",
      });
    } else {
      return res
        .status(500)
        .json({ error: "Verifique si el registro a eliminar existe" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
