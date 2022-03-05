let questions = [
    {
    number: 1,
    question: "What is the best sandwich?",
    answers: [
        "Tuna",
        "Hot Dog",
        "PB&J",
        "Grilled Cheese"
    ],
    correctAnswer: "PB&J"
    },
    {
    number: 2,
    question: "The zombie apocalypse has started. What do you grab first?",
    answers: [
        "Shotgun. I'm about to have a blast.",
        "My best pair of sneakers. I can outrun these shambling SoBs.",
        "Katana. Wait, why do I have a katana just lying around?",
        "Food and water. Time to start building my resource empire."
    ],
    correctAnswer: "Shotgun. I'm about to have a blast."
    },
    {
    number: 3,
    question: "What is the best pet?",
    answers: [
        "Dog. Woof",
        "Cat. Meow",
        "Fish. Glub Glub",
        "Anything. All animals deserve a loving home."
    ],
    correctAnswer: "Anything. All animals deserve a loving home."
    },
    {
    number: 4,
    question: "If you could have a superpower, what would it be?",
    answers: [
        "Communication with animals. See previous question.",
        "Super strength. I've always wanted to lift a bus.",
        "Super speed. I'll never be late to work again!",
        "Flight. I want to feel the wind in my hair and the bugs in my face."
    ],
    correctAnswer: "Communication with animals. See previous question."
    },
    {
    number: 5,
    question: "What is the best holiday?",
    answers: [
        "St. Patrick's Day. Guinness and Shepherd's Pie.",
        "Any holiday that people give me chocolate",
        "Thanksgiving. I love group arguments followed by group nap time.",
        "Halloween. My parents were right. I CAN be whatever I want!"
    ],
    correctAnswer: "Any holiday that people give me chocolate"
    }
];

const startBtn = document.querySelector(".start-btn");
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

    const answer = answerList.querySelectorAll(".answer");
    for (i = 0; i < answer.length; i++) {
        answer[i].setAttribute("onclick", "answerChosen(this)");
    }
}

let checkIconTag = '<div class="check-mark"><i class="fa-solid fa-check"></i></div>'
let xIconTag = '<div class="x-mark"><i class="fa-solid fa-xmark"></i></div>'

function answerChosen(answer) {
    let userAnswer = answer.textContent;
    let correctAns = questions[questionCount].correctAnswer;
    const allAnswers = answerList.children.length;

    if (userAnswer == correctAns) {
        score += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", checkIconTag);
        console.log("Correct!")
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", xIconTag);
        fullTime -= 10;
        console.log("Wrong Answer!")
        for (i = 0; i < allAnswers; i++) {
            if (answerList.children[i].textContent == correctAns) {
                answerList.children[i].classList.add("correct");
                answerList.children[i].insertAdjacentHTML("beforeend", checkIconTag);
            }
        }
    }

    for (i = 0; i < allAnswers; i++) {
        answerList.children[i].classList.add("disabled");
    }

    nextBtn.classList.add("show");
}

function showResult() {
    quizInfo.classList.remove("infoActive");
    quiz.classList.remove("quizActive");
    results.classList.add("resultsActive");
    const scoreText = results.querySelector(".score");
    if (score > 3) {
        let scoreTag = '<span>Great job! You got <p>' + score + '</p> correct!</span>';
        scoreText.innerHTML = scoreTag;
    } else if (score > 1) {
        let scoreTag = '<span>Decent work! You got <p>' + score + '</p> correct!</span>';
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = '<span> You get nothing! You lose! Good DAY sir!</span>'
        scoreText.innerHTML = scoreTag;
    }
}

function startTime() {
    setInterval(function () {
        if (fullTime <= 0) {
            clearInterval();
            document.getElementById('timer').innerHTML = '0';
            showResult();
        } else {
            document.getElementById('timer').innerHTML = fullTime;
        }
        fullTime -= 1;
    }, 1000);
}

function startTimeLine(time) {
    counterLine = setInterval(timer, 60);
    function timer() {
        time += 0.57;
        timeLine.style.width = time + "px";
        if(time > 549) {
            clearInterval(counterLine);
        }
    }
}

function questionCounter(index) {
    
    let totalQuestionCounterTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    questCount.innerHTML = totalQuestionCounterTag;
}