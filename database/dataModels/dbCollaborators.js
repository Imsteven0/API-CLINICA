var config = require("../dbConfig.js");
var sql = require("mssql");

async function verifyEmailCedula(cedula) {
  try {
    let pool = await sql.connect(config);
    let data = await pool
      .request()
      .input("cedula", cedula)
      .query("SELECT id from funcionarios where cedula = @cedula");
    return data.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function verifyCredentialsLogin(cedula) {
  try {
    let pool = await sql.connect(config);
    let data = await pool
      .request()
      .input("cedula", cedula)
      .query(
        "SELECT f.id,f.nombre,f.password,r.id as idRol ,r.descripcion as descripcionRol  from funcionarios as f INNER JOIN rol AS r on r.id = f.idRol where f.cedula = @cedula"
      );
    return data.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function addCollaborators(datos) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("nombre", sql.VarChar, datos.nombre)
      .input("apellidos", sql.VarChar, datos.apellidos)
      .input("cedula", sql.VarChar, datos.cedula)
      .input("password", sql.VarChar, datos.password)
      .query(`INSERT INTO funcionarios (nombre, apellidos,cedula, password, createAt) 
                VALUES (@nombre, @apellidos, @cedula, @password, getdate());
                SELECT SCOPE_IDENTITY() AS id`);
    return result.recordset[0].id;
  } catch (error) {
    console.log(error)
    return "error";
  }
}

async function updateTokenCollaborator(id, token) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().input("id", id).input("token", token)
      .query(`UPDATE funcionarios
                    SET token = @token,
                    ultimaSeccion = getdate()
                    WHERE id = @id`);
    return result.rowsAffected;
  } catch (error) {
    console.log(error);
    return "error";
  }
}

async function getRoleUser(token) {
  try {
    let pool = await sql.connect(config);
    let data = await pool.request().input("token", token)
      .query(`Select R.id,R.descripcion from funcionarios F
      INNER JOIN rol AS R ON R.id = F.idRol
      where F.token = @token`);
    return data.recordset;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  verifyEmailCedula: verifyEmailCedula,
  addCollaborators: addCollaborators,
  verifyCredentialsLogin: verifyCredentialsLogin,
  updateTokenCollaborator: updateTokenCollaborator,
  getRoleUser: getRoleUser,
};
