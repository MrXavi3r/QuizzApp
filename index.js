// holds all question and answer info for the quiz

const STORE = {
    currentQuestion: 0,
    score: 0,
    questions: [{
            name: "What century was Picasso born in?",
            answers: ["18th", "20th", "19th", "17th"],
            correctAnswer: "19th",
        },
        {
            name: "Who painted the Sistine Chapel?",
            answers: ["Michelangelo", "Leonardo DaVinci", "Raphael", "Donatello"],
            correctAnswer: "Michelangelo",
        },
        {
            name: "Who painted the Last Supper?",
            answers: ["Jesus", "Michelangelo", "Van Gogh", "DaVinci"],
            correctAnswer: "DaVinci",
        },
        {
            name: "Period during the 15th-16th centuries which saw a revival in art and literature:",
            answers: [
                "Age of Enlightenment",
                "Renaissance",
                "Neo-Classical",
                "Romanticism",
            ],
            correctAnswer: "Renaissance",
        },
        {
            name: "Dante Alighieri wrote the Divine Comedy that inspired this painting:",
            answers: [
                "Botticelli’s La Mappa dell’Inferno",
                "Vermeer's Journey to the Center of the Earth",
                "Pirelli's La Fiorentino",
                "Fleming's Tilted Tapestries",
            ],
            correctAnswer: "Botticelli’s La Mappa dell’Inferno",
        },
        {
            name: "Which of the following is a famous Andy Warhol painting?",
            answers: [
                "A box of Aunt Jemima pancake mix",
                "A can of Bush’s baked beans",
                "A can of Campbell’s tomato soup",
                "A jar of Jiff peanut butter",
            ],
            correctAnswer: "A can of Campbell’s tomato soup",
        },
        {
            name: "In what year did Jean Michel Basquiat die?",
            answers: [1971, 1993, 1988, 2000],
            correctAnswer: 1988,
        },
        {
            name: "Where is Frieda Kahlo from?",
            answers: ["Argentina", "Guatemala", "El Salvador", "Mexico"],
            correctAnswer: "Mexico",
        },
        {
            name: "Close up of this painting by Vincent Van Gogh:",
            answers: [
                "Once Upon A midnight Dreary",
                "A Starry Night",
                "Holy Night",
                "A Nightmare Before Christmas",
            ],
            correctAnswer: "A Starry Night",
        },
        {
            name: "Name of main characters wife that he mourns in Edgar Allen Poes the Raven",
            answers: ["Paris", "Lisa", "Morgan Fairchild", "Lenore"],
            correctAnswer: "Lenore",
        }
    ]
};

// counter variable initialized to start at 1 and count up to ten to keep track of questions in quiz
let counter = 1;

//references the STORE to get the current question index value and holds that value in an easily accessible variable for later
let question = STORE.questions[STORE.currentQuestion];

//  startpage HTML
let startPage =
    ` <div class="container start-page" id="start-page">
  <h1 class="title">The Art Aficionado Quiz</h1>
  <div class="border-rule">
      <div class="content adam">
          <a href=""><button class="start-button">Start</button></a>
      </div>
  </div>
</div>`;

//  quizpage HTML
let quizPage =
    `<div class="container quiz-page">
    <header>
        <h1>The Art Aficionado Quiz</h1>
    </header>
    <div class="border-rule">
        <div class="content">
            <section class="quiz">
                <form class="form">
                    <ul class="answers">
                    </ul>
                </form>
            </section>
        </div>
    </div>
</div>`;

// passpage HTML
let passPage =
    `<div class="container pass-page" id="pass-page">
<div class="border-rule">
    <div class="content">
        <h1 class="pass-fail">Congratulations! You passed</h1>
        <p>You're an art aficionado</p>
        <span>
            <button onclick="startOver()" class="go-back-btn">Back to Start</button>
        </span>
    </div>
</div>
</div>`;

