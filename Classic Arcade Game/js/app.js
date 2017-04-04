'use strict';
//returns a random intiger between to set numbers
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
// Enemies our player must avoid
var Enemy = function(x, y, sprite) {
	this.sprite = "images/enemy-bug.png";
	this.x = x;
	this.y = y;
	this.speed = getRandomInt(50, 250);
};
// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
	this.x += this.speed * dt;
	if (this.x > 503) {
		this.x = -20;
		this.speed = getRandomInt(50, 250);
	}
	//collisionCheck
	if (Math.abs(player.x - this.x) < 40 && Math.abs(player.y - this.y) < 40) {
		player.playerReset();
		player.lives -= 1;
		player.score -= 50;
	}
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Player class
var Player = function(x, y, playerSprite) {
	this.playerSprite = "images/char-boy.png";
	this.x = x;
	this.y = y;
	this.score = 0;
	this.lives = 3;
};
//Resets game board when player makes it to the water aka win
Player.prototype.update = function() {
	if (this.y < 1) {
		this.score += 100;
		this.playerReset();
		allEnemies.push(new Enemy(getRandomInt(-100, 0), getRandomInt(30, 250))); //adds another enemy to game everytime you win
		allGems = [new Gem(), //adds new gems to board
			new Gem(), new Gem(), new Gem()
		];
	}
};
//Resets player to starting position
Player.prototype.playerReset = function() {
	this.x = 205;
	this.y = 350;
};
//renders player, score, and lives to the canvas.
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.playerSprite), this.x, this.y);
	this.addScore();
	this.addLives();
	if (this.lives <= 0) {
		//ends game if out of lives
		gameOver(); //Add large "Game Over" to board
		setTimeout(function() {
			location.reload();
		}, 5000); //delays restarting game
	}
};
//uses handleInput() to move player around board
Player.prototype.handleInput = function(allowedKeys) {
	var toFarRightDown = 400;
	var	toFarLeftUp = 0;
	if (allowedKeys === "left") {
		this.x -= 50;
		if (this.x < toFarLeftUp) {
			this.x = toFarLeftUp;
		}
	}
	if (allowedKeys === "up") {
		this.y -= 50;
		if (this.y < toFarLeftUp) {
			this.y = toFarLeftUp;
		}
	}
	if (allowedKeys === "right") {
		this.x += 50;
		if (this.x > toFarRightDown) {
			this.x = toFarRightDown;
		}
	}
	if (allowedKeys === "down") {
		this.y += 50;
		if (this.y > toFarRightDown) {
			this.y = toFarRightDown;
		}
	}
};
//Gem Class
var Gem = function(x, y) {
	var gemImage = ["images/gemGreen.png", "images/Gem Blue.png", "images/Gem Orange.png", "images/Star.png", "images/key.png", "images/Heart.png"];
	var selection = gemImage[Math.floor(Math.random() * gemImage.length)]; //selects random gem from array
	this.gem = selection;
	this.x = getRandomInt(10, 400);
	this.y = getRandomInt(10, 270);
};
//Removes gems you have picked up from the board and sets their point value
Gem.prototype.update = function() {
	if (Math.abs(player.x - this.x) < 30 && Math.abs(player.y - this.y) < 30) {
		if (this.gem === "images/gemGreen.png" || this.gem === "images/Gem Blue.png" || this.gem === "images/Gem Orange.png") {
			player.score += 50;
			this.x = -100;
		} else if (this.gem === "images/key.png" || this.gem === "images/Heart.png") {
			player.score += 100;
			this.x = -100;
		} else {
			player.score += 500;
			this.x = -100;
		}
	}
};
// Render gems to the page
Gem.prototype.render = function() {
	ctx.drawImage(Resources.get(this.gem), this.x, this.y);
};
//Scoreboard
Player.prototype.addScore = function() {
	ctx.clearRect(1, 590, 500, 300);
	ctx.font = "20px Arial";
	ctx.fillStyle = "#000000";
	ctx.textAlign = "left";
	ctx.fillText("Score: " + player.score, 4, 540);
};
//add live count down to the game
Player.prototype.addLives = function() {
		ctx.clearRect(1, 590, 500, 300);
		ctx.font = "20px Arial";
		ctx.fillStyle = "#000000";
		ctx.textAlign = "right";
		ctx.fillText("Lives: " + player.lives, 497, 540);
	};
	//Tells players the game has ended
var gameOver = function() {
		ctx.clearRect(1, 590, 500, 300);
		ctx.font = "80px Arial";
		ctx.fillStyle = "#000000";
		ctx.textAlign = "center";
		ctx.fillText("GAME OVER", 250, 200);
	};
	//instantiating objects.
	//add enemy bugs to the game
var allEnemies = [new Enemy(getRandomInt(-1000, 0), getRandomInt(30, 90)), new Enemy(getRandomInt(-300, 0), getRandomInt(100, 190)), new Enemy(getRandomInt(-700, 0), getRandomInt(200, 250))];
//add gems to the GAME
var allGems = [new Gem(), new Gem(), new Gem(), new Gem()];
//player start location
var player = new Player(205, 350);
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
