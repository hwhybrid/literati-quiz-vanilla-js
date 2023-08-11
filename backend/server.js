// Load environment variables from .env file
require('dotenv').config();
// Import express library:
const express = require('express');
// Import configured sequelize:
const { sequelize } = require('./sequelize');

// Cross Origin Resource Sharing
const cors = require('cors');

// Create an instance of express:
const app = express();

const path = require('path');
// Import the routes:
const quizRoutes = require('./routes/quizRoutes');
// USE CORS and JSON middlewares:
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..')));

//  Serve files from the frontend/dist folder:
app.use('/dist', express.static(path.join(__dirname, '../frontend/dist')));

//  Serve static files from the public folder:
app.use('/static', express.static(path.join(__dirname, '../public'))); // express.static ..middleware ..check express docs


//  Use the quiz routes:
app.use('/quiz', quizRoutes);

//  This is a promise-based authenticate() method to instantiate a database connection to this app.
// The .then() and  .catch() will test if the credentials are correct.
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection successfully established');
    })
    .catch((error) => {
        console.error('Unable to connect to the database', error);
    });

// Function to create the database if it doesn't exist:
async function createDatabase() {
    try {
        await sequelize.sync({ force: true }); // 'force: false' will not drop existing tables
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing the database', error);
    }
}

// Automatic seeding during server startup
async function seedDatabase() {
    //  Import the seedQuestions file and run it to seed the database
    try {
        // Seed Literati Types first
        const seedLiteratiType = require('./seeds/seedLiteratiTypes');
        await seedLiteratiType();

        const seedQuestions = require('./seeds/seedQuestions');
        await seedQuestions();

        console.log('Database seeding completed successfully');
    } catch (error) {
        console.error('Error seeding the database', error);
        process.exit(1); // Exits the script with an error code if there's an error during seeding.
    }
}

// Calls the createDatabase and seedDatabase functions before starting the server
(async () => {
    try {
        await createDatabase();
        await seedDatabase();
        const port = process.env.SERVER_PORT || 3000;
        app.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (error) {
        console.error('Error starting the server', error);
    }
})();

// Explicitly log a message after the tables have been synced
console.log('Database tables are ready for use!');
