const board = document.querySelector(".board")
const modal = document.querySelector(".modal")
const startGameModal = document.querySelector(".start-game")
const gameOverModal = document.querySelector(".game-over")
const startButton = document.querySelector(".btn-start")
const restartButton = document.querySelector(".btn-restart")

const highScoreElement = document.querySelector("#high-score")
const scoreElement = document.querySelector("#score")
const timeElement = document.querySelector("#time")

let blockWidth = 50;
let blockHeight = 50;

let score = 0;
let highScore = localStorage.getItem("highscore") || 0
let time = `00-00`

highScoreElement.textContent = highScore;

let blocks = [];

let snake = [{
    x: 1, y: 3
}, 
]

let intervalId = null
let timeIntervalId = null
let direction = "right"

let cols = Math.floor(board.clientWidth / blockWidth);
let rows = Math.floor(board.clientHeight / blockHeight);

let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }


// /Creating Blocks Logic
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        let block = document.createElement('div')
        block.classList.add("block")
        board.append(block)
        // block.innerText = `${row}-${col}`
        blocks[`${row}-${col}`] = block;
    }
}


// Render Snake Logic
function renderSnake() {
    let snakeHead = null;

    blocks[`${food.x}-${food.y}`].classList.add("food")

    if (direction === "left") {
        snakeHead = { x: snake[0].x, y: snake[0].y - 1 }
    }

    else if (direction === "right") {
        snakeHead = { x: snake[0].x, y: snake[0].y + 1 }
    }

    else if (direction === "up") {
        snakeHead = { x: snake[0].x - 1, y: snake[0].y }
    }

    else if (direction === "down") {
        snakeHead = { x: snake[0].x + 1, y: snake[0].y }
    }

    // Collision logic
    if (snakeHead.x < 0 || snakeHead.x >= rows || snakeHead.y < 0 || snakeHead.y >= cols) {
        clearInterval(intervalId)

        modal.style.display = "flex"
        startGameModal.style.display = "none"
        gameOverModal.style.display = "flex"

        return;

    }

    // Food Consume logic
    if(food.x == snakeHead.x && food.y == snakeHead.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}
        blocks[`${food.x}-${food.y}`].classList.add("food")

        score += 10
        scoreElement.textContent = score;

        if(score > highScore){
            highScore = score;
            localStorage.setItem("highscore", highScore.toString())
        }

        snake.unshift(snakeHead)
    }


    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
    })

    let headBlock = blocks[`${snakeHead.x}-${snakeHead.y}`];
    gsap.fromTo(
        headBlock,
        { scale: 0.6 },
        { scale: 1, duration: 0.15, ease: "power2.out" }
    );


    snake.unshift(snakeHead)
    snake.pop()

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill")
    })


}


startButton.addEventListener("click", () => {
    modal.style.display = "none"
    intervalId = setInterval( () => {
        renderSnake()
    },300)

    timeIntervalId = setInterval(() => {
        let [min, sec] = time.split("-").map(Number)

        if(sec == 59){
            min +=1;
            sec = 0;
        }else{
            sec += 1;
        }

        time = `${min}-${sec}`
        timeElement.textContent = time;
    },1000)
})

restartButton.addEventListener("click", restartGame)


// ======= Restar Game ========= 
function restartGame(){

    blocks[`${food.x}-${food.y}`].classList.remove("food")

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
    })

    modal.style.display = "none"
    snake = [{
        x: 1, y: 3
    }]

    food = {x:Math.floor(Math.random() * rows), y:Math.floor(Math.random() * cols)}
    
    direction = "right";
    score = 0;
    time = `00-00`

    scoreElement.textContent = score;
    highScoreElement.textContent = highScore
    timeElement.textContent = time;

    intervalId = setInterval(() => {
        renderSnake()
    }, 300);

}



addEventListener("keydown", (event) => {
    console.log(event.key);

    if (event.key == "ArrowUp") {
        direction = "up"
    }

    else if (event.key == "ArrowDown") {
        direction = "down"
    }

    else if (event.key == "ArrowLeft") {
        direction = "left"
    }

    else if (event.key == "ArrowRight") {
        direction = "right"
    }
})

// localStorage.clear()