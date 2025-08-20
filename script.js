/**
 * --------------------------------------------------------------------
 * Configuration and State Management
 * --------------------------------------------------------------------
 */

// Grouping DOM elements for cleaner access and organization
const domElements = {
    startScreen: document.getElementById('start-screen'),
    quizScreen: document.getElementById('quiz-screen'),
    resultScreen: document.getElementById('result-screen'),
    startBtn: document.getElementById('start-btn'),
    questionText: document.getElementById('question-text'),
    answerButtons: document.getElementById('answer-buttons'),
    timer: document.getElementById('timer'),
    progressBar: document.getElementById('progress-bar'),
    resultMessage: document.getElementById('result-message'),
    streakCount: document.getElementById('streak-count'),
    streakIcon: document.querySelector('.streak-icon'),
};

// Grouping constants for easy configuration
const config = {
    TIME_PER_QUESTION: 30,
    WINNING_STREAK: 5,
    NEXT_QUESTION_DELAY: 1500, // ms
};

// Centralized state for the quiz
const quizState = {
    currentQuestionIndex: 0,
    streak: 0,
    timer: null,
    shuffledQuestions: [],
};

// ===================================================================================
//  QUESTION DATABASE
//  To use your own questions, simply replace the content of this 'questions' array.
//  Ensure each question object has:
//  1. A 'question' string.
//  2. An 'answers' array of objects, where each object has:
//     a. A 'text' string (the answer option).
//     b. A 'correct' boolean (true for the correct answer, false otherwise).
// ===================================================================================
const questions = [
    {
        question: "What does 'API' stand for in software development?",
        answers: [
            { text: "Application Programming Interface", correct: true },
            { text: "Automated Program Interaction", correct: false },
            { text: "Application Process Integration", correct: false },
            { text: "Advanced Programming Interface", correct: false }
        ]
    },
    {
        question: "In object-oriented programming, what is encapsulation?",
        answers: [
            { text: "The process of creating child classes from a parent class.", correct: false },
            { text: "The bundling of data with the methods that operate on that data.", correct: true },
            { text: "The ability of an object to take on many forms.", correct: false },
            { text: "The process of hiding the implementation details of a class.", correct: false }
        ]
    },
    {
        question: "Which of these is a popular version control system?",
        answers: [
            { text: "Docker", correct: false },
            { text: "Kubernetes", correct: false },
            { text: "Git", correct: true },
            { text: "Jenkins", correct: false }
        ]
    },
    {
        question: "What is the primary purpose of a 'pull request' in platforms like GitHub?",
        answers: [
            { text: "To download code from a repository.", correct: false },
            { text: "To propose changes to a repository for review.", correct: true },
            { text: "To force an update to the main branch.", correct: false },
            { text: "To delete a branch.", correct: false }
        ]
    },
    {
        question: "Which data structure operates on a Last-In, First-Out (LIFO) principle?",
        answers: [
            { text: "Queue", correct: false },
            { text: "Linked List", correct: false },
            { text: "Stack", correct: true },
            { text: "Tree", correct: false }
        ]
    },
    // Add 25 more questions to reach 30
    { question: "What does 'HTTP' stand for?", answers: [{ text: "HyperText Transfer Protocol", correct: true }, { text: "High-Level Text Protocol", correct: false }, { text: "Hyperlink Text Transfer Protocol", correct: false }, { text: "Home Tool Transfer Protocol", correct: false }] },
    { question: "Which programming language is often used for machine learning?", answers: [{ text: "Java", correct: false }, { text: "Python", correct: true }, { text: "C#", correct: false }, { text: "PHP", correct: false }] },
    { question: "What is 'agile' in the context of software development?", answers: [{ text: "A specific programming language.", correct: false }, { text: "A type of database.", correct: false }, { text: "An iterative approach to project management.", correct: true }, { text: "A hardware specification.", correct: false }] },
    { question: "What does 'SQL' stand for?", answers: [{ text: "Structured Query Language", correct: true }, { text: "Simple Query Logic", correct: false }, { text: "Standard Question Language", correct: false }, { text: "Scripted Query Language", correct: false }] },
    { question: "What is the function of a compiler?", answers: [{ text: "To execute code line by line.", correct: false }, { text: "To translate source code into machine code.", correct: true }, { text: "To debug code.", correct: false }, { text: "To manage project dependencies.", correct: false }] },
    { question: "What is a 'cloud-native' application?", answers: [{ text: "An application that only runs on a specific cloud provider.", correct: false }, { text: "An application designed to run in a cloud computing environment.", correct: true }, { text: "An application that requires no internet.", correct: false }, { text: "A legacy application moved to the cloud.", correct: false }] },
    { question: "What is the time complexity of a binary search algorithm?", answers: [{ text: "O(n)", correct: false }, { text: "O(log n)", correct: true }, { text: "O(n^2)", correct: false }, { text: "O(1)", correct: false }] },
    { question: "Which of the following is NOT a principle of SOLID design?", answers: [{ text: "Single Responsibility", correct: false }, { text: "Open/Closed", correct: false }, { text: "Liskov Substitution", correct: false }, { text: "Rapid Development", correct: true }] },
    { question: "What is 'DevOps'?", answers: [{ text: "A specific software tool.", correct: false }, { text: "A set of practices that combines software development and IT operations.", correct: true }, { text: "A new programming language.", correct: false }, { text: "A type of server hardware.", correct: false }] },
    { question: "What is the main advantage of using an SSD over an HDD?", answers: [{ text: "Higher storage capacity.", correct: false }, { text: "Lower cost per gigabyte.", correct: false }, { text: "Faster data access speeds.", correct: true }, { text: "Longer lifespan.", correct: false }] },
    { question: "What is the purpose of a 'firewall' in network security?", answers: [{ text: "To monitor and control incoming and outgoing network traffic.", correct: true }, { text: "To speed up internet connection.", correct: false }, { text: "To store user passwords.", correct: false }, { text: "To cool down the server.", correct: false }] },
    { question: "What is 'Moore's Law'?", answers: [{ text: "A law about network speed.", correct: false }, { text: "An observation that the number of transistors in an integrated circuit doubles about every two years.", correct: true }, { text: "A principle of software design.", correct: false }, { text: "A law governing data encryption.", correct: false }] },
    { question: "In web development, what does 'CSS' stand for?", answers: [{ text: "Cascading Style Sheets", correct: true }, { text: "Creative Style System", correct: false }, { text: "Computer Style Syntax", correct: false }, { text: "Colorful Style Sheets", correct: false }] },
    { question: "What is a 'race condition' in concurrent programming?", answers: [{ text: "When two threads compete to finish first.", correct: false }, { text: "A situation where the system's behavior depends on the sequence or timing of uncontrollable events.", correct: true }, { text: "A bug that only occurs in racing games.", correct: false }, { text: "When a program runs too fast.", correct: false }] },
    { question: "What is the primary function of an Operating System (OS)?", answers: [{ text: "To run web browsers.", correct: false }, { text: "To manage computer hardware and software resources.", correct: true }, { text: "To provide a programming environment.", correct: false }, { text: "To secure the computer from viruses.", correct: false }] },
    { question: "What is 'Big O Notation' used for?", answers: [{ text: "To describe the performance or complexity of an algorithm.", correct: true }, { text: "To denote the size of a variable.", correct: false }, { text: "To calculate the exact running time of a program.", correct: false }, { text: "To define object-oriented classes.", correct: false }] },
    { question: "What is a 'microservice architecture'?", answers: [{ text: "A small, monolithic application.", correct: false }, { text: "An architectural style that structures an application as a collection of loosely coupled services.", correct: true }, { text: "A design pattern for mobile apps.", correct: false }, { text: "A way to build very small websites.", correct: false }] },
    { question: "What does 'IoT' stand for?", answers: [{ text: "Internet of Things", correct: true }, { text: "Internet of Technology", correct: false }, { text: "Input/Output Transfer", correct: false }, { text: "Internal Object Tracking", correct: false }] },
    { question: "Which of these is a key-value database?", answers: [{ text: "MySQL", correct: false }, { text: "PostgreSQL", correct: false }, { text: "Redis", correct: true }, { text: "Oracle", correct: false }] },
    { question: "What is the purpose of the 'finally' block in a try-catch-finally statement?", answers: [{ text: "To execute code only if an exception occurs.", correct: false }, { text: "To execute code regardless of whether an exception was thrown or caught.", correct: true }, { text: "To declare final variables.", correct: false }, { text: "To catch the final exception in a chain.", correct:false }] },
    { question: "What is 'refactoring'?", answers: [{ text: "Adding new features to the code.", correct: false }, { text: "Restructuring existing computer code without changing its external behavior.", correct: true }, { text: "Debugging code.", correct: false }, { text: "Rewriting code from scratch.", correct: false }] },
    { question: "What is the difference between 'let' and 'const' in JavaScript?", answers: [{ text: "'let' is for numbers, 'const' is for strings.", correct: false }, { text: "'const' variables cannot be reassigned, while 'let' variables can.", correct: true }, { text: "'let' is block-scoped, 'const' is function-scoped.", correct: false }, { text: "There is no difference.", correct: false }] },
    { question: "What is a 'DNS' server's primary role?", answers: [{ text: "To host websites.", correct: false }, { text: "To translate domain names to IP addresses.", correct: true }, { text: "To send emails.", correct: false }, { text: "To secure network connections.", correct: false }] },
    { question: "What is 'virtualization'?", answers: [{ text: "Creating a virtual version of something, such as a server, desktop, or network.", correct: true }, { text: "A type of 3D modeling.", correct: false }, { text: "A software development methodology.", correct: false }, { text: "A way to increase internet speed.", correct: false }] },
    { question: "What is the 'stack' in the context of memory management?", answers: [{ text: "A region of memory where dynamic memory allocation takes place.", correct: false }, { text: "A region of memory where static memory allocation takes place for function calls and local variables.", correct: true }, { text: "A data structure for storing files.", correct: false }, { text: "A cache for the CPU.", correct: false }] }
];

