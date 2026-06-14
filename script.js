const quizzes = {
    easy: [
        {
            question: "Яка планета є найближчою до Сонця?",
            answers: ["Венера", "Меркурій", "Марс", "Земля"],
            correct: 1
        },
        {
            question: "Яка планета є найбільшою в Сонячній системі?",
            answers: ["Юпітер", "Сатурн", "Уран", "Нептун"],
            correct: 0
        },
        {
            question: "Як називається природний супутник Землі?",
            answers: ["Марс", "Сонце", "Місяць", "Венера"],
            correct: 2
        },
        {
            question: "Хто був першою людиною, що ступила на Місяць?",
            answers: ["Юрій Гагарін", "Ніл Армстронг", "Баз Олдрін", "Майкл Коллінз"],
            correct: 1
        },
        {
            question: "Як називається зоря, навколо якої обертається Земля?",
            answers: ["Полярна зоря", "Сіріус", "Сонце", "Альтаїр"],
            correct: 2
        }
    ],

    medium: [
        {
            question: "Яка планета має найбільшу кількість супутників?",
            answers: ["Юпітер", "Сатурн", "Уран", "Нептун"],
            correct: 0
        },
        {
            question: "Як називається галактика, в якій знаходиться Сонячна система?",
            answers: ["Андромеда", "Чумацький Шлях", "Трикутник", "Галактика Вир"],
            correct: 1
        },
        {
            question: "Як називається перший штучний супутник Землі?",
            answers: ["Восток-1", "Аполлон-11", "Спутник-1", "Союз-1"],
            correct: 2
        },
        {
            question: "Яка планета відома як «Червона планета»?",
            answers: ["Сатурн", "Венера", "Юпітер", "Марс"],
            correct: 3
        },
        {
            question: "Яка планета має найбільший діаметр?",
            answers: ["Юпітер", "Сатурн", "Уран", "Нептун"],
            correct: 0
        }
    ],

    hard: [
        {
            question: "Яка планета обертається «лежачи на боці»?",
            answers: ["Уран", "Нептун", "Сатурн", "Юпітер"],
            correct: 0
        },
        {
            question: "Межа чорної діри, з якої не можна втекти?",
            answers: ["Горизонт подій", "Гравітаційна сфера", "Сингулярність", "Космічний бар'єр"],
            correct: 0
        },
        {
            question: "Перший апарат у міжзоряному просторі?",
            answers: ["Pioneer 10", "Voyager 1", "Voyager 2", "New Horizons"],
            correct: 1
        },
        {
            question: "Найближча зоря до Сонця?",
            answers: ["Сіріус", "Альфа Центавра A", "Проксима Центавра", "Бетельгейзе"],
            correct: 2
        },
        {
            question: "Викривлення світла гравітацією?",
            answers: ["Гравітаційне лінзування", "Гравітаційна сила", "Гравітаційна хвиля", "Гравітаційна волна"],
            correct: 0
        }
    ]
};

// DOM
const mainScreen = document.querySelector(".container");
const questionScreen = document.querySelector(".question");
const questionText = document.querySelector(".q");
const answersContainer = document.querySelector(".answers");
const startBtn = document.querySelector("button");
const select = document.querySelector("#difficulty");
const recordText = document.querySelector(".r");

let currentQuiz = [];
let questionIndex = 0;
let score = 0;

// REKORD
let highScore = localStorage.getItem("quizHighScore") || 0;
recordText.textContent = highScore;

// START QUIZ
startBtn.addEventListener("click", () => {
    const level = select.value;

    currentQuiz = quizzes[level];
    questionIndex = 0;
    score = 0;

    mainScreen.style.display = "none";
    questionScreen.style.display = "block";

    showQuestion();
});

// SHOW QUESTION
function showQuestion() {
    if (questionIndex >= currentQuiz.length) {
        endQuiz();
        return;
    }

    const q = currentQuiz[questionIndex];

    questionText.textContent = q.question;
    answersContainer.innerHTML = "";

    q.answers.forEach((answer, i) => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.classList.add("a");

        btn.addEventListener("click", () => checkAnswer(i));
        answersContainer.appendChild(btn);
    });
}

// CHECK ANSWER
function checkAnswer(index) {
    if (index === currentQuiz[questionIndex].correct) {
        score++;
    }

    questionIndex++;
    showQuestion();
}

// END QUIZ + RECORD
function endQuiz() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("quizHighScore", highScore);
    }

    questionScreen.innerHTML = `
        <h2 class="result">Результат</h2>
        <p class="score">Твій результат: ${score} / ${currentQuiz.length}</p>
        <p class="record">🏆 Рекорд: ${highScore}</p>
        <button onclick="location.reload()">Спробувати ще раз</button>
    `;
}