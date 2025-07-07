const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20; // размер одной ячейки
const canvasSize = 400;

let snake = [{ x: 160, y: 160 }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * (canvasSize / box)),
    y: Math.floor(Math.random() * (canvasSize / box)),
};
let score = 0;
let gameInterval;

document.addEventListener("keydown", setDirection);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем змейку
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "lime";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Рисуем еду
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * box, food.y * box, box, box);

    // Перемещаем змейку
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "UP") headY -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "DOWN") headY += box;

    // Проверка столкновения со стеной
    if (
        headX < 0 ||
        headY < 0 ||
        headX >= canvasSize ||
        headY >= canvasSize ||
        collision(headX, headY, snake)
    ) {
        clearInterval(gameInterval);
        document.querySelector(".game-over").classList.remove("hidden");
        return;
    }

    // Проверка поедания еды
    if (headX === food.x * box && headY === food.y * box) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvasSize / box)),
            y: Math.floor(Math.random() * (canvasSize / box)),
        };
    } else {
        snake.pop();
    }

    const newHead = { x: headX, y: headY };
    snake.unshift(newHead);
}

function collision(x, y, array) {
    for (let i = 0; i < array.length; i++) {
        if (x === array[i].x && y === array[i].y) {
            return true;
        }
    }
    return false;
}

function setDirection(event) {
    const key = event.key;
    if (key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    } else if (key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }
}

// Запуск игры
gameInterval = setInterval(draw, 100);