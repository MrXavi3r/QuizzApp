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
                        <div class="answers">
                        </div>
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

// starts the quiz
//when quiz starts the currentQuestion increments from 0 to 1 to begin
function startQuiz(page) {
    STORE.currentQuestion++;
    let i = STORE.currentQuestion - 1;

    // these variables hold HTML to be rendered within the quiz page for each given question
    let question = STORE.questions[i];
    let answer1 = `<input id="answer1" type="radio" name="choice" tabindex="1" value="${question.answers[0]}"/><label for="answer1">${question.answers[0]}</label>`;
    let answer2 = `<input id="answer2" type="radio" name="choice" tabindex="2" value="${question.answers[1]}"/><label for="answer2">${question.answers[1]}</label>`;
    let answer3 = `<input id="answer3" type="radio" name="choice" tabindex="3" value="${question.answers[2]}"/><label for="answer3">${question.answers[2]}</label>`;
    let answer4 = `<input id="answer4" type="radio" name="choice" tabindex="4" value="${question.answers[3]}"/><label for="answer4">${question.answers[3]}</label>`;
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
}

// logic for checking for right and wrong answers
// listens for when an answer li element has been changed,
//a class will be added to the element on click, triggering the event
//if thr click is the correct choice, the list item will highlight green for 2 seconds and then move on to next question
//if user clicks on wrong answer, then it will highlight red for 2 seconds and then move on
// also, once a user chooses an answer choice from the list, they may no longer click on any other choice because the other buttons will become disabled
//this was very difficult to pull off, as I had to change from buttons to inputs, and then hide the radios and style the button labels to appear large enough with CSS to make them click!
//once the .length of the store of questions has been reached, the checkResult function runs
// function checkAnswer() {
//     $(".answers input").change(function () {
//         let correctAnswer = $(".ca").data("answer");
//         let userAnswer = $(this).val();
//         $('.form').on('click', '.submit-btn', (e)=> {
//             e.preventDefault();
//             if (correctAnswer === userAnswer) {
//             $(this).parents("li").addClass("correct");
//             $('.feedback p').addClass("correct");
//             $(".answers input").prop("disabled", true);
//             STORE.score++;
//                 if (STORE.currentQuestion === STORE.questions.length) {
//                     checkResult();
//                 } else {
//                     startQuiz(quizPage);
//                 };
//         } else {
//             $(this).parents("li").addClass("incorrect");
//             $(".answers li input").prop("disabled", true);
//                 if (STORE.currentQuestion === STORE.questions.length) {
//                     checkResult();
//                 } else {
//                     startQuiz(quizPage);
//                 };
//         }
//     })
//     });
// }

function checkAnswer() {
    $(".answers input").change(function () {
        let correctAnswer = $(".ca").data("answer");
        let userAnswer = $(this).val();
        $('.content').on('click', '.submit-btn', (event) => {
            event.preventDefault();
            if (correctAnswer === userAnswer) {
                STORE.score++;
                $('.feedback p').addClass("correct");
                $(".answers input").prop("disabled", true);
            } else {
                $('.feedback p').addClass("incorrect");
                $(".answers input").prop("disabled", true);
            };
        });

    });
    
}

//move to next question 
function nextQuestion(){
    $('.content').on('click', '.next-btn', () => {
        if ($('.answers input').prop("disabled", true) && STORE.currentQuestion === STORE.questions.length) {
            checkResult();
        }else if($('.answers input').prop("disabled", true)){
        startQuiz(quizPage);
        }
    })
}
        
    

//keyboard functionality for up and down keys and enter 
    $(document).on('keydown', function (e) {
        e.preventDefault();
        // console.log(e.which)
        var arrow = {up: 38, down: 40};
      
        let inputs = $('[name=choice]');
        switch (e.which) {
            
          case arrow.up:
            break;

          case arrow.down:


          //if theres a checked radio, find next one(to find next, know current)
          //if theres no currently checked radio, check first one           
          //use find method on LI to find input and check it  
          // 
            if($('[name=choice]:checked')[0]){
                console.log(inputs.indexOf(($('[name=choice]:checked')[0])))
              }
            break;
        }
      });

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
}

//i still have yet to implement the html rendering for the scoring system so users can see their final score, ran short on time to do that