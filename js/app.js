const CONSTANTS = {
  CANVAS_WIDTH: 505,
  CANVAS_HEIGHT: 606,
  PLAYER_INITIAL_X: 202,
  PLAYER_INITIAL_Y: 383,
  BOTTOM_THRESHOLD: 383,
  TOP_THRESHOLD: 0,
  LEFT_THRESHOLD: 2,
  RIGHT_THRESHOLD: 402,
  PLAYER_SHIFT_THRESHOLD: 40,
  NO_OF_ENEMIES: 3
};

// Enemies our player must avoid
var Enemy = function(posX, posY, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
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
  player.updateInformation(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(posX, posY, speed) {
  this.sprite = "images/char-boy.png";
  this.x = posX;
  this.y = posY;
  this.speed = speed;
};

Player.prototype.update = function() {
  // TODO future purpose
};

// Updates the player's position based on the key pressed
// Parameter: keyPress, key pressed by the player
Player.prototype.handleInput = function(keyPress) {
  var shift = player.speed - CONSTANTS.PLAYER_SHIFT_THRESHOLD;
  if (keyPress == "left") {
    player.x -= shift;
  }
  if (keyPress == "up") {
    player.y -= shift;
  }
  if (keyPress == "right") {
    player.x += shift;
  }
  if (keyPress == "down") {
    player.y += shift;
  }
};

// Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// updateInformation the player position
// Parameter: enemy, parameter to check the collision with
Player.prototype.updateInformation = function(enemy) {
  // Player collides with one of the enemies
  if (this.y + 131 >= enemy.y + 90 && this.x + 25 <= enemy.x + 88 && this.y + 73 <= enemy.y + 135 && this.x + 76 >= enemy.x + 11) {
    this.x = CONSTANTS.PLAYER_INITIAL_X;
    this.y = CONSTANTS.PLAYER_INITIAL_Y;
  }

  // Player wins the game
  if (this.y <= CONSTANTS.TOP_THRESHOLD) {
    this.x = CONSTANTS.PLAYER_INITIAL_X;
    this.y = CONSTANTS.PLAYER_INITIAL_Y;
  }

  // Player is at the bottom
  if (this.y > CONSTANTS.BOTTOM_THRESHOLD) {
    this.y = CONSTANTS.BOTTOM_THRESHOLD;
  }

  // Player is at the rightmost place
  if (this.x > CONSTANTS.RIGHT_THRESHOLD) {
    this.x = CONSTANTS.RIGHT_THRESHOLD;
  }

  // Player is at the leftmost place
  if (this.x < CONSTANTS.LEFT_THRESHOLD) {
    this.x = CONSTANTS.LEFT_THRESHOLD;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(
  CONSTANTS.PLAYER_INITIAL_X,
  CONSTANTS.PLAYER_INITIAL_Y,
  80
);
var enemy;
// randomly generate the enemies
for (var index = 0; index < CONSTANTS.NO_OF_ENEMIES; index++) {
  enemy = new Enemy(0, Math.random() * 190 + 50, getRandomArbitrary(50, 250));
  allEnemies.push(enemy);
}
// Generates random numbers between the provided range
// Parameter: min, lower value of the range
// Parameter: max, upper value of the range
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
