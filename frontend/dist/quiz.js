const quizContainer = document.querySelector('.quiz-container');
const questionElement = quizContainer.querySelector('.question-text');

let questionsData = []; // Array to hold fetched questions from the server
let currentQuestionIndex = 0;
let selectedAnswers = []; // Array to hold the user's selected answers from radio inputs (checked inputs)

const literatiTypes = [
    {
        literatiType: 'Cool Connoisseur',
        code: 'cc',
        imageUrl: '/literati_profile_images/Cool_Connoisseur_with_book.png',
        description: 'Description for Cool Connoisseur here',
    },
    {
        literatiType: 'Evolving Egghead',
        code: 'ee',
        imageUrl: '/literati_profile_images/Evolving_Egghead_with_book.png',
        description: 'Description for Evolving Egghead here',
    },
    {
        literatiType: 'Budding Bookworm',
        code: 'bb',
        imageUrl: '/literati_profile_images/Budding_Bookworm_with_book.png',
        description: 'Description for Budding Bookworm here',
    },
    {
        literatiType: 'Perpetual Peruser',
        code: 'pp',
        imageUrl: '/literati_profile_images/Perpetual_Peruser_with_book.png',
        description: 'Description for Perpetual Peruser here',
    },
    {
        literatiType: 'Looney Literati',
        code: 'll',
        imageUrl: '/literati_profile_images/Looney_Literati_with_book.png',
        description: 'Description for Looney Literati here',
    },
];

const optionsList = quizContainer.querySelector('.options-list');

//  Function to fetch quiz questions  from backend using axios
async function fetchQuestions() {
    try {
        const response = await axios.get(
            'http://localhost:3000/quiz/questions'
        );
        questionsData = response.data;
        showQuestion(currentQuestionIndex); // Shows the first question after the questions have all been retrieved

        // Creates a progress bar after fetching questions and showing the first question:
        const progressBarContainer = document.createElement('div');
        progressBarContainer.classList.add('progress');
        progressBarContainer.style.height = '20px';
        progressBarContainer.style.marginTop = '10px';
        progressBarContainer.style.marginBottom = '10px';

        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        progressBar.role = 'progressbar';
        progressBar.style.width = '0%';
        progressBar.setAttribute('aria-valuenow', '0');
        progressBar.setAttribute('aria-valuemin', '0');
        progressBar.setAttribute('aria-valuemax', '100');
        progressBar.textContent = '0%';

        window.globalProgressBar = progressBar;

        progressBarContainer.appendChild(progressBar);

        // Inserts the progress bar right after the optionsList:
        optionsList.after(progressBarContainer);

        // Add a single event listener to the radio input
        optionsList.addEventListener('change', (event) => {
            const selectedValue = event.target.value;
            const literatiType = event.target.getAttribute('literatiType');
            const code = event.target.getAttribute('code');

            handleOptionSelect(
                currentQuestionIndex + 1, // Increment the index by 1 to match the question number
                selectedValue,
                literatiType,
                code
            );
        });
    } catch (error) {
        console.error('Error fetching questions: ', error);
    }
}

//  Function to display the current question and its options
function showQuestion(index) {
    const currentQuestion = questionsData[index];
    const { questionText, options, imageUrl, alt, credit } = currentQuestion;

    // Updates the question text in the HTML:
    questionElement.textContent = questionText;

    // Handle the image associated with the question:
    let questionImageContainer = document.querySelector(
        '.question-image-container'
    );
    if (!questionImageContainer) {
        questionImageContainer = document.createElement('div');
        questionImageContainer.classList.add('question-image-container');

        // Insert the image container right after the questionElement:
        questionElement.after(questionImageContainer);
    }

    // Populate the questionImageContainer with the image and credit:
    questionImageContainer.innerHTML = `
        <img src="${imageUrl}" alt="${alt}" class="question-image"/>
        <p>Image Credit: ${credit}</p>
    `;

    // Updates the options in the HTML
    optionsList.innerHTML = ''; // Clear existing options

    options.forEach((option) => {
        const optionElement = document.createElement('li');
        optionElement.innerHTML = `
            <label>
                <input
                    type="radio"
                    name="question-${currentQuestion.questionNumber}" 
                    code="${option.code}"
                    literatiType="${option.literatiType}"
                    value="${option.optionText}"
                    required
                />
                ${option.optionText}
            </label>
        `;
        optionsList.appendChild(optionElement);
    });
}

