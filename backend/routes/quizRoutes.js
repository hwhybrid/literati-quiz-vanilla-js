// import express library
const express = require('express');
// Crate an instance of the router to be exported:
const router = express.Router();

// Import the controllers:
const quizController = require('../controllers/quizController');
const literatiTypeController = require('../controllers/literatiTypeController');
const literatiTypesData = require('../../shared/literatiTypesData');
// const submissionController = require('./controllers/submissionController');

// Defines the route for fetching questions:
router.get('/questions', quizController.getQuestions);

//  Defines the route for posting the answers:
router.post('/answers', quizController.postAnswers);

// Defines the route for fetching literati types:
router.get('/literati-types', literatiTypeController.getLiteratiTypes);

// Express route to serve the data to the frontend (since I'm not using webpack, for now)
router.get('/literati-data', (req, res) => {
    res.json(literatiTypesData);
});


//  Defines the route for deleting a submission:

// router.delete('/answers/:id', submissionController.deleteSubmission);
//  Exports the router:
module.exports = router;
