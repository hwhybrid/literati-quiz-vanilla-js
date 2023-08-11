// models/index.js
const { sequelize, Question, Option, Answer } = require('../sequelize');

module.exports = {
    Question,
    Option,
    Answer,
    sequelize, // Exports the Sequelize instance
};
