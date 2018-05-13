//wait for everything to load before even doing stuff

var questionOne = {
    question: "What does the ancient symbol Ouroboros classically look like?",
    answersArray: ["A spear with a criss-crossing hilt", "A flying dragon that lifts the world",
        "A serpent that eats its own tail", "A beautiful princess surrounded by fire"],
    answer: 2,
    finalQuestion: false
}
var questionTwo = {
    question: "From what ancient Chinese epic did the Monkey King originate from?",
    answersArray: ["Journey to the West", "Romance of the Three Kingdoms", "Dream of the Red Chamber", "Water Margin"],
    answer: 0,
    finalQuestion: false
}
var questionThree = {
    question: "In the Japanese mythology of Susanoo and Orochi, what is the name of the sword that slays the legendary serpent?",
    answersArray: ["Demon Cutter of Seven Curses", "Sword of the Gathering Clouds of Heaven",
        "Swallow Blade of Divine Wind", "Death-Culling Spirit Blade"],
    answer: 1,
    finalQuestion: false
}
var questionFour = {
    question: "What is the primary purpose of Yggdrasil, the mythical tree of Norse Mythology?",
    answersArray: ["It is the core of the cosmos and connects all the worlds", "It is a flying tree that houses various Norse gods",
        "It is a legendary source of ingredients for the mightiest weapons", "It is a mythical staff wielded by Odin during Ragnorak"],
    answer: 0,
    finalQuestion: false
}
var questionFive = {
    question: "In Greek Mythology, how many Titans were originally borne from Gaia?",
    answersArray: ["6", "10", "12", "15"],
    answer: 2,
    finalQuestion: false
}
var questionSix = {
    question: "In The Epic of Gilgamesh, why did the gods send Enkidu to Gilgamesh?",
    answersArray: ["To become his life-long friend", "To inspire him to do great things",
        "To aid him in the battle against the Bull of Heaven", "To humble him of his arrogance"],
    answer: 3,
    finalQuestion: true
}

var questionObjArr = [questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix];
var currentQuestion = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var noAnswers = 0;
var time = 21;
var timeRunning = false;

var gameNavigation = {
    actionClick: function (question) {
        $(".answerButtons").on("click", function () {
            if ($(this).val() === question.answersArray[question.answer]) {
                console.log("Correct answer");
                correctAnswers++;

            } else {
                console.log("Wrong answer");
                incorrectAnswers++;
            }
            currentQuestion++;
            console.log(question);
            if (question.finalQuestion === true) {
                gameNavigation.showResult();
            } else {
                gameNavigation.generateQuestion();
            }

        })
    },
    generateQuestion: function () {
        time = 21;
        $(".questionContainer").html(questionObjArr[currentQuestion].question);
        $(".answerButtons").remove();
        for (var i = 0; i < questionObjArr[currentQuestion].answersArray.length; i++) {
            var button = $('<input type="button" class= "answerButtons" value="'
                + questionObjArr[currentQuestion].answersArray[i] + '"/>')
            $(".contentSection").append(button);
        }
        this.actionClick(questionObjArr[currentQuestion]);
    },
    showResult: function () {
        $(".contentSection").empty();
        var results = $("<div>");
        results.html("Correct Answers: " + correctAnswers + ", Incorrect Answers: " + incorrectAnswers 
        + ", Incomplete Answers: " + noAnswers);
        $(".contentSection").append(results);

    },
    setTimer: function () {
        if (time < 10) {
            $(".timerSection").html("00:0" + time);
        } else {
            $(".timerSection").html("00:" + time);
        }
    },
    countDown: function () {
        time--;
        gameNavigation.setTimer();
        if (time === 0) {
            console.log("You didn't answer...");
            noAnswers++;
            currentQuestion++;
            if (questionObjArr[currentQuestion].finalQuestion === true) {
                gameNavigation.showResult();
            } else {
                gameNavigation.generateQuestion();
            }
        }
    }
}

$(document).ready(function () {

    $(".start").on("click", function () {
        $(".contentSection").html("<div class='questionContainer'></div>");
        $(".contentSection").append("<div class='timerSection'></div>");
        gameNavigation.generateQuestion();
        setInterval(gameNavigation.countDown, 1000);

    })





})