/**
 * --------------------------------------------------------------------
 * Core Functions
 * --------------------------------------------------------------------
 */

// A robust shuffle algorithm (Fisher-Yates) for true randomness
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // ES6 element swap
    }
    return array;
}

// Initializes and starts the quiz
function startQuiz() {
    quizState.shuffledQuestions = shuffleArray([...questions]);
    quizState.currentQuestionIndex = 0;
    quizState.streak = 0;

    domElements.startScreen.classList.remove('active');
    domElements.resultScreen.classList.remove('active');
    domElements.quizScreen.classList.add('active');

    showNextQuestion();
    updateStreakDisplay();
}

// Displays the next question or ends the quiz
function showNextQuestion() {
    resetState();
    if (quizState.currentQuestionIndex >= quizState.shuffledQuestions.length) {
        endQuiz(false); // Failed if they reach the end
        return;
    }

    const question = quizState.shuffledQuestions[quizState.currentQuestionIndex];
    domElements.questionText.innerText = question.question;

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = "true";
        }
        button.addEventListener('click', selectAnswer);
        domElements.answerButtons.appendChild(button);
    });

    updateProgressBar();
    startTimer();
}

// Handles user's answer selection
function selectAnswer(e) {
    clearInterval(quizState.timer);
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        quizState.streak++;
        selectedButton.classList.add('correct');
    } else {
        quizState.streak = 0;
        selectedButton.classList.add('wrong');
    }

    Array.from(domElements.answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct) {
            button.classList.add('correct');
        }
    });

    updateStreakDisplay();

    if (quizState.streak >= config.WINNING_STREAK) {
        setTimeout(() => endQuiz(true), config.NEXT_QUESTION_DELAY);
    } else {
        setTimeout(moveToNext, config.NEXT_QUESTION_DELAY);
    }
}

