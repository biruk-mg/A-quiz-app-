const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
  
    question: "what is the capital of france?",
    choice1: "paris",
    choice2: "madrid",
    choice3: "rome",
    choice4: "berlin",
    answer: 1
  },
  {
    question:
      "Which planet is known as the red planet?",
    choice1: "venus",
    choice2: "Mars",
    choice3: "saturn",
    choice4: "jupitor",
    answer: 2
  },
  {
    question: " who painted the famous artwork MONALISA ?",
    choice1: "pablo picasso",
    choice2: "Leonardo da vinci",
    choice3: "vincent van Gogh",
    choice4: "Michelangelo",
    answer: 2
  },
  {
    question:
      "What is the largest mammal in the world?",
    choice1: "African Elephant",
    choice2: "Blue Whale",
    choice3: "Giraffe",
    choice4: "Hippopotamus",
    answer: 2
  },
  {
    question:
      "what is the powerhouse of the cell?",
    choice1: "Ribosome",
    choice2: "Nucleus",
    choice3: "Mitochondorion",
    choice4: "Endoplasmic reticulum",
    answer: 3
  },
  {
    question:
      "Which country is home to the pyramids of Giza?",
    choice1: "Turkey",
    choice2: "Egypt",
    choice3: "Greece",
    choice4: "Sudan",
    answer: 2
  },
  {
    question:
      "Who wrote the play'Romeo and Juliet'?",
    choice1: "Charles Dickens",
    choice2: "William Shakespeare",
    choice3: "Jane Austen",
    choice4: "Mark Twain",
    answer: 2
  },
  {
    question:
      "what is the Chemical symbol for gold ?",
    choice1: "Go",
    choice2: "Au",
    choice3: "Ag",
    choice4: "Gold",
    answer: 2
  },
  {
    question:
      "which of the following is a renewable source of energy?",
    choice1: "Coal",
    choice2: "Natural Gas",
    choice3: "Solar",
    choice4: "Oil",
    answer: 3
  },
  {
    question:
      "who is the fisrt person to step on the moon?",
    choice1: "Buzz Aldrin",
    choice2: "Neil Armstrong",
    choice3: "Yuri Gagarin",
    choice4: "John Glenn",
    answer: 2
  },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
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
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();