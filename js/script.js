const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const form = document.querySelector(".guess-form");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function() {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt")
    const data = await response.text();
    const wordArray = data.split("\n")
    const randomWordIndex = Math.floor(Math.random() * wordArray.length);
    console.log(randomWordIndex);
    word = wordArray[randomWordIndex].trim();
    placeholder(word);
}

getWord();

const placeholder = function(word) {
    let array = word.split("");
    array.forEach(function(letter, index) {
        array[index] = "●"
    })
    //console.log(array);
    wordInProgress.innerText = array.join("");
};

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
        countGuessesRemaining(upperLetter);
        updateGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
    //console.log(guessedLetters);
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

const countGuessesRemaining = function(guess) {
    const wordUpper = word.toUpperCase();
    if (!wordUpper.includes(guess)) {
        message.innerText = `The word doesn't have a ${guess}.`
        remainingGuesses -= 1;
    }
    else {
        message.innerText = `You found a letter!`
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over. The word was <span class"highlight">${word}</span>.`
        startOver();
    }
    else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`
    }
    else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`
    }
}

const checkPlayerWin = function() {
    //console.log("word in Progress", wordInProgress.innerText, "word", word.toUpperCase())
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win")
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`
        startOver();
    }
};

const startOver = function() {
    guessButton.classList.add("hide");
    guessedLettersList.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    wordInProgress.classList.add("hide");
    form.classList.add("hide");
    playAgain.classList.remove("hide");
}

playAgain.addEventListener("click", function() {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersList.innerText = "";
    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessButton.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    wordInProgress.classList.remove("hide");
    form.classList.remove("hide");
    playAgain.classList.add("hide");
    getWord();
})