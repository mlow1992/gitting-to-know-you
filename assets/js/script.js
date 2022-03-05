let questions = [
    {
    number: 1,
    question: "What is the best sandwich?",
    answers: {
        a: "Tuna",
        b: "Hot Dog",
        c: "PB&J",
        d: "Grilled Cheese"
    },
    correctAnswer: "c"
    },
    {
    number: 2,
    question: "The zombie apocalypse has started. What do you grab first?",
    answers: {
        a: "Shotgun. I'm about to have a blast.",
        b: "My best pair of sneakers. I can outrun these shambling SoBs.",
        c: "Katana. Wait, why do I have a katana just lying around?",
        d: "Food and water. Time to start building my resource empire."
    },
    correctAnswer: "a"
    },
    {
    number: 3,
    question: "What is the best pet?",
    answers: {
        a: "Dog. Woof",
        b: "Cat. Meow",
        c: "Fish. Glub Glub",
        d: "Anything. All animals deserve a loving home."
    },
    correctAnswer: "d"
    },
    {
    number: 4,
    question: "If you could have a superpower, what would it be?",
    answers: {
        a: "Communication with animals. See previous question.",
        b: "Super strength. I've always wanted to lift a bus.",
        c: "Super speed. I'll never be late to work again!",
        d: "Flight. I want to feel the wind in my hair and the bugs in my face."
    },
    correctAnswer: "a"
    },
    {
    number: 5,
    question: "What is the best holiday?",
    answers: {
        a: "St. Patrick's Day. Guinness and Shepherd's Pie.",
        b: "Any holiday that people give me chocolate",
        c: "Thanksgiving. I love group arguments followed by group nap time.",
        d: "Halloween. My parents were right. I CAN be whatever I want!"
    },
    correctAnswer: "b"
    }
];

const startBtn = document.querySelector("#start-btn");
const quizInfo = document.querySelector(".info-container");
const exitBtn = quizInfo.querySelector(".buttons .exit");
const contBtn = quizInfo.querySelector(".buttons .begin");
const quiz = document.querySelector(".quiz");
const timeLeft = document.querySelector(".timer .time-left");
const timeCount = document.querySelector(".timer .seconds");
const timeLine = document.querySelector("header .time-line");
const answerList = document.querySelector(".answers");
const results = document.querySelector(".results");

startBtn.onclick = () => {
    quizInfo.classList.add("infoActive");
}

exitBtn.onclick = () => {
    quizInfo.classList.remove("infoActive");
}

contBtn.onclick = () => {
    quizInfo.classList.remove("infoActive");
    quiz.classList.add("quizActive")
    showQuestions(0);
    questionCounter(1);
    startTime(60);
    startTimeLine(0);
}

let fullTime = 60;
let questionCount = 0;
let questionNumber = 1;
let score = 0;
let counter;
let counterLine;
let widthValue = 0;
const exitQuiz = results.querySelector(".buttons .exit");

exitQuiz.onclick = () => {
    window.location.reload();
}
const nextBtn = document.querySelector("footer .next");
const questCount = document.querySelector("footer .question-count");

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        questionNumber++;
        showQuestions(questionCount);
        questionCounter(questionNumber);
        timeLeft.textContent = "Time Left:";
        nextBtn.classList.remove("show");
    } else {
        showResult();
    }
}

function showQuestions(index) {
    const question = document.querySelector(".question")

    let questionTag = '<span>' + questions[index].number + ". " + questions[index].question + '</span>';
    let answerTag = '<div class="answer"><span>' + questions[index].answers[0] + '</span></div>'
    + '<div class="answer"><span>' + questions[index].answers[1] + '</span></div>'
    + '<div class="answer"><span>' + questions[index].answers[2] + '</span></div>'
    + '<div class="answer"><span>' + questions[index].answers[3] + '</span></div>';
    question.innerHTML = questionTag;
    answerList.innerHTML = answerTag;

    const answer = answerList.querySelectorAll(".answers");
    for (i = 0; i < answer.length; i++) {
        answer[i].setAttribute("onclick", "optionSelected(this)");
    }
}