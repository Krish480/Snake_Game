const board = document.querySelector(".board")

let blockWidth = 50;
let blockHeight = 50;

let blocks = [];

let snake = [{
    x: 1, y: 3
}, {
    x: 1, y: 4
}, {
    x: 1, y: 5
}
]

let direction = "right"

let cols = Math.floor(board.clientWidth / blockWidth);
let rows = Math.floor(board.clientHeight / blockHeight);

let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        let block = document.createElement('div')
        block.classList.add("block")
        board.append(block)
        block.innerText = `${row}-${col}`
        blocks[`${row}-${col}`] = block;
    }
}

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

    if (snakeHead.x < 0 || snakeHead.x >= rows || snakeHead.y < 0 || snakeHead.y >= cols) {
        alert("Game Over..!")
        clearInterval(intervalId)
    }

    if(food.x == snakeHead.x && food.y == snakeHead.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}
        blocks[`${food.x}-${food.y}`].classList.add("food")

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

let intervalId = setInterval(() => {
    renderSnake()

}, 500)


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

