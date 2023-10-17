const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";

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
    const input = letterInput.value;
    console.log(input);
    letterInput.value = "";
});