// Function to handle the selection of an option:
function handleOptionSelect(questionNumber, optionText, literatiType, code) {
    const selectedAnswer = {
        questionNumber,
        optionText,
        literatiType,
        code,
    };

    // Finds the index of an existing answer for the current questoin, if it exists
    const existingAnswerIndex = selectedAnswers.findIndex(
        (answer) => answer.questionNumber === questionNumber
    );

    if (existingAnswerIndex !== -1) {
        // Update the existing answer
        selectedAnswers[existingAnswerIndex] = selectedAnswer;
    } else {
        // Add the new answer to the array
        selectedAnswers.push(selectedAnswer);
    }

    console.log('Question Number: ', questionNumber); // Log the question index
    console.log('Selected Value: ', optionText);
    console.log('Literati Type: ', literatiType);
    console.log('Code: ', code);
}

//  Function to update progress bar:
function updateProgressBar() {
    const progressBar = window.globalProgressBar;
    if (!progressBar) {
        console.error('Progress bar is not initialized.');
        return;
    }

    const progressPercentage =
        (currentQuestionIndex / questionsData.length) * 100;

    progressBar.style.width = `${progressPercentage}%`;
    progressBar.setAttribute('aria-valuenow', progressPercentage);
    progressBar.textContent = `${Math.round(progressPercentage)}%`;
}

// Function to handle the "Next" button click:
function nextQuestionNavigation() {
    // Get the radio inputs for the current question
    const radios = document.getElementsByName(
        `question-${questionsData[currentQuestionIndex].questionNumber}`
    );
    let selectedValue = null;

    // Loop through radio options to find the selected one
    for (const radio of radios) {
        if (radio.checked) {
            selectedValue = radio.value;
            break; // Once found, exit the loop
        }
    }

    if (selectedValue !== null) {
        // Only proceeds if a selection has been made
        const currentQuestion = questionsData[currentQuestionIndex];
        const literatiType = currentQuestion.options.find(
            (option) => option.optionText === selectedValue
        ).literatiType;

        currentQuestionIndex++;

        if (currentQuestionIndex < questionsData.length) {
            // Show the next question:
            showQuestion(currentQuestionIndex);
            updateProgressBar();
        } else {
            updateProgressBar(); // Updates the progress bar to 100%
            // Reached the end of the questions, so DISABLE the "Next" button and then show the "Submit" button
            const nextButton = document.querySelector('.next-button');
            // Remember that the disabled attribute is a property iof the <button> element in HTML
            nextButton.disabled = true;

            const submitButton = document.createElement('button');
            submitButton.classList.add('submit-button');
            submitButton.textContent = 'Submit';
            nextButton.replaceWith(submitButton);

            submitButton.addEventListener('click', submitQuiz);
        }
    } else {
        console.log('Please select an option before proceeding.');
    }
}

//  Function to handle "Previous" button click:
function previousQuestionNavigation() {
    // Get the radio inputs for the current question
    const radios = document.getElementsByName(
        `question-${questionsData[currentQuestionIndex].questionNumber}`
    );
    let selectedValue = null;

    // Loop through radio options to find the selected one
    for (const radio of radios) {
        if (radio.checked) {
            selectedValue = radio.value;
            break; // Once found, exit the loop
        }
    }

    if (selectedValue !== null) {
        const currentQuestion = questionsData[currentQuestionIndex];
        const literatiType = currentQuestion.options.find(
            (option) => option.optionText === selectedValue
        ).literatiType;
    }

    currentQuestionIndex--;

    if (currentQuestionIndex >= 0) {
        // Show the previous question by allowing the function call
        showQuestion(currentQuestionIndex);
        updateProgressBar();
    } else {
        // Already at the first question, do nothing
        currentQuestionIndex = 0;
        console.log("You're already at the first question.");
    }
}

