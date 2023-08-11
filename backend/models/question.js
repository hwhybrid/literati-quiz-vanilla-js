const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const Question = sequelize.define('Question', {
		questionId: {  // Define the primary key explicitly as 'questionId'
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, // Set it as primary key
            autoIncrement: true, // Enable auto-increment
        },
        questionNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        alt: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        credit: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        questionText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    Question.associate = (models) => {
        Question.hasMany(models.Option, {
            foreignKey: 'questionId',
            as: 'options',
        });
    };

    return Question;
};
