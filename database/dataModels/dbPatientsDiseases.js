var config = require("../dbConfig.js");
var sql = require("mssql");

async function getAllPatientsDiseases(id) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM pacientes_enfermedades WHERE idPaciente = @id`);
    return result.recordset;
  } catch (error) {
    console.log(error);
    return "error";
  }
}

async function addPatientDisease(patientDisease) {
  try {
    let pool = await sql.connect(config);
    let insertPatientDisease = await pool
      .request()
      .input("idPaciente", sql.Int, patientDisease.idPaciente)
      .input("enfermedad", sql.VarChar, patientDisease.enfermedad)
      .input("descripcion", sql.VarChar, patientDisease.descripcion)
      .query(`INSERT INTO pacientes_enfermedades (idPaciente, enfermedad, descripcion)
         VALUES (@idPaciente, @enfermedad, @descripcion);
          SELECT SCOPE_IDENTITY() AS id;`);
    let pacienteEnfermedadId = insertPatientDisease.recordset[0].id;
    return pacienteEnfermedadId;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

async function updatePatientDisease(patientDisease) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, patientDisease.id)
      .input("idPaciente", sql.Int, patientDisease.idPaciente)
      .input("enfermedad", sql.VarChar, patientDisease.enfermedad)
      .input("descripcion", sql.VarChar, patientDisease.descripcion)
      .query(`UPDATE pacientes_enfermedades SET idPaciente = @idPaciente,
       enfermedad = @enfermedad, 
       descripcion = @descripcion
       WHERE id = @id`);
    return result.rowsAffected;
  } catch (error) {
    console.log(error);
    return "error";
  }
}

async function deletePatientDisease(id) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`DELETE FROM pacientes_enfermedades WHERE id = @id`);
    return result.rowsAffected;
  } catch (error) {
    console.log(error);
    return "error";
  }
}

module.exports = {
  getAllPatientsDiseases: getAllPatientsDiseases,
  deletePatientDisease: deletePatientDisease,
  addPatientDisease: addPatientDisease,
  updatePatientDisease: updatePatientDisease,
};
