const { Op } = require('sequelize');
const winston = require('winston');
const mockServerDao = require('../dao').mockServerDao;

module.exports = {
    getRouteResponse: async (req, res) => {
        try {
            const { routeId } = req.body;
            const response = await mockServerDao.fetchRouteResponse(routeId);
            const parseRouteResponse = JSON.parse(response.routeResponse);
            return res.status(200).json({
                routeId: response.routeId, 
                route: response.route, 
                routeResponse: parseRouteResponse,
                isDeleted: response.isDeleted,
                createdAt: response.createdAt,
                updatedAt: response.updatedAt
            });
        }
        catch (error) {
            winston.error(`Error occurs while fetching route response from database :${error}`)
            return res.status(500).json({ "message": "Unable to proceed your request. please try again later." })
        }
    },
    createRoute: async (req, res) => {
        try {
            const { routeJson, route } = req.body;
            const routedata = JSON.stringify(routeJson);
            await mockServerDao.createRoute({ route, routeResponse: routedata });
            return res.status(200).json({ message: "route created successfully." });
        }
        catch (error) {
            winston.error(`Error occurs while creating route into database :${error}`)
            return res.status(500).json({ "message": "Unable to proceed your request. please try again later." })
        }
    },
    fetchAllRoutes: async(req, res) => {
        try {
            const response = await mockServerDao.findAllRoutes();
            let result = [];
            response.forEach(element => {
                const parseRouteResponse = JSON.parse(element.routeResponse);
                result.push({
                    routeId: element.routeId, 
                    route: element.route, 
                    routeResponse: parseRouteResponse,
                    isDeleted: element.isDeleted,
                    createdAt: element.createdAt,
                    updatedAt: element.updatedAt
                });
            });
            return res.status(200).json(result);
        } catch (error) {
            winston.error(`Error occurs while fetching all routes from database :${error}`)
            return res.status(500).json({ "message": "Unable to proceed your request. please try again later." })
        }
    }
}