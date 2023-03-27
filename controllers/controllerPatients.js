// falta exportar modelo sql/mongoose
const dbPatiets = require("../database/dataModels/dbPatiets.js");

const request = require('request');

exports.PublicIP = async (req, res, next) => {
    try {
        const request = require('request');

        request('https://api.ipify.org', (error, response, body) => {
            if (!error && response.statusCode == 200) {
                return res.status(200).json(body);
            }
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
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