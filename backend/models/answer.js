const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Answer = sequelize.define('Answer', {
        questionNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
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

    Answer.associate = (models) => {
        Answer.belongsTo(models.Question, {
            foreignKey: 'questionId',
            onDelete: 'CASCADE',
        });
        Answer.belongsTo(models.Option, {
            foreignKey: 'optionId',
            onDelete: 'CASCADE',
        });
        // Uncomment the following when you implement User Authentication
        // Answer.belongsTo(models.User, {
        //     foreignKey: 'userId',
        //     onDelete: 'CASCADE',
        // });
    };

    return Answer;
};
