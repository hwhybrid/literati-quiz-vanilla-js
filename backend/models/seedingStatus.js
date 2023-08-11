// models/seedingStatus.js
module.exports = (sequelize, DataTypes) => {
    const SeedingStatus = sequelize.define('SeedingStatus', {
        hasSeeded: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    });

    return SeedingStatus;
};
