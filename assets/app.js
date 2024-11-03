var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
var box = 20; // Size of each box
var score = 0;
var speed = 100; // Default speed
var game; // Game loop variable

var snake = [{ x: 9 * box, y: 9 * box }];
var direction = 'RIGHT';
var fruit;

document.addEventListener('keydown', changeDirection);
document.getElementById('difficulty').addEventListener('change', changeDifficulty);
document.getElementById('startButton').addEventListener('click', startGame);

// Touch controls
document.getElementById('upButton').addEventListener('click', () => changeDirection({ key: 'ArrowUp' }));
document.getElementById('downButton').addEventListener('click', () => changeDirection({ key: 'ArrowDown' }));
document.getElementById('leftButton').addEventListener('click', () => changeDirection({ key: 'ArrowLeft' }));
document.getElementById('rightButton').addEventListener('click', () => changeDirection({ key: 'ArrowRight' }));

function generateFruit() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
}

function changeDifficulty() {
    var difficulty = document.getElementById('difficulty').value;
    if (difficulty) {
        speed = parseInt(difficulty);
        document.getElementById('startButton').disabled = false; // Enable start button
    } else {
        document.getElementById('startButton').disabled = true; // Disable start button
    }
}

function startGame() {
    fruit = generateFruit(); // Generate the first fruit
    score = 0; // Reset score
    document.getElementById('score').innerText = score; // Display score
    snake = [{ x: 9 * box, y: 9 * box }]; // Reset snake position
    direction = 'RIGHT'; // Reset direction
    game = setInterval(draw, speed); // Start the game loop
}

function changeDirection(event) {
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
}

function collision(head, array) {
    for (var i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(fruit.x, fruit.y, box, box);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    if (snakeX === fruit.x && snakeY === fruit.y) {
        score++;
        document.getElementById('score').innerText = score; // Update score display
        fruit = generateFruit();
    } else {
        snake.pop();
    }

    var newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over! Score: " + score);
        document.location.reload();
    }

    snake.unshift(newHead);
}






