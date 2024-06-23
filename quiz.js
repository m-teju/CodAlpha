const quizData = [
    {
        question: "What does HTML stand for?",
        a: "Hyper Text Markup Language",
        b: "Home Tool Markup Language",
        c: "Hyperlinks and Text Markup Language",
        d: "Hyper Tool Markup Language",
        correct: "a",
    },
    {
        question: "What does CSS stand for?",
        a: "Creative Style Sheets",
        b: "Cascading Style Sheets",
        c: "Computer Style Sheets",
        d: "Colorful Style Sheets",
        correct: "b",
    },
    {
        question: "What does JS stand for?",
        a: "JavaScript",
        b: "JavaSource",
        c: "JustScript",
        d: "JScript",
        correct: "a",
    },
];

let currentQuiz = 0;
let score = 0;

const quizContainer = document.getElementById('quiz');
const nextButton = document.getElementById('next-btn');
const resultsContainer = document.getElementById('results');

loadQuiz();

function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    quizContainer.innerHTML = `
        <div class="question">${currentQuizData.question}</div>
        <label class="answer"><input type="radio" name="answer" value="a"> ${currentQuizData.a}</label>
        <label class="answer"><input type="radio" name="answer" value="b"> ${currentQuizData.b}</label>
        <label class="answer"><input type="radio" name="answer" value="c"> ${currentQuizData.c}</label>
        <label class="answer"><input type="radio" name="answer" value="d"> ${currentQuizData.d}</label>
    `;
}

nextButton.addEventListener('click', () => {
    const answerElements = document.querySelectorAll('input[name="answer"]');
    let selectedAnswer;
    answerElements.forEach(answerElement => {
        if (answerElement.checked) {
            selectedAnswer = answerElement.value;
        }
    });

    if (selectedAnswer) {
        if (selectedAnswer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            showResults();
        }
    } else {
        alert("Please select an answer");
    }
});

function showResults() {
    resultsContainer.innerHTML = `You answered ${score}/${quizData.length} questions correctly`;
    nextButton.style.display = 'none';
}
