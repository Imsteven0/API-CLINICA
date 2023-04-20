var config = require("../dbConfig.js");
var sql = require("mssql");

async function getAllPatientsContact(id) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`SELECT pc.id,pc.idPaciente,pc.nombre,pc.apellidos,pc.telefono,pc.direccion,p.parentezco 
      FROM pacientes_contacto as PC
      INNER JOIN parentezco as p on p.id = pc.idParentezco
      WHERE PC.idPaciente = @id`);
    return result.recordset;
  } catch (error) {
    return "error";
  }
}

async function addPatientContact(patient) {
  try {
    let pool = await sql.connect(config);
    let insertPatient = await pool
      .request()
      .input("idPaciente", sql.Int, patient.idPaciente)
      .input("idParentezco", sql.Int, patient.idParentezco)
      .input("nombre", sql.VarChar, patient.nombre)
      .input("apellidos", sql.VarChar, patient.apellidos)
      .input("telefono", sql.VarChar, patient.telefono)
      .input("direccion", sql.VarChar, patient.direccion)
      .query(`INSERT INTO pacientes_contacto (idPaciente, idParentezco, nombre, apellidos, telefono, direccion)
         VALUES (@idPaciente, @idParentezco, @nombre, @apellidos, @telefono, @direccion);
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
      .input("idPaciente", sql.Int, patient.idPaciente)
      .input("idParentezco", sql.Int, patient.idParentezco)
      .input("nombre", sql.VarChar, patient.nombre)
      .input("apellidos", sql.VarChar, patient.apellidos)
      .input("telefono", sql.VarChar, patient.telefono)
      .input("direccion", sql.VarChar, patient.direccion)
      .query(`UPDATE pacientes_contacto SET 
        idPaciente = @idPaciente,
        idParentezco = @idParentezco, 
        nombre = @nombre, 
        apellidos = @apellidos,
        telefono = @telefono,
        direccion = @direccion
        WHERE id = @id`);
    return result.rowsAffected;
  } catch (error) {
    console.log(error)
    return "error";
  }
}

async function deletePatientContact(id) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`DELETE FROM pacientes_contacto WHERE id = @id`);
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
