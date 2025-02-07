let secretNumber = 0;
let attemptNumber = 0;
let listSortedNumbers = [];
let maxNumber = 0;

function assignElementText (element, text) {
    //Assign a text to the html element that is called
    let elementHTML = document.querySelector(element);
    elementHTML.innerHTML = text;
    return;
}

function checkAttempt () {
    //Check if the number entered by the user matches the secret number
    let userNumber = parseInt(document.getElementById('userValue').value);
    console.log('Attempt number: ' + attemptNumber);
    if (userNumber === secretNumber){
        //The user got it right
        assignElementText('p',`You got the number right in ${attemptNumber} ${attemptNumber === 1 ? 'attempt' : 'attempts'}`);
        document.getElementById('newGame').removeAttribute('disabled');
        cleanBox();
        document.getElementById('attempt').setAttribute('disabled',true);
    } else {
        //The user did not guess correctly
        if (userNumber > secretNumber){
            assignElementText('p',`The secret number is lower. Remember it is from 1 to ${maxNumber}`);
        }
        else {
            assignElementText('p',`The secret number is higher. Remember it is from 1 to ${maxNumber}`);
        }
        attemptNumber++;
        cleanBox();
    }
    return;
}

function cleanBox(){
    //Clears the value of the html input
    document.querySelector('#userValue').value = '';
    return;
}

function generateSecretNumber() {
    //Generates a pseudo-random number from 1 to max Number
    console.log('Max number is: ' + maxNumber);
    let GeneratedNumber = Math.floor(Math.random()*maxNumber) + 1;
    //If we already drew all the numbers
    if (listSortedNumbers.length == Math.abs(maxNumber)){
        assignElementText('p','All possible numbers have been drawn, refresh the page to play again');
        document.getElementById('attempt').setAttribute('disabled',true);
    } else{
        //If the generated number is already in the list
        if (listSortedNumbers.includes(GeneratedNumber)) {
            return generateSecretNumber();
            
        } else{
            listSortedNumbers.push(GeneratedNumber);
            console.log(listSortedNumbers);
            return GeneratedNumber;
        }
    }
}

function maxNumberGames(){
    document.getElementById('start').removeAttribute('disabled');
    assignElementText('h1','Secret Number Game!');
    assignElementText('p','Guess the number from 1 to __: please select the range');
    maxNumber = parseInt(document.getElementById('userValue').value);
    cleanBox();
    if (maxNumber){
        console.log("I'm in");
        initialConditions();
    }
    return;
}

function initialConditions() {
    document.querySelector('#start').setAttribute('disabled', 'true')
    document.getElementById('attempt').removeAttribute('disabled');
    /*Sets the initial conditions of the game, such as assigning initial text,
     generating the secret number, and disabling the New Game button.*/
    assignElementText('h1','Secret Number Game!');
    assignElementText('p',`Guess a number from 1 to ${maxNumber}`);
    secretNumber = generateSecretNumber();
    console.log('The secret number is ' + secretNumber);
    attemptNumber = 1
    return;
}


function restartGame(){
    cleanBox();
    initialConditions();
    document.querySelector('#newGame').setAttribute('disabled', 'true')    
    return;
}

maxNumberGames();
//initialConditions();