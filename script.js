const buttons = document.querySelectorAll('.pick');
const scoreEl = document.getElementById('score');
const main = document.getElementById('main');
const selection = document.getElementById('selection');
const reset = document.getElementById('reset');
const userSelect = document.getElementById('user-select');
const computerSelect = document.getElementById('computer-select');
const winner = document.getElementById('winner');

const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');
const modal = document.getElementById('modal');



const choices = ['paper', 'rock', 'scissors'];

let score = 0;
let userChoice = undefined;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        userChoice = button.getAttribute('data-choice');
        // console.log(userChoice);

        checkWinner();
    });
});

reset.addEventListener('click', () => {
    //showing the "main" &n hiding the "selection"
    main.style.display = 'flex';
    selection.style.display = 'none';
});

openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    openBtn.style.visibility = 'hidden';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    openBtn.style.visibility = 'visible';
});

function checkWinner() {
    const computerChoice = pickRandomChoice();

    //updating the view
    updateSelection(userSelect, userChoice);
    updateSelection(computerSelect, computerChoice);

    if (userChoice === computerChoice) {
        //draw
        winner.innerText = 'draw';
        winner.style.color = 'whitesmoke';
    }
    else if (userChoice === 'paper' && computerChoice === 'rock' || userChoice === 'rock' && computerChoice === 'scissors' || userChoice === 'scissors' && computerChoice === 'paper') {
        //user wins
        winner.innerText = 'you win (+1)';
        winner.style.color = 'yellowgreen';
        updateScore(1);
    }
    else {
        //computer wins
        winner.innerText = 'you lost (-1)';
        winner.style.color = 'red';
        updateScore(-1)
    }

    //showing the "selection" &n hiding the "main"
    main.style.display = 'none';
    selection.style.display = 'flex';
}

function updateScore(value) {
    score += value;

    scoreEl.innerText = score;
}

function pickRandomChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function updateSelection(selectionEl, choice) {
    //reseting class
    selectionEl.classList.remove('btn-paper');
    selectionEl.classList.remove('btn-rock');
    selectionEl.classList.remove('btn-scissors');

    //updating image
    const img = selectionEl.querySelector('img');
    selectionEl.classList.add(`btn-${choice}`);
    img.src = `./images/icon-${choice}.svg`;
    img.alt = choice;
}