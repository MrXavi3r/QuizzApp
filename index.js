let questions = [{
        name: "What century was Picasso born in?",
        answers: ["18th", "20th", "19th", "17th"],
        correctAnswer: "19th"
    },
    {
        name: "Who painted the Sistine Chapel?",
        answers: ["Michelangelo", "Leonardo DaVinci", "Raphael", "Donatello"],
        correctAnswer: "Michelangelo"
    },
    {
        name: "Who painted the Last Supper?",
        answers: ["Jesus", "Michelangelo", "Van Gogh", "DaVinci"],
        correctAnswer: "DaVinci"
    }, 
    {
        name: "Period during the 15th-16th centuries which saw a revival in art and literature:",
        answers: ["Age of Enlightenment", "Renaissance", "Neo-Classical", "Romanticism"],
        correctAnswer: "Renaissance"
    }, 
    {
        name: "Dante Alighieri wrote the Divine Comedy that inspired this painting:",
        answers: ["Botticelli’s La Mappa dell’Inferno", "Vermeer's Journey to the Center of the Earth", "Pirelli's La Fiorentino", "Fleming's Tilted Tapestries"],
        correctAnswer: "Botticelli’s La Mappa dell’Inferno"
    }, 
    {
        name: "Which of the following is a famous Andy Warhol painting?",
        answers: ["A box of Aunt Jemima pancake mix", "A can of Bush’s baked beans", "A can of Campbell’s tomato soup", "A jar of Jiff peanut butter"],
        correctAnswer: "A can of Campbell’s tomato soup"
    }, 
    {
        name: "In what year did Jean Michel Basquiat die?",
        answers: ["1971", "1993", "1988", "2000"],
        correctAnswer: "1988"
    }, 
    {
        name: "Where is Frieda Kahlo from?",
        answers: ["Argentina", "Guatemala", "El Salvador", "Mexico"],
        correctAnswer: "Mexico"
    }, 
    {
        name: "Close up of this painting by Vincent Van Gogh:",
        answers: ["Once Upon A midnight Dreary", "A Starry Night", "Holy Night", "A Nightmare Before Christmas"],
        correctAnswer: "A Starry Night"
    },
    {
        name: "Name of main characters wife that he mourns in Edgar Allen Poes the Raven",
        answers: ["Paris", "Lisa", "Morgan Fairchild", "Lenore"],
        correctAnswer: "Lenore"
    }
]

let counter = 0;
function generateQuiz() {
    let question = questions[counter];
    
    return 
    `<div class="container quiz-page">
    <header>
        <h1>The Art Aficionado Quiz</h1>
    </header>
    <div class="border-rule">
        <main class="content">
            <h3 class="question">${question.name}</h3>
            <section class="quiz">
                <form class="form">
                    <ul class="answers">
                        <li id="submit"><a href="">${question[i].answers[0]}</a></li>
                        <li><a href="">${question[i].answers[1]}</li>
                        <li><a href="">${question[i].answers[2]}</li>
                        <li><a href="">${question[i].answers[3]}</a></li>
                    </ul>
                </form>
            </section>
            <span class="question-marker"><h5>question ${questions[i]} of 10</h5></span>
        </main>
    </div>
</div>`
    }


function renderPage() {
    let html = generateHTML();
    console.log(html);
    $("body").html(html);
}







export default questions;
export default generateQuiz()
export default renderPage()