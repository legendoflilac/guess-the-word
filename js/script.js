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
};

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
};

const makeGuess = function(letter) {
    const upperLetter = letter.toUpperCase();
    if (guessedLetters.includes(upperLetter)) {
        message.innerText = "You already guessed this letter. Try again."
    }
    else {
        guessedLetters.push(upperLetter);
        updateGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
    console.log(guessedLetters);
};

const updateGuessedLetters = function() {
    guessedLetters.innerHTML = "";
    let li = document.createElement("li");
    for (let letter of guessedLetters) {
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};

const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    wordArray.forEach(function(letter,index){
        if (guessedLetters.includes(letter)) {
        /*console.log("we got here");
        console.log("index",index);
        console.log("Inner text of WordInProgress", wordInProgress.innerText);*/
        const splitWordInProgress = wordInProgress.innerText.split("")
        splitWordInProgress.splice(index, 1, letter);
        wordInProgress.innerText = splitWordInProgress.join("");
    }
    })
    checkPlayerWin();

};

const checkPlayerWin = function() {
    //console.log("word in Progress", wordInProgress.innerText, "word", word.toUpperCase())
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win")
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`
    }
};