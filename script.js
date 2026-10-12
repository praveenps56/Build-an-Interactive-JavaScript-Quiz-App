const questions = [
    {
        question: "Which language is used to add interactivity to web pages?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        correctAnswer: "JavaScript"
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correctAnswer: "<a>"
    },
    {
        question: "Which keyword declares a block-scoped variable?",
        options: ["var", "let", "define", "dim"],
        correctAnswer: "let"
    },
    {
        question: "Which method selects an element by its ID?",
        options: [
            "querySelectorAll()",
            "getElementsByClassName()",
            "getElementById()",
            "getElementsByTagName()"
        ],
        correctAnswer: "getElementById()"
    },
    {
        question: "Which symbol is used for strict equality in JavaScript?",
        options: ["=", "==", "===", "!="],
        correctAnswer: "==="
    },
    {
        question: "Which method adds an element to the end of an array?",
        options: ["pop()", "push()", "shift()", "slice()"],
        correctAnswer: "push()"
    },
    {
        question: "Which CSS property changes text color?",
        options: ["background", "font-style", "text-color", "color"],
        correctAnswer: "color"
    },
    {
        question: "Which event occurs when a user clicks an element?",
        options: ["onchange", "onmouseover", "onclick", "onload"],
        correctAnswer: "onclick"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const quiz = document.getElementById("quiz");

// Render the current question dynamically.
function showQuestion() {
    answered = false;
    quiz.innerHTML = "";

    const currentQuestion = questions[currentQuestionIndex];

    const progress = document.createElement("p");
    progress.id = "progress";
    progress.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    const questionText = document.createElement("h2");
    questionText.id = "question";
    questionText.textContent = currentQuestion.question;

    const optionsContainer = document.createElement("div");
    optionsContainer.id = "options";

    const feedback = document.createElement("p");
    feedback.id = "feedback";
    feedback.setAttribute("aria-live", "polite");

    // Create four answer buttons using DOM methods.
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");

        button.classList.add("option-btn");
        button.textContent = option;

        button.addEventListener("click", () => {
            selectAnswer(button, option, feedback);
        });

        optionsContainer.appendChild(button);
    });

    const nextButton = document.createElement("button");
    nextButton.id = "next-btn";
    nextButton.classList.add("action-btn");
    nextButton.textContent = "Next Question";
    nextButton.disabled = true;
    nextButton.hidden = true;

    nextButton.addEventListener("click", nextQuestion);

    quiz.append(
        progress,
        questionText,
        optionsContainer,
        feedback,
        nextButton
    );
}

// Check the selected answer.
function selectAnswer(selectedButton, selectedOption, feedback) {
    if (answered) return;

    answered = true;

    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll(".option-btn");

    // Prevent additional answers after the first selection.
    optionButtons.forEach(button => {
        button.disabled = true;

        if (button.textContent === currentQuestion.correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
        feedback.textContent = "Correct! Well done.";
        feedback.style.color = "#16a34a";
    } else {
        selectedButton.classList.add("wrong");
        feedback.textContent =
            `Incorrect! The correct answer is: ${
                currentQuestion.correctAnswer
            }`;
        feedback.style.color = "#dc2626";
    }

    const nextButton = document.getElementById("next-btn");
    nextButton.disabled = false;
    nextButton.hidden = false;

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = "View Final Score";
    }
}

// Move to the next question or show the final score.
function nextQuestion() {
    if (!answered) return;

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showFinalScore();
    }
}

// Display the final score and feedback.
function showFinalScore() {
    quiz.innerHTML = "";

    const percentage = (score / questions.length) * 100;

    let message;

    if (percentage === 100) {
        message = "Perfect score! Outstanding work!";
    } else if (percentage >= 75) {
        message = "Great job! You know your stuff!";
    } else if (percentage >= 50) {
        message = "Good effort! Keep practicing!";
    } else {
        message = "Keep learning! You'll do better next time!";
    }

    const finalScreen = document.createElement("div");
    finalScreen.id = "final-score";

    const heading = document.createElement("h2");
    heading.textContent = "Quiz Completed!";

    const result = document.createElement("p");
    result.textContent =
        `You scored ${score} out of ${questions.length} — ${message}`;

    const restartButton = document.createElement("button");
    restartButton.classList.add("action-btn");
    restartButton.textContent = "Restart Quiz";
    restartButton.addEventListener("click", restartQuiz);

    finalScreen.append(heading, result, restartButton);
    quiz.appendChild(finalScreen);
}

// Reset the quiz and start again.
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answered = false;

    showQuestion();
}

// Start the quiz.
showQuestion();