const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');

let shuffledQuestions, currentQuestionIndex, score;

const questions = [{
        question: 'Who is the author of the Mahabharata?',
        answers: [
            { text: 'Valmiki', correct: false },
            { text: 'Vyasa', correct: true },
            { text: 'Kalidasa', correct: false },
            { text: 'Tulsidas', correct: false }
        ]
    },
    {
        question: 'Who was the eldest Pandava?',
        answers: [
            { text: 'Bhima', correct: false },
            { text: 'Arjuna', correct: false },
            { text: 'Yudhishthira', correct: true },
            { text: 'Nakul', correct: false }
        ]
    },
    {
        question: 'Who was the mother of Karna?',
        answers: [
            { text: 'Kunti', correct: true },
            { text: 'Draupadi', correct: false },
            { text: 'Gandhari', correct: false },
            { text: 'Subhadra', correct: false }
        ]
    },
    {
        question: 'What is the name of the battlefield where the Mahabharata war was fought?',
        answers: [
            { text: 'Kurukshetra', correct: true },
            { text: 'Panipat', correct: false },
            { text: 'Kalinga', correct: false },
            { text: 'Hastinapura', correct: false }
        ]
    },
    {
        question: 'Who was known as the greatest archer in Mahabharata?',
        answers: [
            { text: 'Bhishma', correct: false },
            { text: 'Arjuna', correct: true },
            { text: 'Karna', correct: false },
            { text: 'Dronacharya', correct: false }
        ]
    },
    {
        question: 'Who was the charioteer of Arjuna during the Mahabharata war?',
        answers: [
            { text: 'Bhishma', correct: false },
            { text: 'Duryodhana', correct: false },
            { text: 'Krishna', correct: true },
            { text: 'Karna', correct: false }
        ]
    },
    {
        question: 'Which Pandava had the power of a thousand elephants?',
        answers: [
            { text: 'Sahadeva', correct: false },
            { text: 'Nakul', correct: false },
            { text: 'Bhima', correct: true },
            { text: 'Yudhishthira', correct: false }
        ]
    },
    {
        question: 'Who was the wife of all five Pandavas?',
        answers: [
            { text: 'Kunti', correct: false },
            { text: 'Draupadi', correct: true },
            { text: 'Subhadra', correct: false },
            { text: 'Gandhari', correct: false }
        ]
    },
    {
        question: 'Who was the teacher of both Pandavas and Kauravas?',
        answers: [
            { text: 'Bhishma', correct: false },
            { text: 'Dronacharya', correct: true },
            { text: 'Kripacharya', correct: false },
            { text: 'Vidura', correct: false }
        ]
    },
    {
        question: 'What was the name of the conch shell blown by Arjuna?',
        answers: [
            { text: 'Panchajanya', correct: false },
            { text: 'Anantavijaya', correct: false },
            { text: 'Devadatta', correct: true },
            { text: 'Sughosa', correct: false }
        ]
    }
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide');
    resultContainer.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showResult();
    }
}

function showResult() {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    resultElement.innerText = `Your Score: ${score}/${shuffledQuestions.length}`;
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}