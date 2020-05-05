const startBtn = document.querySelector('.startBtn');
const container = document.querySelector('.container');
const fireme = document.querySelector('.fireme');
const scoreOutput = document.querySelector('.score');
const myShip = document.querySelector('.myShip');
startBtn.addEventListener('click', start);

//Getting container dimension..
let containerDimension = container.getBoundingClientRect();

//Player Object
let player = {
    score: 0,
    speed: 0,
    aliendSpeed: 0,
}

//Objects which tracks keyPresses
let keys = {};

//Function which starts gamePlay
function start() {
    startBtn.classList.add('hide');
    myShip.classList.remove('hide')
    fireme.classList.remove('hide')
    console.log("game started");
}

//KeyBoard Events
document.addEventListener('keydown', pressOn);
document.addEventListener('keyup', pressOff);

function pressOn(e) {
    keys[e.code] = true;
    console.log(keys);
}

function pressOff(e) {
    keys[e.code] = false;
    console.log(keys);
}