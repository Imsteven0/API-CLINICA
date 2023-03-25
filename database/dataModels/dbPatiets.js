var config = require('../dbConfig.js')
var sql = require('mssql');

async function getAllPatients(){
    try{
        let pool = await sql.connect(config)
        let data = await pool.request().query("Select * from pacientes");
        return data.recordset;
    }catch (error){
        console.log(error)
    }
}

module.exports = {
    getAllPatients:getAllPatients
  }