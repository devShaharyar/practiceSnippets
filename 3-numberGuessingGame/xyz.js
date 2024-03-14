const startGame = document.getElementById('startGame'); // the start button 

const rangeOptions = document.querySelectorAll('input[name="guessRange"]'); //this will stores all options of range 
for (let i = 0; i < rangeOptions.length; i++) {
    rangeOptions[i].addEventListener('change', () => {
        startGame.disabled = false;   //so that whenever a radio button is selected it endbles the start button 
    })
}


const startGameFun = () => {

    const selectedRange = document.querySelector('input[name="guessRange"]:checked').value; // gets the range selected by user 
    console.log(selectedRange);
    //generating a random Number
    const actualResult = Math.floor(Math.random() * selectedRange);
    console.log(actualResult);

    let guessLeft = 0;
    switch (selectedRange) {
        case '10':
            guessLeft = 3;
            break;
        case '100':
            guessLeft = 7;
            break;
        case '1000':
            guessLeft = 10;
            break;

    }

    document.getElementById('main-content').innerHTML = (
        `
        <div id="left">
        <h2>Enter a number between 0 and ${selectedRange}</h2> 
        <input type="number" max=${selectedRange} placeholder="Enter here" id="guessInput">  
        <button id="checkResult"> Check </button> 
        <div id="warningSuggestion"></div>
        <p id=guessLeft >Number of Guesses left are : ${guessLeft}  </p>
        </div>

        <div id="right">
        Guessing Records:
        </div>
        `
    );
    const checkButton = document.getElementById('checkResult');

    const dialogSuccess = document.getElementById("onSuccess");
    const dialogFailure = document.getElementById("onFailure");

    const checkButtonFun = () => {

        --guessLeft;
        let userGuess = document.getElementById('guessInput').value;
        document.getElementById('right').innerHTML+=`<li>${userGuess}</li>`
        console.log(userGuess);
        document.getElementById('guessLeft').innerHTML = `Number of Guesses left are : ${guessLeft} `

        if (userGuess == actualResult) { dialogSuccess.showModal() }
        else if (userGuess < actualResult) { warningSuggestion.innerHTML = " <br> Too Low !! , Try Again" }
        else { warningSuggestion.innerHTML = " <br> Too High !! , Try Again" }


        if (guessLeft == 0 && userGuess != actualResult) {
            dialogFailure.showModal();
        }

    }


    checkButton.addEventListener('click', checkButtonFun);
}

startGame.addEventListener('click', startGameFun)
