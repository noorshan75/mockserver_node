module.exports = (sequelize, DataTypes) => {
    var mockserver = sequelize.define('mockserver', {
        routeId: {
            type: DataTypes.UUID,
            unique: true,
            primaryKey: true
        },
        route: DataTypes.STRING,
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        routeResponse: DataTypes.STRING
    });
    return mockserver;
};