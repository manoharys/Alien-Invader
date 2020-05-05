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
    speed: 3,
    aliendSpeed: 0,
    fire: false
}

//Objects which tracks keyPresses
let keys = {};

//Function which starts gamePlay
function start() {
    startBtn.classList.add('hide');
    myShip.classList.remove('hide')
    //fireme.classList.remove('hide')
    fireme.fire = false;
    console.log("game started");
    player.x = myShip.offsetLeft;
    player.y = myShip.offsetTop;
    console.log(player);
    window.requestAnimationFrame(update);

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


function update() {
    if (player.fire) {
        if (fireme.ypos > 0) {
            fireme.ypos -= 15;
            fireme.style.top = fireme.ypos + "px";
        } else {
            player.fire = false;
            fireme.classList.add('hide');
            fireme.style.top = (containerDimension + 100) + 'px';
        }
    }
    if (keys.ArrowUp || keys.Space) {
        addShoot();
    }
    // if (keys.ArrowDown) {
    //     player.y += player.speed;
    // }

    if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < (container.offsetWidth - myShip.offsetWidth)) {
        player.x += player.speed;
    }
    myShip.style.left = player.x + "px";
    //myShip.style.top = player.y + "px";
    window.requestAnimationFrame(update);
}


//Function which fires 
function addShoot() {
    player.fire = true;
    fireme.classList.remove("hide");
    fireme.xpos = (myShip.offsetLeft + (myShip.offsetWidth / 2));
    fireme.ypos = myShip.offsetTop - 10;
    fireme.style.left = fireme.xpos + "px";
    fireme.style.top = fireme.ypos + "px";
}