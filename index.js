//Archivo principal de la aplicación
const express = require('express');

//rutas
const patients = require('./routes/patients');

//Cargar variables de entorno
require('dotenv').config();

//Inicializar express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas de la aplicación
app.use('/patients', patients);

//Puerto donde esta corriendo el servidor
app.listen(process.env.PORT, () => { console.log("Servidor corriendo en el puerto: " + process.env.PORT) });