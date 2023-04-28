var config = require("../dbConfig.js");
var sql = require("mssql");

async function getQuotesBetweenDates(startDate, endDate) {
  try {
    let pool = await sql.connect(config);
    let data = await pool
      .request()
      .input("startDate", startDate)
      .input("endDate", endDate)
      .query("SELECT * FROM citas WHERE fecha BETWEEN @startDate AND @endDate");
    return data.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function getQuotes() {
  try {
    let pool = await sql.connect(config);
    let data = await pool.request().query("SELECT * FROM citas");
    return data.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function getQuotesPatients() {
  try {
    let pool = await sql.connect(config);
    let data = await pool.request()
      .query(`select c.id, p.nombre +' '+ p.apellidos as Cliente, f.nombre +' '+ f.apellidos as Funcionario,c.especialidad,C.fecha from citas c
      inner join pacientes p on p.id = c.idPaciente
      inner join funcionarios f on f.id = c.idFuncionario`);
    return data.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function addQuote(Quote) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("especialidad", sql.VarChar, Quote.especialidad)
      .input("idPaciente", sql.Int, Quote.idPaciente)
      .input("idFuncionario", sql.Int, Quote.idFuncionario)
      .input("fecha", sql.DateTime, Quote.fecha)
      .input("estado", sql.TinyInt, Quote.estado)
      .query(`INSERT INTO citas (especialidad, idPaciente, idFuncionario, fecha, estado) 
                  VALUES (@especialidad, @idPaciente, @idFuncionario, @fecha, @estado);
                  SELECT SCOPE_IDENTITY() AS id`);
    return result.recordset;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}

async function updateQuote(Quote) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, Quote.id)
      .input("especialidad", sql.VarChar, Quote.especialidad)
      .input("idPaciente", sql.Int, Quote.idPaciente)
      .input("idFuncionario", sql.Int, Quote.idFuncionario)
      .input("fecha", sql.DateTime, Quote.fecha)
      .input("estado", sql.TinyInt, Quote.estado)
      .query(
        `UPDATE citas SET especialidad = @especialidad,
         idPaciente = @idPaciente,
          idFuncionario = @idFuncionario,
           fecha = @fecha,
            estado = @estado
             WHERE id = @id`
      );
    return result;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}

async function deleteQuote(id) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`DELETE FROM citas WHERE id = @id`);
    return result;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}

module.exports = {
  getQuotesBetweenDates: getQuotesBetweenDates,
  addQuote: addQuote,
  updateQuote: updateQuote,
  deleteQuote: deleteQuote,
  getQuotes: getQuotes,
  getQuotesPatients: getQuotesPatients,
};
