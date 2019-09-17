console.log(quizQuestions);
//initial values
let counter = 30;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;


function nextQuestion() {

    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        displayResult();
        console.log("Game Over");
    } else {
        currentQuestion++;
        loadQuestion();
    }

}
//Start a 30 second timer for user to respond to question

function timeUp() {
    clearInterval(timer);

    lost++;

    nextQuestion();
}

function countDown() {
    counter --;


    $('#time').html('Timer: ' + counter);

    if (counter === 0) {
        timeUp();
    }
}

//display questions and choices to the browser

function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question; //
    const choices = quizQuestions[currentQuestion].choices; //


    $('#time').html('Timer: ' + counter);
    $('#game').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}
    `);
}

function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;

    }

    return result;
}

//Correct/Incorrect choice, then go to next quesion

$(document).on('click', '.choice', function() {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    //user wins/losses
    if (correctAnswer === selectedAnswer){
        score++;
        console.log('Correct');

        nextQuestion();
    } else {
        lost++;
        console.log('Wrong');

        nextQuestion();
    }

    // console.log('click: ', selectedAnswer);
});

//display results

function displayResult() {
    const result = `
    <p>You get ${score} question(s) right</p>
    <p>You missed ${lost} question(s)</p>
    <p>Total Questions: ${quizQuestions.length}</p>
    <button class ="btn btn-primary" id="reset">Reset Game</button>

    `;

    $('#game').html(result);
}

//reset button functionality

$(document).on('click', '#reset', function() {
    // console.log('Reset');
    
    counter = 30;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;


    loadQuestion();
});;

loadQuestion();