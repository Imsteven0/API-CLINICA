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
const patientsDiseases = require("./routes/patientsDiseases");
const patientsContact = require("./routes/patientsContact");
const official = require("./routes/officials");
const Exam = require("./routes/examen");

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
app.use("/", patientsDiseases());
app.use("/", patientsContact());
app.use("/", official());
app.use("/", Exam());

//Puerto donde esta corriendo el servidor
app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto: " + process.env.PORT);
});
