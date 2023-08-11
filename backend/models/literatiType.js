const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const LiteratiType = sequelize.define('LiteratiType', {
        literatiType: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        imageUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });

    LiteratiType.associate = (models) => {
        // Association with Answer model
        LiteratiType.hasMany(models.Answer, {
            foreignKey: 'literatiType',
            onDelete: 'CASCADE',
        });

        // Association with Option model
        LiteratiType.hasMany(models.Option, {
            foreignKey: 'literatiType',
            onDelete: 'CASCADE',
        });

        // Uncomment the following when you implement User Authentication
        // LiteratiType.hasMany(models.User, {
        //     foreignKey: 'literatiType',
        //     onDelete: 'CASCADE',
        // });
    };
    return LiteratiType;
};