// failpage HTML
let failPage =
    `<div class="container fail-page" id="fail-page">
<div class="border-rule">
    <div class="content">
        <h1 class="pass-fail">Bummer, you failed</h1>
        <p>Better luck next time</p>
        <span>
            <button onclick="startOver()" class="go-back-btn">Try Again</button>
        </span>
    </div>
</div>`

// renders any given page in the app on to the "main" element based on the variable param passed to it that holds the needed HTML
function renderPage(page) {
    $("main").html(page);
}

// starts the quiz 
//when quiz starts the currentQuestion increments from 0 to 1 to begin
function startQuiz(page) {
    STORE.currentQuestion++
    let i = STORE.currentQuestion - 1;

    // these variables hold HTML to be rendered within the quiz page for each given question 
    let question = STORE.questions[i];
    let answer1 = `<li><input id="answer1" type="radio" name="choice" value="${question.answers[0]}"></input><label for="answer1">${question.answers[0]}</label></li>`;
    let answer2 = `<li><input id="answer2" type="radio" name="choice" value="${question.answers[1]}"></input><label for="answer2">${question.answers[1]}</label></li>`;
    let answer3 = `<li><input id="answer3" type="radio" name="choice" value="${question.answers[2]}"></input><label for="answer3">${question.answers[2]}</label></li>`;
    let answer4 = `<li><input id="answer4" type="radio" name="choice" value="${question.answers[3]}"></input><label for="answer4">${question.answers[3]}</label></li>`;
    let questionName = `<h3 class="question">${question.name}</h3>`;
    let marker = `<span class="question-marker"><h5>question ${STORE.currentQuestion} of ${STORE.questions.length}</h5></span>`;
    let correctAnswer = `<div class="ca" style="display: none" data-answer="${question.correctAnswer}"></div>`;

    // adds the necessary html to page(via declared variables above) and adds background images to each their respective questions
    // adds the 4 possible answer choices for each questions
    $("main").html(page);
    $('.border-rule').addClass('bg' + STORE.currentQuestion);
    $('main .content').prepend(questionName);
    $('main .answers').append(answer1 + answer2 + answer3 + answer4);
    $('main .content').append(marker);
    $('main .quiz').append(correctAnswer);
    checkAnswer();
}


// logic for checking for right and wrong answers
// listens for when an answer li element has been changed,
//a class will be added to the element on click, triggering the event  
//if thr click is the correct choice, the list item will highlight green for 2 seconds and then move on to next question
//if user clicks on wrong answer, then it will highlight red for 2 seconds and then move on 
// also, once a user chooses an answer choice from the list, they may no longer click on any other choice because the other buttons will become disabled
//this was very difficult to pull off, as I had to change from buttons to inputs, and then hide the radios and style the button labels to appear large enough with CSS to make them click!
//once the .length of the store of questions has been reached, the checkResult function runs
function checkAnswer() {
    $('.answers li input').change(function(){
        let correctAnswer = $('.ca').data('answer')
        let userAnswer = $(this).val()
        if(correctAnswer === userAnswer){
            $(this).parents('li').addClass('correct');
            $('.answers li input').prop('disabled', true);
            STORE.score++
            setTimeout(function(){
                if(STORE.currentQuestion === STORE.questions.length) {
                    checkResult();
                } else {
                    startQuiz(quizPage)
                }
            }, 2000)
        }else{
            $(this).parents('li').addClass('incorrect');
            $('.answers li input').prop('disabled', true);
            setTimeout(function(){
                if(STORE.currentQuestion === STORE.questions.length) {
                    checkResult();
                } else {
                    startQuiz(quizPage)
                }
            }, 2000)
        }

    });
}

//if a users chooses 7 or more correct, then quiz will render pass page, if not, a fail page
function checkResult() {
    let score = STORE.score;
    if(score >= 7) {
        renderPage(passPage);
    } else {
        renderPage(failPage);
    }
}

//completely resets the page to HOME or startpage after quiz completion and clicking the button to do so
function startOver() {
    window.location = '/QuizApp';
}


//i still have yet to implement the html rendering for the scoring system so users can see their final score, ran short on time to do that
