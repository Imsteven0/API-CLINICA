// falta exportar modelo sql/mongoose
const dbPatiets = require("../database/dataModels/dbPatiets.js");

const request = require('request');

exports.PublicIP = async (req, res, next) => {
 res.status(200).json({Status:'Servidor UP correctamente, API Clinica Calderon.'})
};

exports.ListCLients = async (req, res, next) => {
    try {
        const data = await dbPatiets.getAllPatients();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

exports.AddClientes = async (req, res, next) => {

};

exports.UpdateClientes = async (req, res, next) => {

};

exports.DeleteClientes = async (req, res, next) => {

};
