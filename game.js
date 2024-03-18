// calling the canvas element and setting it up
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//setting the canvas width and height to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

 
// for background 
class Background {
    constructor({position, imageSrc}) {
        this.position = position
        this.width = 1366
        this.height = 576
        this.image = new Image()
        this.image.src = imageSrc
    }
    // Draws background first in canvas
    draw() {
        c.drawImage(this.image, 0, 0, this.width, this.height, 0, 0, canvas.width, canvas.height);
    }
       

    update() {
        this.draw()
    }
}

// Start Position of both players and their elements
const gravity = 0.7;
class Sprite {
    constructor(position, fall, playerType) {
        this.position = position;
        this.fall = fall;
        this.height = 150;
        this.lastKey;
        this.fy = 0;
        this.fx = 0;
        this.gf = 0;
        this.sf = 12;
        this.spriteWidth = 256;
        this.spriteHeight = 256;
        this.playerImage = new Image();
        this.playerImage.src = playerType === 'player1' ? 'dogs.png' : '';
        this.player2 = new Image();
        this.player2.src = playerType === 'player2' ? 'dogs1.png' : '';
        this.collided = false; 
        this.collideDelay = 60; 
        this.collideTimer = 0;
    }

    //draws the players after the background

    //This is for player 1
    draw() {
        c.drawImage(this.playerImage, this.fx * this.spriteWidth, this.fy * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, 150, this.height);
    
        c.drawImage(
            this.playerImage, 
            this.fx * this.spriteWidth, 
            this.fy * this.spriteHeight, 
            this.spriteWidth, 
            this.spriteHeight, 
            this.position.x, 
            this.position.y, 
            150, 
            this.height
    )}
        
    // and this is for player 2
    drawt() {
        c.drawImage(this.player2, this.fx * this.spriteWidth, this.fy * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, 150, this.height);
    
        c.drawImage(
            this.player2, 
            this.fx * this.spriteWidth, 
            this.fy * this.spriteHeight, 
            this.spriteWidth, 
            this.spriteHeight, 
            this.position.x, 
            this.position.y, 
            150, 
            this.height
    )}



    refresh() {
        this.draw();
        this.drawt();
    
        // Checks boundaries
        if (this.position.x < 0) {
            this.position.x = 0;
        } else if (this.position.x > canvas.width - 100) {
            this.position.x = canvas.width - 100;
        }
        else if (this.position.y < 20){
            this.position.y = 20;
        }

    
        this.position.x += this.fall.x;
        this.position.y += this.fall.y;
        
        //will check collision
        if (this.collided) {
            this.collideTimer++;
            if (this.collideTimer >= this.collideDelay) {
                this.collided = false;
                this.collideTimer = 0;
            }
        }
    
        if (!this.collided) {
            if (this.position.y + this.height >= canvas.height) {
                this.fall.y = 0;
                this.position.y = canvas.height - this.height;
            } else {
                this.fall.y += gravity;
            }
        }
        
        //set frame speed for sprites
        if (this.gf % this.sf == 0) {
            if (this.fx < 3) {
                this.fx++;
            } else {
                this.fx = 0;
            }
        }
    
        this.gf++;
    

        if (Math.abs(this.position.x - player2.position.x) <= 100) {
            this.checkCollision(player2);
        }
    }
    
    //again collision checker
    checkCollision(otherPlayer) {
        if (!this.collided &&
            this.position.x + 100 > otherPlayer.position.x &&
            this.position.x < otherPlayer.position.x + 100 &&
            this.position.y < otherPlayer.position.y + otherPlayer.height &&
            this.position.y + this.height > otherPlayer.position.y) {
            this.collided = true;
            otherPlayer.collided = true;
           
        } else {
            this.collided = false;
            player1.collided = false;
        }
    }
    
}    

// sets the values for background
const background = new Background({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './bg.png'
})

//sets the values for players
const player1 = new Sprite({
    x: 0,
    y: 0
}, {
    x: 0,
    y: 0
}, 'player1', 'dogs.png');

const player2 = new Sprite({
    x: 1266,
    y: 0
}, {
    x: 0,
    y: 0
}, 'player2', 'dogs1.png');

// will check if the key is pressed, will return true if pressed
const key = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}
let lastKey;

// Timer to haha
let point = 500;
let timer = 30;
function decreaseTime() {
    if (timer > 0) {
        setTimeout(decreaseTime, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) { 
        if (point1 > point2) {
            document.querySelector('#result').innerHTML = "Player 1 wins. Press Enter to restart or press Backspace to quit";
            point = point + 1;
            window.addEventListener('keydown', (event) => {
                switch (event.key) {
                    case "Enter":
                        window.location.reload();
                        break;
                    case "Backspace":
                        window.close();
                        break;
                }
            })
            document.querySelector('#result').style.display = "flex";
        }
        else if (point2 > point1) {
            document.querySelector('#result').innerHTML = "Player 2 wins. Press Enter to restart or press Backspace to quit"; 
            point = point + 1;
            window.addEventListener('keydown', (event) => {
                switch (event.key) {
                    case "Enter":
                        window.location.reload(); 
                        break;
                    case "Backspace":
                        window.close();
                        break;
                }
            })
            document.querySelector('#result').style.display = "flex";
        }
    }
}
// function to call timer
decreaseTime();

// points for players 1 and 2
    let point1 = 200;
    let point2 = 0;
    function animate() {
        window.requestAnimationFrame(animate);
        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);
        background.update();
        player1.refresh();
        player2.refresh();
        
        player1.checkCollision(player2);
        if (player1.collided == true) {
            point1++
            console.log(point1);
        }
        else if (player2.collided == true) {
            point2++
            console.log(point2);
        }
        
    
        //Player 1 movement
        player1.fall.x = 0;
        if (key.a.pressed && lastKey === "a") {
            player1.fall.x = -8;
        } else if (key.d.pressed && lastKey === "d") {
            player1.fall.x = 8;
        }
    
        //Player 2 movement
        player2.fall.x = 0;
        if (key.ArrowLeft.pressed && player2.lastKey === "ArrowLeft") {
            player2.fall.x = -8;
        } else if (key.ArrowRight.pressed && player2.lastKey === "ArrowRight") {
            player2.fall.x = 8;
        }
    }
// run the function of movements(?)
animate();

//Dito na sila gagalaw hehe
//Movements for players
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            key.d.pressed = true
            lastKey = "d"
            player1.fy = 2
            break;
        case 'a':
            key.a.pressed = true
            lastKey = "a"
            player1.fy = 1
            break;
        case 'w':
            player1.fall.y = -15
            break;
        case 'ArrowRight':
            key.ArrowRight.pressed = true
            player2.lastKey = "ArrowRight"
            player2.fy = 2
            break;
        case 'ArrowLeft':
            key.ArrowLeft.pressed = true
            player2.lastKey = "ArrowLeft"
            player2.fy = 1
            break;
        case 'ArrowUp':
            player2.fall.y = -15
            break;
    }
})

//Will stop movements if keyup
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            key.d.pressed = false;
            player1.fy = 0
            break;
        case 'a':
            key.a.pressed = false;
            player1.fy = 0
            break;
        case 'ArrowRight':
            key.ArrowRight.pressed = false;
            player2.fy = 0
            break;
        case 'ArrowLeft':
            key.ArrowLeft.pressed = false;
            player2.fy = 0
            break;
    }
})