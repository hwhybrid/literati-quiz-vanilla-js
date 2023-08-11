const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Option = sequelize.define('Option', {
        optionText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        literatiType: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'LiteratiTypes', 
                key: 'literatiType'
            }
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'LiteratiTypes', 
                key: 'code'
            }
        }
    });

    Option.associate = (models) => {
        Option.belongsTo(models.Question, {
            foreignKey: 'questionId',
            onDelete: 'CASCADE',
        });
        Option.belongsTo(models.LiteratiType, {
            foreignKey: 'literatiType',
            onDelete: 'CASCADE',
        });
    };

    return Option;
};
