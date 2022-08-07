const winston = require("winston");
const db = require('../models');
const mockserver = db.mockserver;
const uuid = require('uuid').v4;

module.exports = {
    fetchRouteResponse: async (routeId) => {
        return await mockserver.findOne({ where: { routeId, isDeleted: false } })
            .then((result) => {
                winston.info("route response has been fetched successfully.")
                return result;
            }).catch((error) => {
                winston.error(`Error occurs while fetching route reponse from database :${error}`)
                throw error;
            });
    },
    createRoute: async (routedata) => {
        const routeId = uuid();
        return await mockserver.create({ ...routedata, routeId })
            .then((result) => {
                winston.info("API route created successfully.")
                return result;
            }).catch((error) => {
                winston.error(`Error occurs while creating route from database :${error}`)
                throw error;
            })
    },
    findAllRoutes: async () => {
        return await mockserver.findAll()
            .then((result) => {
                winston.info("Fetched all routes from database")
                return result;
            }).catch((error) => {
                winston.error(`Error occurs while fetching routes from database :${error}`)
                throw error;
            })
    }
}