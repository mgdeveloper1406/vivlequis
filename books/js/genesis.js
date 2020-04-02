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
    question: "Then God said, Let there be lights in the firmament of the heavens to divide the day from the night; and let them be for what?",
    choice1: "man and woman",
    choice2: "so man can see",
    choice3: "His pleasure",
    choice4: "signs and seasons",
    answer: 4
  },
  {
   question: "What did God form man from?",
    choice1: "The image of God",
    choice2: "water",
    choice3: "the dust of the ground",
    choice4: "JesuHis breath",
    answer: 3
  },
  {
    question: "Where did God plant the garden in Eden?",
    choice1: "Southward",
    choice2: "Westward",
    choice3: "Eastward",
    choice4: "Northward",
    answer: 3
  },
  {
    question: "When God asked Adam ...Where are you?... What was Adam’s reply?",
    choice1: "Eve and I are leaving for vacation.",
    choice2: "I heard Your voice in the garden, and I was afraid because I was naked; and I hid myself.",
    choice3: "I am busy eating fruit.",
    choice4: "I am over here",
    answer: 2
  },  
  {
    question: "Who built a city named Enoch?",
    choice1: "Abel",
    choice2: "Cain",
    choice3: "Adam",
    choice4: "Seth",
    answer: 2
  },
  {
    question: "Who lived 969 years?",
    choice1: "Methuselah",
    choice2: "Enosh",
    choice3: "Mahalalel",
    choice4: "Enoch",
    answer: 1
  },
  {
    question: "How many each, of every clean animal, did Noah take onto the ark?",
    choice1: "0",
    choice2: "0",
    choice3: "2",
    choice4: "7",
    answer: 4
  },
  {
    question: "Who are the 3 sons of Noah?",
    choice1: "Shem, Magog, and Japheth",
    choice2: "Shem, Ham, and Japheth",
    choice3: "Gomer, Magog, and Japheth",
    choice4: "Ham, Shem, and Magog",
    answer: 2
  },
  {
    question: "How was Lot related to Abraham?",
    choice1: "Lot was Abraham’s brother.",
    choice2: "Lot was Abraham’s Father",
    choice3: "Lot was the son of Abraham’s brother.",
    choice4: "Lot was Abraham’s Cousin",
    answer: 3
  },
  {
    question: "Who was Abraham’s father?",
    choice1: "Haran",
    choice2: "Lot",
    choice3: "Terah",
    choice4: "Nahor",
    answer: 3
  },
  {
    question: "Who changed Abraham’s wife’s name?",
    choice1: "Abraham",
    choice2: "She did",
    choice3: "God",
    choice4: "No one",
    answer: 3
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

  3
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
    return window.location.assign("../end.html");
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