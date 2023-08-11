// Import the required modules
const { Sequelize, DataTypes } = require('sequelize');

// Import the models
const QuestionModel = require('./models/question');
const OptionModel = require('./models/option');
const AnswerModel = require('./models/answer');
const SeedingStatusModel = require('./models/seedingStatus');
const LiteratiTypeModel = require('./models/literatiType');

// Set up the Sequelize instance
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// Initialize the models and associate them
const Question = QuestionModel(sequelize, DataTypes);
const Option = OptionModel(sequelize, DataTypes);
const Answer = AnswerModel(sequelize, DataTypes);
const SeedingStatus = SeedingStatusModel(sequelize, DataTypes);
const LiteratiType = LiteratiTypeModel(sequelize, DataTypes);

// Define the associations
Question.hasMany(Option, {
    foreignKey: 'questionId',
    as: 'options',
});

Option.belongsTo(Question, {
    foreignKey: 'questionId',
    onDelete: 'CASCADE',
});

Option.belongsTo(LiteratiType, {
    foreignKey: 'literatiType',
    onDelete: 'CASCADE',
});
Answer.belongsTo(Question, {
    foreignKey: 'questionId',
    onDelete: 'CASCADE',
});

Answer.belongsTo(Option, {
    foreignKey: 'optionId',
    onDelete: 'CASCADE',
});
Answer.belongsTo(LiteratiType, {
    // Add this association
    foreignKey: 'literatiType',
    onDelete: 'CASCADE',
});
// Export the Sequelize instance and the models
module.exports = {
    sequelize,
    Question,
    Option,
    Answer,
    SeedingStatus,
    LiteratiType,
};
