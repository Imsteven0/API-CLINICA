//Cargar variables de entorno
require('dotenv').config();

var dbConfig = {
    user: process.env.SQLUSER,
    password: process.env.SQLPASSWORD,
    server: process.env.SQLSERVER,
    database: process.env.SQLDATABASE,
    options:{
        trustServerCertificate: true
    }
};
module.exports= dbConfig;