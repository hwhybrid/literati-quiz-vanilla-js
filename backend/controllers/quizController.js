// Import the models
const { Question, Option, Answer, LiteratiType } = require('../models');
const literatiTypes = require('../../shared/literatiTypesData');

// console.log('These are the imported literatiTypes :', literatiTypes);

// Controller for fetching the questions:
exports.getQuestions = async (req, res) => {
    try {
        console.log('Fetching questions...');
        const questions = await Question.findAll({
            include: [
                {
                    model: Option,
                    as: 'options',
                },
            ],
        });
        // console.log('Questions fetched successfully: ', questions);
        res.json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'An error occurred while fetching the questions',
        });
    }
};
// Controller for posting the answers:
exports.postAnswers = async (req, res) => {
    try {
        const answers = req.body; // This is an array of answers from the client side
        console.log('Here are the answers: ', answers);
        console.log('Received answers payload:', req.body);

        // Validate Answers
        if (!Array.isArray(answers)) {
            return res
                .status(400)
                .json({ error: 'Expected an array of answers' });
        }
        // Further validation to ensure every answer has the necessary fields
        const isValid = answers.every((answer) => {
            return (
                answer.questionNumber &&
                answer.optionText &&
                answer.literatiType &&
                answer.code
            );
        });

        if (!isValid) {
            return res.status(400).json({
                error: 'One or more answers are missing necessary fields.',
            });
        }

        // Save the answers to the database
        const savedAnswers = await Promise.all(
            answers.map((answer) =>
                Answer.create({
                    questionNumber: answer.questionNumber,
                    optionText: answer.optionText,
                    literatiType: answer.literatiType,
                    code: answer.code,
                })
            )
        );

        // Count the occurrences of each literatiType
        const literatiCodeCounts = {};
        savedAnswers.forEach((answer) => {
            const { code } = answer;
            if (!literatiCodeCounts[code]) {
                literatiCodeCounts[code] = 0;
            }
            literatiCodeCounts[code]++;
        });

        console.log('Literati Code Counts:', literatiCodeCounts);

        // Find the literati type with the maximum count
		let dominantLiteratiCode = "";
        let maxCount = 0;
        for (const code in literatiCodeCounts) {
            if (literatiCodeCounts[code] > maxCount) {
                maxCount = literatiCodeCounts[code];
                dominantLiteratiCode = code;
            }
        }
		console.log('Determined Dominant Literati Code:', dominantLiteratiCode);

        // Find the corresponding literati type object using the dominantLiteratiCode
        const dominantLiteratiObject = literatiTypes.find(type => type.code === dominantLiteratiCode);
		
		const dominantLiteratiType = dominantLiteratiObject ? dominantLiteratiObject.literatiType : null;
		
        console.log('Determined Dominant Literati Type:', dominantLiteratiType);


        // Send a response back to the client:
        console.log('Sending response:', {
            result: dominantLiteratiType,
        });
        res.json({
            result: dominantLiteratiType,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'An error occurred while recording the answers.',
        });
    }
};
