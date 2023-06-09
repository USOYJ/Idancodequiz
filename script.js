let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let scorelistContainer = document.querySelector(".scorelist-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let scoreArea = document.querySelector(".score-area");
let highScoreButton = document.getElementById("highscore-btn");
let submitScoreButton = document.getElementById("submit-score");
let questionCount;
let scoreCount = 0;
let count = 20;
let countdown;






const quizArray = [
    {
        id: "0",
        question: " All the electricity powering the internet weighs the same as what?",
        options: ["Rock", "Whale", "Apricot", "Pin"],
        correct: "Apricot"
    },
    {
        id: "1",
        question: "Coding has how many languages?",
        options: ["Over 700", "Over 300", "Over 400", "Over 200"],
        correct: "Over 700"
    },
    {
        id: "2",
        question: "The first programmer was who?",
        options: ["Alan Turing", "Ada Lovelace", "Bjarne Stroustrup", "Olusegun Arinze"],
        correct: ["Ada Lovelace"]
    },
    {
        id: "3",
        question: "The first computer virus was a what?",
        options: ["Ghost", "Mummy", "Creeper", "Chucky"],
        correct: "Creeper"
    }
];

restart.addEventListener("click", () => {
    intial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

nextBtn.addEventListener("click", (displayNext = () => {
    questionCount += 1;

    if (questionCount == quizArray.length) {
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = "Your score is " + scoreCount + " out of " + questionCount;
    }
    else {
        countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + "Question";

        quizDisplay(questionCount);
        count = 20;
        clearInterval(countdown);
        timerDisplay();
    }
}));

const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");

    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide")
};

function quizCreater() {
    quizArray.sort(() => Math.random() - 0.5);

    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");

        countOfQuestion.innerHTML = 1 + "of" + quizArray.length + "Question";

        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);

        div.innerHTML += `
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
        `;

        quizContainer.appendChild(div);
    }
}

function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");

        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}


function intial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 20;
    clearInterval(countdown);
    timerDisplay();
    quizCreater();
    quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    intial();
});

window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};

highScoreButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    scorelistContainer.classList.remove("hide");
    intial();
});





const username = document.querySelector('#username')
const submitScoreBtn = document.querySelector('#submitScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const restartBtn = document.querySelector('#restart')
const goHomeBtn = document.querySelector('#go-home')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 4;


$('#restart').css("display", "none")


// this function is to make sure that Save button is disabled untill player adds their name

finalScore.innerText = mostRecentScore


username.addEventListener('keyup', () => {

    submitScoreBtn.disabled = !username.value
    displayBtns();

}
)


saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a, b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))

}
// function to hide/display 2 buttons based on entering players name, unless this condition is not met JQuery is defaulting these
// two buttons to be hidden
function displayBtns() {
    if (submitScoreBtn.disabled === true) {
        $('#restart').css("display", "none");
        $('#go-home').css("display", "none")

    } else {
        $('#restart').css("display", "block");
        $('#go-home').css("display", "block")

    }
}
displayBtns();

//function to click Save button 
submitScoreBtn.addEventListener("click", function () {
    return window.location.assign('./index.html');

});