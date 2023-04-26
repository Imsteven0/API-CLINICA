var config = require("../dbConfig.js");
var sql = require("mssql");

async function getAllOfficials() {
  try {
    let pool = await sql.connect(config);
    let data = await pool.request()
      .query(`Select  F.id, F.idRol,R.descripcion as rolUsuario ,F.nombre,F.apellidos,F.cedula,F.ultimaSeccion,F.createAt as fechaCreado 
      from funcionarios F
      INNER JOIN rol AS R ON R.id = F.idRol`);
    return data.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function updateOfficial(consult) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("idRol", sql.Int, consult.idRol)
      .input("cedula", sql.VarChar, consult.cedula)
      .query(
        `UPDATE funcionarios SET 
            idRol = @idRol
            WHERE cedula = @cedula`
      );
    return result.rowsAffected;
  } catch (error) {
    return "error";
  }
}

async function deleteOfficial(cedula) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("cedula", sql.Int, cedula)
      .query(`DELETE FROM funcionarios WHERE cedula = @cedula`);
    return result.rowsAffected;
  } catch (error) {
    return "error";
  }
}

module.exports = {
  getAllOfficials: getAllOfficials,
  updateOfficial: updateOfficial,
  deleteOfficial: deleteOfficial,
};
