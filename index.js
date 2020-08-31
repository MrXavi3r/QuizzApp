// counter variable initialized to start at 1 and count up to ten to keep track of questions in quiz
let counter = 1;

//references the STORE to get the current question index value and holds that value in an easily accessible variable for later
let question = STORE.questions[STORE.currentQuestion];

//  startpage HTML
let startPage = ` <div class="container start-page" id="start-page">
  <h1 class="title">The Art Aficionado Quiz</h1>
  <div class="border-rule">
      <div class="content adam">
          <a href=""><button class="start-button">Start</button></a>
      </div>
  </div>
</div>`;

//  quizpage HTML
let quizPage = `<div class="container quiz-page">
    <header>
        <h1 class="title">The Art Aficionado Quiz</h1>
    </header>
    <div class="border-rule">
        <div class="content">
        <div class="feedback"><p></p></div>
            <section class="quiz">
                <form class="form">
                        <fieldset class="answers">
                        </fieldset>
                        <button class="submit-btn" type="submit">SUBMIT</button>
                        <button class="next-btn" type="button">NEXT</button>
                </form>
            </section>
        </div>
    </div>
</div>`;

// passpage HTML
function passPage(score) {
    return `<div class="container pass-page" id="pass-page">
        <div class="border-rule">
        <div class="content">
        <h1 class="pass-fail">Congratulations! You passed</h1>
        <h4 class="final-score">final score: ${score}</h4>
        <p>You're an art aficionado</p>
        <span>
            <button onclick="startOver()" class="go-back-btn" type="reset">Back to Start</button>
        </span>
    </div>
</div>
</div>`;
}

// failpage HTML
function failPage(score) {
    return `<div class="container fail-page" id="fail-page">
        <div class="border-rule">
        <div class="content">
        <h1 class="pass-fail">Bummer, you failed</h1>
        <h4 class="final-score">final score: ${score}</h4>
        <p>Better luck next time</p>
        <span>
            <button onclick="startOver()" class="go-back-btn" type="reset">Try Again</button>
        </span>
    </div>
</div>`;
}

// renders any given page in the app on to the "main" element based on the variable param passed to it that holds the needed HTML
function renderPage(page) {
    $("main").html(page);
}

function startBtnClick(){
    $('.start-button').click(function(event){
        event.preventDefault();
        startQuiz(quizPage);
    });
}

// starts the quiz
//when quiz starts the currentQuestion increments from 0 to 1 to begin
function startQuiz(page) {
    STORE.currentQuestion++;
    let i = STORE.currentQuestion - 1;

    // these variables hold HTML to be rendered within the quiz page for each given question
    let question = STORE.questions[i];
    let answer1 = `<li><input id="answer1" type="radio" name="choice" value="${question.answers[0]}"/><label for="answer1">${question.answers[0]}</label></li>`;
    let answer2 = `<li><input id="answer2" type="radio" name="choice" value="${question.answers[1]}"/><label for="answer2">${question.answers[1]}</label></li>`;
    let answer3 = `<li><input id="answer3" type="radio" name="choice" value="${question.answers[2]}"/><label for="answer3">${question.answers[2]}</label></li>`;
    let answer4 = `<li><input id="answer4" type="radio" name="choice" value="${question.answers[3]}"/><label for="answer4">${question.answers[3]}</label></li>`;
    let questionName = `<h3 class="question">${question.name}</h3>`;
    let marker = `<span class="question-marker"><h5>question ${STORE.currentQuestion} of ${STORE.questions.length}</h5></span>`;
    let scorer = `<div class="current-score"><h5>score: ${STORE.score}</h5></div>`;
    let refresh = `<span><button class="refresh-btn" onClick="startOver()">Restart Quiz</button></span>`;
    let correctAnswer = `<div class="ca" style="display: none" data-answer="${question.correctAnswer}"></div>`;

    // adds the necessary html to page(via declared variables above) and adds background images to each their respective questions
    // adds the 4 possible answer choices for each questions
    $("main").html(page);
    $(".border-rule").addClass("bg" + STORE.currentQuestion);
    $("main .content").prepend(questionName);
    $("main .content").prepend(scorer);
    $("main .answers").append(answer1 + answer2 + answer3 + answer4);
    $("main .content").append(marker);
    $("main .content").append(refresh);
    $("main .quiz").append(correctAnswer);
    checkAnswer();
    nextQuestion();
    answerChosen();
    answersFocus();
}

function checkAnswer() {
        $('.content').on('click', '.submit-btn', (event) => {
            event.preventDefault();
            let correctAnswer = $(".ca").data("answer");
                let userAnswer = $('input[type=radio][name=choice]:checked').val();
                if (correctAnswer === userAnswer) {
                    STORE.score++;
                    $('.feedback p').addClass("correct");
                    $(".answers input").prop("disabled", true);
                } else {
                    $('.feedback p').addClass("incorrect");
                    $(".answers input").prop("disabled", true);
                };
        });    
}

//move to next question on next button click, after submit button has been clicked
function nextQuestion(){
    $('.content').on('click', '.next-btn', () => {
        if ($('.answers li input').prop("disabled") && STORE.currentQuestion === STORE.questions.length) {
            checkResult();
        }else if($('.answers li input').prop("disabled")){
            startQuiz(quizPage);
        }
    })
}

// adds a 'checked' class to elements that are checked, highlighting them pink
function answersFocus() {
    $('input[type=radio][name=choice]').focus(function() {
        if(!$('input[type=radio][name=choice]:checked').length){
        $(this).parent().addClass('checked')
        $(this).attr('checked', true)
        } 
    })
}


//changes color of selected answer choice
function answerChosen(){
    $('input[type=radio][name=choice]').on('change', ()=>{
        console.log('did change')
        let choices = $('input[type=radio][name=choice]')
        for(let i=0; i<choices.length; i++){
            if(choices[i].checked){
                $(choices[i]).parent().addClass('checked')
        } else {
            $(choices[i]).parent().removeClass('checked')
        }
    }
    })
}



//if a users chooses 7 or more correct, then quiz will render pass page, if not, a fail page
function checkResult() {
    let score = STORE.score;
    if (score >= 7) {
        renderPage(passPage(score));
    } else {
        renderPage(failPage(score));
    }
}

//completely resets the page to HOME or startpage after quiz completion and clicking the button to do so
function startOver() {
        STORE.score = 0;
        STORE.currentQuestion = 0;
        renderPage(startPage);
        startBtnClick();
}

//i still have yet to implement the html rendering for the scoring system so users can see their final score, ran short on time to do that