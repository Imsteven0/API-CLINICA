var config = require("../dbConfig.js");
var sql = require("mssql");

async function getAllExams() {
  try {
    let pool = await sql.connect(config);
    let data = await pool.request()
      .query(`select UPPER(p.apellidos+' '+p.nombre) as Paciente,
    fechaAsginada as FechaExamen,c.descripcionSintomas as Consulta,
    t.examenMedico as TipoExamen,es.descripcion as Examen
    from [dbo].[examenes] as e
    inner join [dbo].[tipo_examen] as t on e.idTipoExamen = t.id
    inner join [dbo].[estado_examen] as es on e.idEstado = e.idEstado
    inner join [dbo].[consulta] as c on e.idConsulta = c.id
    inner join [dbo].[citas] ci on c.idCita = ci.id
    inner join [dbo].[pacientes] as p on ci.idPaciente = p.id`);
    return data.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function addExmanenSangre(datos) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("idExamen", sql.Int, datos.idExamen)
      .input("hemoglobina", sql.VarChar, datos.hemoglobina)
      .input("hematocrito", sql.VarChar, datos.hematocrito)
      .input("triglicerios", sql.VarChar, datos.triglicerios)
      .input("colesterol", sql.VarChar, datos.colesterol)
      .input("acidoUrico", sql.VarChar, datos.acidoUrico)
      .input("creatinina", sql.VarChar, datos.creatinina)
      .query(
        `INSERT INTO examen_sangre (idExamen, hemoglobina, hematocrito, triglicerios, colesterol,acidoUrico,creatinina) 
            VALUES (@idExamen,@hemoglobina, @hematocrito, @triglicerios, @colesterol,@acidoUrico,@creatinina); 
            SELECT SCOPE_IDENTITY() AS id`
      );
    return result.recordset[0].id;
  } catch (error) {
    console.log(error);
    return "error";
  }
}

async function updateExmanenSangre(datos) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, datos.id)
      .input("idExamen", sql.Int, datos.idExamen)
      .input("hemoglobina", sql.VarChar, datos.hemoglobina)
      .input("hematocrito", sql.VarChar, datos.hematocrito)
      .input("triglicerios", sql.VarChar, datos.triglicerios)
      .input("colesterol", sql.VarChar, datos.colesterol)
      .input("acidoUrico", sql.VarChar, datos.acidoUrico)
      .input("creatinina", sql.VarChar, datos.creatinina)
      .query(
        `UPDATE examen_sangre SET
        idExamen =@idExamen, 
        hemoglobina=@hemoglobina,
        hematocrito=@hematocrito, 
        triglicerios=@triglicerios, 
        colesterol=@colesterol,
        acidoUrico=@acidoUrico,
        creatinina = @creatinina 
        where id = @id`
      );
    return result.rowsAffected;
  } catch (error) {
    console.log(error);
    return "error";
  }
}

async function addExmanenOrina(datos) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("idExamen", sql.Int, datos.idExamen)
      .input("glucosa", sql.VarChar, datos.glucosa)
      .input("eritrocitos", sql.VarChar, datos.eritrocitos)
      .input("color", sql.VarChar, datos.color)
      .input("leucocitos", sql.VarChar, datos.leucocitos)
      .query(
        `INSERT INTO examen_orina (idExamen, glucosa, eritrocitos, color, leucocitos) 
              VALUES (@idExamen, @glucosa, @eritrocitos, @color, @leucocitos) ; 
              SELECT SCOPE_IDENTITY() AS id`
      );
    return result.recordset[0].id;
  } catch (error) {
    console.log(error + "aqui");
    return "error";
  }
}

async function updateExmanenOrina(datos) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, datos.id)
      .input("idExamen", sql.Int, datos.idExamen)
      .input("glucosa", sql.VarChar, datos.glucosa)
      .input("eritrocitos", sql.VarChar, datos.eritrocitos)
      .input("color", sql.VarChar, datos.color)
      .input("leucocitos", sql.VarChar, datos.leucocitos)
      .query(
        `UPDATE examen_orina SET
        idExamen =@idExamen, 
        glucosa= @glucosa,
        eritrocitos =@eritrocitos,
        color = @color,
        leucocitos = @leucocitos
        WHERE id=@id`);
    return result.rowsAffected
  } catch (error) {
    console.log(error + "aqui");
    return "error";
  }
}

async function addExam(datos) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("idConsulta", sql.Int, datos.idConsulta)
      .input("idTipoExamen", sql.Int, datos.idTipoExamen)
      .input("fechaAsginada", sql.Date, datos.fechaAsginada)
      .input("idEstado", sql.Int, datos.idEstado)
      .query(
        `INSERT INTO examenes (idConsulta, idTipoExamen, fechaAsginada, idEstado) 
              VALUES (@idConsulta, @idTipoExamen,@fechaAsginada,@idEstado) ; 
              SELECT SCOPE_IDENTITY() AS id`
      );
    return result.recordset[0].id;
  } catch (error) {
    console.log(error);
    return "error";
  }
}

async function updateExam(datos) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, datos.id)
      .input("idConsulta", sql.Int, datos.idConsulta)
      .input("idTipoExamen", sql.Int, datos.idTipoExamen)
      .input("fechaAsginada", sql.Date, datos.fechaAsginada)
      .input("idEstado", sql.Int, datos.idEstado)
      .query(
        `UPDATE examenes SET 
        idConsulta = @idConsulta
        idTipoExamen = @idTipoExamen,
        fechaAsginada = @fechaAsginada
        idEstado = @idEstado
        WHERE id = @id`
      );
    return result.rowsAffected;
  } catch (error) {
    return "error";
  }
}

async function deleteExam(id) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`DELETE FROM examens WHERE id = @id`);
    return result.rowsAffected;
  } catch (error) {
    return "error";
  }
}

async function deleteExamSangre(id) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
      DELETE FROM examen_sangre WHERE idExamen = @id
      DELETE FROM examenes WHERE id = @id
     `);
    return result.rowsAffected;
  } catch (error) {
    console.log(error+"Aqui")
    return "error";
  }
}

async function deleteExamOrina(id) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`DELETE FROM examen_orina WHERE id = @id`);
    return result.recordset;
  } catch (error) {
    return "error";
  }
}

module.exports = {
  getAllExams: getAllExams,
  addExmanenSangre: addExmanenSangre,
  addExmanenOrina: addExmanenOrina,
  addExam: addExam,
  updateExam: updateExam,
  updateExmanenOrina:updateExmanenOrina,
  updateExmanenSangre,updateExmanenSangre,
  deleteExam:deleteExam,
  deleteExamOrina: deleteExamOrina,
  deleteExamSangre: deleteExamSangre
};
