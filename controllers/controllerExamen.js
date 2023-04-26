const dbExam = require("../database/dataModels/dbExamen.js");
const { description } = require("../schemas/ExamenOrina");
const ExamOrinaSchema = require("../schemas/ExamenOrina");
const ExamSangreSchema = require("../schemas/ExamenSangre");


exports.ListExams = async (req, res, next) => {
    try {
      let data = await dbExam.getAllExams();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  exports.updateExamSangre = async (req, res, next) => {
    try {
      const { error, value } = ExamSangreSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res
          .status(400)
          .json({ errors: error.details.map((e) => e.message) });
      }
    const datos ={id:value.idExamen, idEstado:value.idEstado, idTipoExamen: 1, idConsulta: value.idConsulta,fechaAsginada:value.fechaAsginada}
    dbExam.updateExam(datos)
    const {idExamen, hemoglobina, hematocrito, triglicerios, colesterol,acidoUrico,creatinina} = value;
    const result = await dbExam.updateExmanenSangre(value);
    if (result.rowsAffected = 1) {
      return res
        .status(200)
        .json({ message: "Examen actualizado correctamente" });
    } else {
      return res.status(500).json({ error: result });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}


  exports.AddExamSangre = async (req, res, next) => {
    try {
      const { error, value } = ExamSangreSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res
          .status(400)
          .json({ errors: error.details.map((e) => e.message) });
      }
    const datos ={ idEstado:value.idEstado, idTipoExamen: 1, idConsulta: value.idConsulta,fechaAsginada:value.fechaAsginada}
    console.log(datos)
    const valueExamen = await dbExam.addExam(datos)
    value.idExamen = valueExamen;
    const {idExamen, hemoglobina, hematocrito, triglicerios, colesterol,acidoUrico,creatinina} = value;
    newExamSangreId = await dbExam.addExmanenSangre(value);
      if (newExamSangreId) {
        return res
          .status(200)
          .json({
            message: "Examen de sangre agregado correctamente",
            id: newExamSangreId,
          });
      } else {
        return res.status(500).json({ error: newExamSangreId });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

exports.AddExamOrina = async (req, res, next) => {
  try {
    const { error, value } = ExamOrinaSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }
    const datos ={ idEstado:value.idEstado, idTipoExamen: 2, idConsulta: value.idConsulta,fechaAsginada: value.fechaAsginada}
    const valueExamen = await dbExam.addExam(datos)
    value.idExamen = valueExamen;
    const {idExamen,glucosa, eritrocitos, color, leucocitos} = value;
    newExamOrinaId = await dbExam.addExmanenOrina(value);
    if (newExamOrinaId) {
      return res
        .status(200)
        .json({ message: "Examen de orina agregado correctamente", id: newExamOrinaId});
    } else {
      return res.status(500).json({ error: "All input is requiered" });
    }
  } catch (error) {
    res.status(500).json({ error: error});
  }
};


exports.updateExamOrina = async (req, res, next) => {
  try {
    const { error, value } = ExamOrinaSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }
    const datos ={ id:value.idExamen,idEstado:value.idEstado, idTipoExamen: 2, idConsulta: value.idConsulta,fechaAsginada: value.fechaAsginada}
    dbExam.updateExam(datos)
    const {id,idExamen,glucosa, eritrocitos, color, leucocitos} = value;
    const result = await dbExam.updateExmanenOrina(value);
    if (result.rowsAffected = 1) {
      return res
        .status(200)
        .json({ message: "Examen de orina actualizado correctamente" });
    } else {
      return res.status(500).json({ error: result });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

exports.deleteExamOrina = async (req, res, next) => {
  try {
    const { id } = req.params;  
    const result = await dbExam.deleteExamOrina(id);
    if (result.rowsAffected != 0) {
      return res.status(200).json({ message: "Examen de orina eliminado correctamente" });
    } else {
      return res.status(500).json({ error: result });
    }
  } catch {
    res.status(500).json({ error: error });
  }
}


exports.deleteExamSangre = async (req, res, next) => {
  try {
    const { id } = req.params;  
    const result = await dbExam.deleteExamSangre(id);
    if (result.rowsAffected != 0) {
      return res.status(200).json({ message: "Examen sangre eliminado correctamente" });
    } else {
      return res.status(500).json({ error: result });
    }
  } catch {
    res.status(500).json({ error: error });
  }
};

