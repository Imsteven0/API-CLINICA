var config = require("../dbConfig.js");
var sql = require("mssql");

async function getAllConsult() {
  try {
    let pool = await sql.connect(config);
    let data = await pool.request().query(`Select c.id,c.idCita,c.idFuncionario,p.nombre + ' ' + p.apellidos as nombreCliente from consulta c
    inner join citas as ci on ci.id = c.idCita
    inner join pacientes as p on p.id = ci.idPaciente
    `);
    return data.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function addConsulta(datos) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("idCita", sql.Int, datos.idCita)
      .input("idFuncionario", sql.Int, datos.idFuncionario)
      .input("presion", sql.VarChar, datos.presion)
      .input("peso", sql.VarChar, datos.peso)
      .input("altura", sql.VarChar, datos.altura)
      .input("descripcionSintomas", sql.VarChar, datos.descripcionSintomas)
      .query(
        `INSERT INTO consulta (idCita, idFuncionario, presion, peso, altura, descripcionSintomas) 
            VALUES (@idCita, @idFuncionario, @presion ,@peso, @altura, @descripcionSintomas); 
            SELECT SCOPE_IDENTITY() AS id`
      );
    return result.recordset[0].id;
  } catch (error) {
    return "error";
  }
}
async function updateConsult(consult) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, consult.id)
      .input("idCita", sql.Int, consult.idCita)
      .input("idFuncionario", sql.Int, consult.idFuncionario)
      .input("peso", sql.VarChar, consult.peso)
      .input("altura", sql.VarChar, consult.altura)
      .input("descripcionSintomas", sql.VarChar, consult.descripcionSintomas)
      .query(
        `UPDATE consulta SET 
            idCita = @idCita,
            idFuncionario = @idFuncionario,
            peso = @peso,
            altura = @altura,
            descripcionSintomas = @descripcionSintomas
            WHERE id = @id`
      );
    return result.rowsAffected;
  } catch (error) {
    return "error";
  }
}

async function deleteConsult(id) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`DELETE FROM consulta WHERE id = @id`);
    return result.rowsAffected;
  } catch (error) {
    return "error";
  }
}

module.exports = {
  getAllConsult: getAllConsult,
  addConsulta: addConsulta,
  updateConsult: updateConsult,
  deleteConsult: deleteConsult
};
