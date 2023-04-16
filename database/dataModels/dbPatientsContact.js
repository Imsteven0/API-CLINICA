var config = require("../dbConfig.js");
var sql = require("mssql");

async function getAllPatientsContact(id) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`SELECT FROM pacientes_contacto WHERE idPaciente = @id`);
    return result.rowsAffected;
  } catch (error) {
    return "error";
  }
}

async function addPatientContact(patient) {
  try {
    let pool = await sql.connect(config);
    let insertPatient = await pool
      .request()
      .input("nombre", sql.VarChar, patient.nombre)
      .input("apellidos", sql.VarChar, patient.apellidos)
      .input("cedula", sql.VarChar, patient.cedula)
      .input("direccion", sql.VarChar, patient.direccion)
      .input("peso", sql.VarChar, patient.peso)
      .input("fechaNacimiento", sql.Date, patient.fechaNacimiento)
      .input("altura", sql.VarChar, patient.altura)
      .input("tipoSangre", sql.VarChar, patient.tipoSangre)
      .query(`INSERT INTO pacientes (nombre, apellidos, cedula, direccion, peso, fechaNacimiento, altura, tipoSangre)
         VALUES (@nombre, @apellidos, @cedula, @direccion, @peso, @fechaNacimiento, @altura, @tipoSangre);
          SELECT SCOPE_IDENTITY() AS id;`);
    let pacienteId = insertPatient.recordset[0].id;
    return pacienteId;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

async function updatePatientContact(patient) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, patient.id)
      .input("nombre", sql.VarChar, patient.nombre)
      .input("apellidos", sql.VarChar, patient.apellidos)
      .input("cedula", sql.VarChar, patient.cedula)
      .input("direccion", sql.VarChar, patient.direccion)
      .input("peso", sql.VarChar, patient.peso)
      .input("fechaNacimiento", sql.Date, patient.fechaNacimiento)
      .input("altura", sql.VarChar, patient.altura)
      .input("tipoSangre", sql.VarChar, patient.tipoSangre)
      .query(`UPDATE pacientes SET nombre = @nombre,
       apellidos = @apellidos, 
       cedula = @cedula, 
       direccion = @direccion,
       peso = @peso,
       fechaNacimiento = @fechaNacimiento,
       altura = @altura,
       tipoSangre = @tipoSangre 
       WHERE id = @id`);
    return result.rowsAffected;
  } catch (error) {
    return "error";
  }
}

async function deletePatientContact(id) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`DELETE FROM pacientes WHERE id = @id`);
    return result.rowsAffected;
  } catch (error) {
    return "error";
  }
}

module.exports = {
  getAllPatientsContact: getAllPatientsContact,
  deletePatientContact: deletePatientContact,
  addPatientContact: addPatientContact,
  updatePatientContact: updatePatientContact,
};
