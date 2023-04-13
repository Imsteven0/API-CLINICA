var config = require("../dbConfig.js");
var sql = require("mssql");

async function verifyEmailExist(email) {
  try {
    let pool = await sql.connect(config);
    let data = await pool
      .request()
      .input("email", email)
      .query("SELECT id from funcionarios where correo = @email");
    return data.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function verifyCredentialsLogin(email) {
  try {
    let pool = await sql.connect(config);
    let data = await pool
      .request()
      .input("email", email)
      .query(
        "SELECT f.id,f.nombre,f.correo,f.password,r.id as idRol ,r.descripcion as descripcionRol  from funcionarios as f INNER JOIN rol AS r on r.id = f.idRol where f.correo = @email"
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
      .input("nombre", sql.VarChar, datos.first_name)
      .input("apellidos", sql.VarChar, datos.last_name)
      .input("correo", sql.VarChar, datos.email)
      .input("password", sql.VarChar, datos.password)
      .query(`INSERT INTO funcionarios (nombre, apellidos, correo, password, createAt) 
                VALUES (@nombre, @apellidos, @correo, @password, getdate());
                SELECT SCOPE_IDENTITY() AS id`);
    return result.recordset[0].id;
  } catch (error) {
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
  verifyEmailExist: verifyEmailExist,
  addCollaborators: addCollaborators,
  verifyCredentialsLogin: verifyCredentialsLogin,
  updateTokenCollaborator: updateTokenCollaborator,
  getRoleUser: getRoleUser,
};
