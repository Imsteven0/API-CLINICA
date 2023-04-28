var config = require("../dbConfig.js");
var sql = require("mssql");

async function listbyIdConsulta(idConsulta) {
  try {
    let pool = await sql.connect(config);
    let data = await pool
      .request()
      .input("idConsulta", sql.Int, idConsulta)
      .query(`select * from diagnostico where idConsulta = @idConsulta`);
    return data.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function getAllDiagnosis() {
  try {
    let pool = await sql.connect(config);
    let data = await pool.request().query(`select * from diagnostico`);
    return data.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function addDiagnostic(datos) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("idConsulta", sql.Int, datos.idConsulta)
      .input("diagnosticoMedico", sql.Int, datos.diagnosticoMedico)
      .input("medicamentoRecetados", sql.Int, datos.medicamentoRecetados)
      .input("fechaDiagnostico", sql.Int, datos.fechaDiagnostico)
      .input("idEstado", sql.Int, datos.idEstado)
      .query(`INSERT INTO diagnostico (idConsulta, diagnosticoMedico, medicamentoRecetados, fechaDiagnostico, idEstado)
            VALUES (@idConsulta, @diagnosticoMedico,@medicamentoRecetados, @fechaDiagnostico, @idEstado) ;
            SELECT SCOPE_IDENTITY() AS id`);
    return result.recordset[0].id;
  } catch (error) {
    console.log(error);
    return "error";
  }
}

async function updateDiagnostic(datos) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, datos.id)
      .input("idConsulta", sql.Int, datos.idConsulta)
      .input("diagnosticoMedico", sql.Int, datos.diagnosticoMedico)
      .input("fechaDiagnostico", sql.Int, datos.fechaDiagnostico)
      .input("idEstado", sql.Int, datos.idEstado).query(`UPDATE diagnostico SET
            idConsulta = @idConsulta
            diagnosticoMedico = @diagnosticoMedico,
            fechaDiagnostico = @fechaDiagnostico
            idEstado = @idEstado
            WHERE id = @id`);
    return result.rowsAffected;
  } catch (error) {
    return "error";
  }
}

async function deleteDiagnostic(id) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`DELETE FROM diagnostico WHERE id = @id`);
    return result.rowsAffected;
  } catch (error) {
    return "error";
  }
}

module.exports = {
  listbyIdConsulta: listbyIdConsulta,
  getAllDiagnosis: getAllDiagnosis,
  addDiagnostic: addDiagnostic,
  updateDiagnostic: updateDiagnostic,
  deleteDiagnostic: deleteDiagnostic,
};
