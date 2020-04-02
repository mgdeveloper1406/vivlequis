const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions =  [
  {
    question: "How many authors wrote the Bible?",
    choice1: "27 authors",
    choice2: "66 authors",
    choice3: "40 authors",
    choice4: "37 authors",
    answer: 3
  },
  {
   question: "And thou shall call his name Jesus... Who is this quotation talking to?",
    choice1: "Emmanuel",
    choice2: "Joseph",
    choice3: "Mary",
    choice4: "Jesus",
    answer: 2
  },
  {
    question: "Who wrote the book of Acts of the Apostle",
    choice1: "Moses",
    choice2: "Paul the Apostle",
    choice3: "John the Beloved",
    choice4: "Luke",
    answer: 4
  },
  {
    question: "Who is the Father of Enoch",
    choice1: "Methuselah",
    choice2: "Jared",
    choice3: "Elimelech",
    choice4: "Lamech",
    answer: 2
  },
  {
   question: "Who join Paul and Barnabas in the their initial missionary journey?",
    choice1: "Silas",
    choice2: "John",
    choice3: "Matthew",
    choice4: "Mark",
    answer: 2
  },
  {
    question: "Who wrote the epistle to the Colossians",
    choice1: "Moses",
    choice2: "Paul the Apostle",
    choice3: "John the Beloved",
    choice4: "Luke",
    answer: 2
  },
  {
    question: "Jesus spent how many years for his earthly ministry",
    choice1: "40 years",
    choice2: "35 years",
    choice3: "45 years",
    choice4: "33 years",
    answer: 4
  },
  {
   question: "My grace is sufficient unto your... Who is this quotation talking to?",
    choice1: "Emmanuel",
    choice2: "Joseph",
    choice3: "Mary",
    choice4: "Paul the Apostle",
    answer: 4
  },
  {
    question: "I will come and heal him... who said this?",
    choice1: "Jesus Christ",
    choice2: "Paul the Apostle",
    choice3: "John the Beloved",
    choice4: "Luke",
    answer: 1
  },
  {
    question: "For the time would fail to me tell of... whose name is to be first in that list?",
    choice1: "Barrak",
    choice2: "Gideon",
    choice3: "Samson",
    choice4: "Jephthah",
    answer: 2
  }
];

// fetch("questions.json")
  // .then(res => {
  //   return res.json();
  // })
  // .then(loadedQuestions => {
  //   console.log(loadedQuestions.results);
  //   questions = loadedQuestions.results.map(loadedQuestion => {
  //     const formattedQuestion = {
  //       question: loadedQuestion.question
  //     };

  //     const answerChoices = [...loadedQuestion.incorrect_answers];
  //     formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
  //     answerChoices.splice(
  //       formattedQuestion.answer - 1,
  //       0,
  //       loadedQuestion.correct_answer
  //     );

  //     answerChoices.forEach((choice, index) => {
  //       formattedQuestion["choice" + (index + 1)] = choice;
  //     });

  //     return formattedQuestion;
  //   });
  //   startGame();
  // })
  // .catch(err => {
  //   console.error(err);
  // });
  

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    // console.log(availableQuestions);
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question; 

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    // console.log(availableQuestions);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
  
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];

      const classToApply = 
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
      
      if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
      }, 500);


      getNewQuestion();
    });
  });

  incrementScore = num => {
    score += num;
    scoreText.innerText = score;
  };

  startGame();