/**
 * --------------------------------------------------------------------
 * Helper and Utility Functions
 * --------------------------------------------------------------------
 */

// Resets the state for the next question
function resetState() {
    clearTimeout(quizState.timer);
    while (domElements.answerButtons.firstChild) {
        domElements.answerButtons.removeChild(domElements.answerButtons.firstChild);
    }
    domElements.timer.classList.remove('low-time');
}

// Starts the countdown timer for a question
function startTimer() {
    let timeLeft = config.TIME_PER_QUESTION;
    domElements.timer.innerText = timeLeft;
    quizState.timer = setInterval(() => {
        timeLeft--;
        domElements.timer.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(quizState.timer);
            handleTimeOut();
        }
        if (timeLeft <= 10) {
            domElements.timer.classList.add('low-time');
        }
    }, 1000);
}

// Handles the case where the timer runs out
function handleTimeOut() {
    quizState.streak = 0; // Break the streak
    Array.from(domElements.answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct) {
            button.classList.add('correct');
        }
    });
    updateStreakDisplay();
    setTimeout(moveToNext, config.NEXT_QUESTION_DELAY);
}

// Moves to the next question
function moveToNext() {
    quizState.currentQuestionIndex++;
    showNextQuestion();
}

// Ends the quiz and displays the result
function endQuiz(isPassed) {
    domElements.quizScreen.classList.remove('active');
    domElements.resultScreen.classList.add('active');
    if (isPassed) {
        domElements.resultMessage.innerText = "Congratulations! You passed the quiz.";
    } else {
        domElements.resultMessage.innerText = "Sorry, you failed the quiz.";
    }
}

// Updates the visual progress bar
function updateProgressBar() {
    const progressPercent = ((quizState.currentQuestionIndex + 1) / quizState.shuffledQuestions.length) * 100;
    domElements.progressBar.style.width = `${progressPercent}%`;
}

// Updates the streak counter display
function updateStreakDisplay() {
    domElements.streakCount.innerText = quizState.streak;
    if (quizState.streak > 0) {
        domElements.streakIcon.classList.add('active-streak');
    } else {
        domElements.streakIcon.classList.remove('active-streak');
    }
}

// Initial event listener
domElements.startBtn.addEventListener('click', startQuiz);