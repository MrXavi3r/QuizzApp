//this simply renders the startpage in order to start the app
//listens for click on the start button on startpage and then initiates the quiz 
function main() {
    renderPage(startPage);
    $('.start-button').click(function(event){
        event.preventDefault();
        startQuiz(quizPage);
    });
}

$(main);