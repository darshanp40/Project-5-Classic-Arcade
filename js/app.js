const CONSTANTS = {
    CANVAS_WIDTH: 505,
    CANVAS_HEIGHT: 606,
    PLAYER_INITIAL_X: 202,
    PLAYER_INITIAL_Y: 383,
    NO_OF_ENEMIES: 3
};
// Enemies our player must avoid
var Enemy = function(posX, posY,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = posX;
    this.y = posY;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= CONSTANTS.CANVAS_WIDTH) {
        this.x = 0;
    }
    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    document.addEventListener('click', function(e){
        console.log(e);
    });
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(posX, posY, speed) {
    this.sprite = 'images/char-boy.png';
    this.x = posX;
    this.y = posY;
    this.speed = speed;
};
Player.prototype.update = function() {

};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 20;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 20;
    }
    console.log('keyPress is: ' + keyPress);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 20;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 20;
    }
    console.log('keyPress is: ' + keyPress);
};

var checkCollision = function(anEnemy) {
    // check for collision between enemy and player
    if (
        player.y + 131 >= anEnemy.y + 90
        && player.x + 25 <= anEnemy.x + 88
        && player.y + 73 <= anEnemy.y + 135
        && player.x + 76 >= anEnemy.x + 11) {
        console.log('collided');
        player.x = 202.5;
        player.y = 383;
    }

    if (player.y + 63 <= 0) {        
        player.x = 202.5;
        player.y = 383;
        console.log('you made it!');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, 171);
    }

    if (player.y > 383 ) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(CONSTANTS.PLAYER_INITIAL_X, CONSTANTS.PLAYER_INITIAL_Y, 100);
var enemy;
for (var index = 0; index < CONSTANTS.NO_OF_ENEMIES; index++) {
    enemy = new Enemy(0, Math.random() * 184 + 50, getRandomArbitrary(50,250));
    allEnemies.push(enemy);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
