const startBtn = document.querySelector('.startBtn');
const container = document.querySelector('.container');
const fireme = document.querySelector('.fireme');
const scoreOutput = document.querySelector('.score');
const myShip = document.querySelector('.myShip');
startBtn.addEventListener('click', start);

//Player Object
let player = {
    score: 0,
    speed: 0,
    aliendSpeed: 0,
}
let containerDimension = container.getBoundingClientRect();
//Function which starts gamePlay
function start() {
    startBtn.classList.add('hide');
    myShip.classList.remove('hide')
    fireme.classList.remove('hide')

    console.log("game started");
}