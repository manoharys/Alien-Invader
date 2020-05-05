const startBtn = document.querySelector('.startBtn');
const container = document.querySelector('.container');
const fireme = document.querySelector('.fireme');
const scoreOutput = document.querySelector('.score');
const myShip = document.querySelector('.myShip');
startBtn.addEventListener('click', start);

//Getting container dimension..
let containerDim = container.getBoundingClientRect();

//Player Object
let player = {
    score: 0,
    speed: 3,
    alienSpeed: 30,
    gameOver: true,
    fire: false
}

//Objects which tracks keyPresses
let keys = {};

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


//Function which starts gamePlay
function start() {
    if (player.gameOver) {
        startBtn.classList.add('hide');
        myShip.classList.remove('hide')
        //fireme.classList.remove('hide')
        clearAliens();
        setupAliens(9);
        player.gameOver = false;
        console.log("game started");
        player.x = myShip.offsetLeft;
        player.y = myShip.offsetTop;
        console.log(player);
        window.requestAnimationFrame(update);
    }
}




function update() {
    if (!player.gameOver) {
        let tempAliens = document.querySelectorAll(".alien");
        for (let x = tempAliens.length - 1; x > -1; x--) {
            let el = tempAliens[x];
            if (el.xpos > ((containerDim.width-50) - el.offsetWidth) || el.xpos < containerDim.left) {
                el.directionMove *= -1;
                el.ypos += 40;
                if (el.ypos > (myShip.offsetTop - 50)) {
                    console.log("Game Over");
                    player.gameOver = true;
                    gameOver();
                }
            }
            el.xpos += (player.alienSpeed * el.directionMove);
            el.style.left = el.xpos + "px";
            el.style.top = el.ypos + "px";
        }
        if (player.fire) {
            if (fireme.ypos > 0) {
                fireme.ypos -= 25;
                fireme.style.top = fireme.ypos + "px";
            } else {
                player.fire = false;
                fireme.classList.add('hide');
                fireme.style.top = (containerDim + 100) + 'px';
            }
        }
        if (keys.ArrowUp || keys.Space) {
            if (!player.fire) {
                addShoot();
            }
        }
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

//function which creats aleins

function setupAliens(num) {
    let tempWidth = 70;
    let lastCol = containerDim.width - tempWidth;
    let row = {
        x: containerDim.left + 50,
        y: 50
    }
    for (let x = 0; x < num; x++) {
        if (row.x > (lastCol - tempWidth)) {
            row.y += 70;
            row.x = containerDim.left + 50
        }
        alienMaker(row, tempWidth);
        row.x += tempWidth + 20;
    }
}

function randomColor() {
    return "#" + Math.random().toString(16).substr(-6);
}

function alienMaker(row, tempWidth) {
    console.log(row);
    let div = document.createElement("div");
    div.classList.add("alien");
    div.style.backgroundColor = randomColor();
    let eye1 = document.createElement("span");
    eye1.classList.add("eye");
    eye1.style.left = "10px";
    div.appendChild(eye1);
    let eye2 = document.createElement("span");
    eye2.classList.add("eye");
    eye2.style.right = "10px";
    div.appendChild(eye2);
    let mouth = document.createElement("span");
    mouth.classList.add("mouth");
    div.appendChild(mouth);
    div.style.width = tempWidth + "px";
    div.xpos = Math.floor(row.x);
    div.ypos = Math.floor(row.y);
    div.style.left = div.xpos + "px";
    div.style.top = div.ypos + "px";
    div.directionMove = 1;
    container.appendChild(div);
    console.log(div);
}

function gameOver() {
    startBtn.style.display = "block";
    startBtn.innerHTML = "Restart New Game";
}

function clearAliens() {
    let tempAliens = document.querySelectorAll(".alien");
    for (let x = 0; x < tempAliens.length; x++) {
        tempAliens[x].parentNode.removeChild(tempAliens[x]);
    }
}