var config = require("../dbConfig.js");
var sql = require("mssql");

async function getAllPatients() {
  try {
    let pool = await sql.connect(config);
    let data = await pool.request().query("Select * from pacientes");
    return data.recordset;
  } catch (error) {
    console.log(error);
    return error.message
  }
}

async function addPatient(patient) {
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
    let patientId = insertPatient.recordset;
    return patientId;
  } catch (error) {
    console.log(error);
    return error.message
  }
}

async function updatePatient(patient) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, patient.id)
      .input("nombre", sql.VarChar, patient.nombre)
      .input("apellidos", sql.VarChar, patient.apellidos)
      .input("cedula", sql.VarChar, patient.cedula)
      .input("direccion", sql.VarChar, patient.direccion)
      .input("telefono", sql.VarChar, patient.telefono)
      .input("peso", sql.VarChar, patient.peso)
      .input("fechaNacimiento", sql.Date, patient.fechaNacimiento)
      .input("altura", sql.VarChar, patient.altura)
      .input("tipoSangre", sql.VarChar, patient.tipoSangre)
      .query(`UPDATE pacientes SET 
          nombre = @nombre,
          apellidos = @apellidos,
          cedula = @cedula,
          direccion = @direccion,
          telefono = @telefono,
          peso = @peso,
          fechaNacimiento = @fechaNacimiento,
          altura = @altura,
          enfermedades = @enfermedades,
          tipoSangre = @tipoSangre,
          alergias = @alergias
          WHERE id = @id;`);
    return result;
  } catch (error) {
    console.log(error);
    return error.message
  }
}

async function deletePatient(id) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`DELETE FROM pacientes WHERE id = @id;`);
    return result.recordset;
  } catch (error) {
    console.log(error);
    return error.message
  }
}

module.exports = {
  getAllPatients: getAllPatients,
  addPatient: addPatient,
  updatePatient: updatePatient,
  deletePatient: deletePatient,
};
