//letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// get array from letters
let lettersArray = Array.from(letters);

// select letters container
let lettersContainer = document.querySelector(".letters");

// generate letters
lettersArray.forEach(letter => {
    // create span
    let span = document.createElement("span");

    //create letter text node
    let theLetter = document.createTextNode(letter);

    //append the letter to span
    span.appendChild(theLetter);

    //add cllas on span
    span.className = 'letter-box';

    //append span to the letters container
    lettersContainer.appendChild(span);

});

//object of words + categories
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

// Get Random Property

let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// select letters guess element
let lattersGuessContainer = document.querySelector(".letters-guess");

// convert chosen word to array
let lettersAndSpace = Array.from(randomValueValue);

// create spans depened on word 
lettersAndSpace.forEach(letter => {

    //create empty span
    let emptySpan = document.createElement("span");

    //if letter is space
    if (letter === ' ') {

        //add class to the span
        emptySpan.className = 'with-space';
    }
    //append spans to the letters-guess container
    lattersGuessContainer.appendChild(emptySpan);
});

// select guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// set wrong attempts
let wrongAttempts = 0;

//select thw draw element
let theDraw = document.querySelector(".hangman-draw");
// handle clicking on letters 
document.addEventListener("click", (e) => {

    //set the chose status
let theStatus = false;

    if (e.target.className === 'letter-box') {

        e.target.classList.add("clicked");

         // Get Clicked Letter 
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        // the chosen word
        let theChosenLetter = Array.from(randomValueValue.toLowerCase());

        theChosenLetter.forEach((wordLetter, wordIndex) => {

            //if the clicked letter equal to one of the chosen word latter
            if (theClickedLetter == wordLetter) {

                    // set status to correct
                    theStatus = true;

                // loop on all guess spans
                guessSpans.forEach((span, spanIndex) => {

                    if (wordIndex === spanIndex) {
                        span.innerHTML = theClickedLetter;
                    }
                });

            }
        });
        //outside loop

        //if letter is wrong
        if (theStatus !== true ){
            // increase the wrong attempts
            wrongAttempts++;

            //add cllas wrong on the draw element
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            // play fail sound 
            document.getElementById("fail").play();
                if (wrongAttempts === 8) {

            endGame();

            lettersContainer.classList.add("finished");
            
        }

        }else {
            // play success sound 
            document.getElementById("success").play();
        }
    }
});

// end game function
function endGame() {

    // create popup div 
    let div = document.createElement("div");

    //create text
    let divText = document.createTextNode(`Game Over, The Word IS ${randomValueValue}`);

    //append text to div
    div.appendChild(divText);
    
    //add class on div
    div.className = 'popup';

    //append to the body
    document.body.appendChild(div);
}
