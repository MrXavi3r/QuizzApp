import questions from "./index";
import renderPage from './index';
import generateHTML from './index';

// 1. start button on start page destroys start page and renders quiz page
// 2. quiz page starts loads question 1 of quiz on page 
// 3. clicking on a right/wrong answer in Li's highlights bgc green/red by adding class to Li's for a few seconds before moving on to next question
// 4. clicking on any answer destroys the page and re-renders it with next question
// 5. once question 10 has been answered, if 7 out of 10 or more were correct answers, then render conrats page
// 6. if not, then render fail page 
// 7. fail page or congrats page will link back to start page 