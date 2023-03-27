//Archivo principal de la aplicación
const express = require('express');
//Cargar variables de entorno
require('dotenv').config();

//rutas
const patients = require('./routes/patients');
const login = require('./routes/login');

//Inicializar express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Mantenimiento de pacientes
app.use('/', patients());
app.use('/', login());


//Puerto donde esta corriendo el servidor
app.listen(process.env.PORT, () => { console.log("Servidor corriendo en el puerto: " + process.env.PORT) });