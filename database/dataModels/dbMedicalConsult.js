var config = require("../dbConfig.js");
var sql = require("mssql");

async function getAllConsult() {
  try {
    let pool = await sql.connect(config);
    let data = await pool.request().query("Select * from consulta");
    return data.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function addConsult(consult) {}

async function updateConsult(consult) {}

async function deleteConsult(id) {}

module.exports = {
  getAllConsult: getAllConsult,
};
