const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeholder = function(word) {
    let array = word.split("");
    array.forEach(function(letter, index) {
        array[index] = "●"
    })
    //console.log(array);
    wordInProgress.innerText = array.join("");
}

placeholder(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    message.innerText = "";
    const input = letterInput.value;
    const result = validateInput(input);
    if (result) {
        makeGuess(result);
    }
    letterInput.value = "";
});

const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/
    if (input === "") {
        message.innerText = "Please enter a letter from A-Z."
    }
    else if (input.length > 1) {
        message.innerText = "Please enter one letter."
    }
    else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A-Z."
    }
    else {
        return input;
    }
}

const makeGuess = function(letter) {
    const upperLetter = letter.toUpperCase();
    if (guessedLetters.includes(upperLetter)) {
        message.innerText = "You already guessed this letter. Try again."
    }
    else {
        guessedLetters.push(upperLetter);
    }
    console.log(guessedLetters);
}