// Function to handle the "Submit" button click (optional)
function submitQuiz() {
    // Call the function to calculate the user result:
    const calculatedResult = calculateUserResult();

    console.log('These are the selected answers: ', selectedAnswers);

    //  Loop through each question's radio options
    for (const question of questionsData) {
        const radios = document.getElementsByName(
            `question-${question.questionNumber}`
        );
    }
    // Validate each selected answer
    const isValid = selectedAnswers.every((answer) => {
        return (
            answer.questionNumber &&
            answer.optionText &&
            answer.literatiType &&
            answer.code
        );
    });

    if (!isValid) {
        console.error(
            'One or more answers are missing necessary fields. Cannot proceed.'
        );
        return;
    }

    axios
        .post('http://localhost:3000/quiz/answers', selectedAnswers) // Send the selected answers to the server
        .then((response) => {
            // Handle the response form the server + display the result to the user!
            // Debug scripts:
            console.log('Entire Server response: ', response);
            console.log('Server result: ', response.data.result);
            const serverResultString = response.data.result;
            if (!serverResultString) {
                console.error(
                    'Server did not return a result. Using client-side calculated result.'
                );
            }
            const serverResultObject = literatiTypes.find(
                (type) => type.literatiType == serverResultString
            );
            const finalResult = serverResultObject
                ? serverResultObject
                : calculatedResult;
            console.log('This is the FINAL RESULT:', finalResult);
            if (!finalResult) {
                console.error(
                    'Unable to determine your Literati type. Please try again.'
                );
            }
            // Pass the calculated finalResult to the showResult function (separation of concerns):
            showResult(finalResult);
        })
        .catch((error) => {
            console.error('Try again. Quiz submission error: ', error);
        });
}

// Calculates the user's results based on their answers:
function calculateUserResult() {
    // Creates and uses an object to count the selections for each literatiType:
    const typeCounts = {};
    selectedAnswers.forEach((answer) => {
        if (!typeCounts[answer.literatiType]) {
            typeCounts[answer.literatiType] = 0;
        }
        typeCounts[answer.literatiType]++;
    });
    // Identifies the literatiType with the highest count:
    let maxCount = 0;
    let maxTypeCode = null;
    for (const typeCode in typeCounts) {
        if (typeCounts[typeCode] > maxCount) {
            maxCount = typeCounts[typeCode];
            maxTypeCode = typeCode;
        }
        console.log(
            `Type code: ${typeCode}, Count: ${typeCounts[typeCode]}, Max Type Code: ${maxTypeCode}`
        );
    }

    // Find the corresponding literati type object using the maxTypeCode and return it
    const userResult = literatiTypes.find((type) => type.code === maxTypeCode);
    return userResult;
    // console.log('This is the userResult:', userResult);
}

//  Function to display the result of the quiz answers:
function showResult(userResult) {
    // console.log('Inside showResult function with userResult:', userResult);

    // Displays the user's results based on their answers
    const resultContainer = document.createElement('div');
    // ADD STYLING
    resultContainer.classList.add('result-container');
    // Displays the user's result along with the respective image:
    // console.log(`THis is the resultContainer: ${userResult}`);
    if (userResult && userResult.literatiType && userResult.imageUrl) {
        resultContainer.innerHTML = `
		<h2>Your Literati persona is the:</h2>
		<p>${userResult.literatiType}</p>
		<img src="http://localhost:3000/static${userResult.imageUrl}" alt = "${userResult.literatiType}" />
		`;
        quizContainer.appendChild(resultContainer);
    } else {
        resultContainer.textContent = 'Unable to determine your result';
    }
}

// Attaches event listerns to the navigation buttons:
const previousButton = document.querySelector('.previous-button');
const nextButton = document.querySelector('.next-button');
// const submitButton = document.querySelector('.submit-button');

previousButton.addEventListener('click', previousQuestionNavigation);
nextButton.addEventListener('click', nextQuestionNavigation);

// Fetch questions on page load:
fetchQuestions();
