const dbQuotes = require("../database/dataModels/dbQuotes.js");
const citaSchema = require("../schemas/Quotes.js");

/**
 * @description Obtiene una lista de citas entre dos fechas
 */
exports.ListQuotesByDate = async (req, res, next) => {
  try {
    // Extraemos las fechas de inicio y fin desde el body del request
    const { startDate, endDate } = req.body;
    // Obtenemos las citas correspondientes a las fechas indicadas desde la base de datos
    const data = await dbQuotes.getQuotesBetweenDates(startDate, endDate);
    // Respondemos con un status 200 y la lista de citas obtenida
    res.status(200).json(data);
  } catch (error) {
    // Si ocurre un error, respondemos con un status 500 y un objeto JSON que contiene información sobre el error
    res.status(500).json({ error: error });
  }
};

exports.AddQoutes = async (req, res, next) => {
  try {
    const { error, value } = citaSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }
    const { especialidad, idPaciente, idFuncionario, fecha, estado } = value;

    newQuoteId = await dbQuotes.addQuote(value);
    if (newQuoteId[0].id) {
      return res
        .status(200)
        .json({ message: "Cita agregada correctamente", id: newQuoteId[0].id });
    } else {
      return res.status(500).json({ error: newQuoteId });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.UpdateQuote = async (req, res, next) => {
  try {
    const { error, value } = citaSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }
    const { id, especialidad, idPaciente, idFuncionario, fecha, estado } = value;

    const result = await dbQuotes.updateQuote(value);

    if (result.rowsAffected[0] === 1) {
      return res
        .status(200)
        .json({ message: "Cita actualizada correctamente" });
    } else {
      return res.status(500).json({ error: result });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.DeleteQuote = async (req, res, next) => {
  try {
    const result = await dbQuotes.deleteQuote(req.params.id);
    if (result.rowsAffected[0] === 1) {
      return res.status(200).json({ message: "Cita eliminada correctamente" });
    } else {
      return res.status(500).json({ error: 'Verifique si existe el id a eliminar' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
