const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');
const timerSound = new Audio('timer.mp3');

let questions = [
    { question: "What is the capital of France?", answers: ["Paris", "London", "Rome", "Berlin"], correct: 0, hint: "It's known as the city of love." },
    { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Venus", "Mars", "Jupiter"], correct: 2, hint: "It has a reddish appearance due to iron oxide." },
    { question: "Who painted the Mona Lisa?", answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"], correct: 2, hint: "He also designed early flying machines." },
    { question: "What is the largest ocean on Earth?", answers: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3, hint: "It covers more than 60 million square miles." },
    { question: "What is the currency of Japan?", answers: ["Yuan", "Won", "Dollar", "Yen"], correct: 3, hint: "It starts with 'Y'." },
    { question: "Who wrote 'Romeo and Juliet'?", answers: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], correct: 1, hint: "A famous English playwright." },
    { question: "What is the hardest natural substance on Earth?", answers: ["Gold", "Iron", "Diamond", "Quartz"], correct: 2, hint: "Used in jewelry and cutting tools." },
    { question: "How many continents are there on Earth?", answers: ["5", "6", "7", "8"], correct: 2, hint: "More than six, less than eight." },
    { question: "What is the chemical symbol for water?", answers: ["H2O", "O2", "CO2", "NaCl"], correct: 0, hint: "Contains hydrogen and oxygen." },
    { question: "Which country is famous for inventing pizza?", answers: ["France", "Italy", "USA", "Mexico"], correct: 1, hint: "Home to Rome and pasta." }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let username = "";
let totalTimeTaken = 0;

function startGame() {
    username = document.getElementById("username").value || "Guest";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    score = 0;
    totalTimeTaken = 0;
    document.getElementById("score").innerText = score;
    currentQuestionIndex = 0;
    
    // Randomize questions
    questions = [...questions].sort(() => Math.random() - 0.5);
    
    showQuestion();
}

function showQuestion() {
    clearInterval(timer);
    startTimer();
    
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const hintElement = document.getElementById("hint");

    hintElement.style.display = "none";
    document.getElementById("hint-btn").style.display = "block";
    hintElement.innerText = "Hint will appear here";
    
    answerButtons.innerHTML = "";
    document.getElementById("next-btn").style.display = "none";
    
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    questionElement.style.color = "white"; // Reset question color
    
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        button.onclick = () => checkAnswer(button, index);
        answerButtons.appendChild(button);
    });
}

function checkAnswer(button, selectedIndex) {
    clearInterval(timer);
    totalTimeTaken += (10 - timeLeft);
    const correctIndex = questions[currentQuestionIndex].correct;
    const questionElement = document.getElementById("question");
    
    // Stop any previously playing audio
    correctSound.pause();
    correctSound.currentTime = 0;
    wrongSound.pause();
    wrongSound.currentTime = 0;

    if (selectedIndex === correctIndex) {
        score++;
        document.getElementById("score").innerText = score;
        button.classList.add("correct");
        correctSound.play();
    } else {
        button.classList.add("wrong");
        questionElement.style.color = "red"; // Set question text to red on wrong answer
        wrongSound.play();
    }

    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quiz-container").style.display = "none";
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.style.display = "block";
    resultsContainer.style.position = "absolute";
    resultsContainer.style.top = "50%";
    resultsContainer.style.left = "50%";
    resultsContainer.style.transform = "translate(-50%, -50%)";
    
    let accuracy = ((score / questions.length) * 100).toFixed(2);
    let compliment = "";
    
    if (accuracy === 100) {
        compliment = "Outstanding! You're a genius!";
    } else if (accuracy >= 80) {
        compliment = "Great job! You did very well.";
    } else if (accuracy >= 50) {
        compliment = "Not bad! Keep practicing.";
    } else {
        compliment = "Keep learning! You'll do better next time.";
    }
    
    document.getElementById("results-summary").innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Score: ${score} / ${questions.length}</p>
        <p>Accuracy: ${accuracy}%</p>
        <p>Total Time Taken: ${totalTimeTaken} seconds</p>
        <p>${compliment}</p>
        <button onclick="restartQuiz()">Play Again</button>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    totalTimeTaken = 0;
    document.getElementById("results-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
}

function startTimer() {
    timeLeft = 10;
    document.getElementById("timer").innerText = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        
        if (timeLeft === 3) {
            timerSound.play();
        }
        
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function showHint() {
    const hintElement = document.getElementById("hint");
    hintElement.style.display = "block";
    hintElement.innerText = questions[currentQuestionIndex].hint;
    document.getElementById("hint-btn").style.display = "none";
}