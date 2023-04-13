//Archivo principal de la aplicación
const express = require("express");

const cors = require("cors");
//Cargar variables de entorno
require("dotenv").config();

//rutas
const patients = require("./routes/patients");
const login = require("./routes/login");
const Quotes = require("./routes/quotes");
const MedicalConsult = require("./routes/medicalConsult");

//Inicializar express
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Mantenimiento de pacientes
app.use("/", patients());
app.use("/", login());
app.use("/", Quotes());
app.use("/", MedicalConsult());

//Puerto donde esta corriendo el servidor
app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto: " + process.env.PORT);
});
