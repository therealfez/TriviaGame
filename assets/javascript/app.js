console.log(quizQuestions);
//initial values
let counter = 30;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

//Start a 30 second timer for user to respond to question

function timeUp() {
    clearInterval(timer);

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
        result += `<p class="choice" data-answer=""${choices[i]}">${choices[i]}</p>`;

    }

    return result;
}

loadQuestion();