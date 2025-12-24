# 🐍 Snake Game (JavaScript)

A classic **Snake Game** built using **Vanilla JavaScript, HTML, and CSS**.  
This project focuses on implementing core game mechanics such as grid-based movement, real-time rendering, and keyboard input handling without using any external libraries.

---

## 🚀 Features

- Dynamic grid-based game board
- Snake movement using array-based logic
- Real-time game loop using `setInterval`
- Keyboard input handling
- Clean and readable code structure
- Beginner-friendly & interview-oriented project

---

## 🧠 Core Concepts Used

- DOM Manipulation
- Event Handling (`keydown`)
- Arrays & Objects
- Game Loop (`setInterval`)
- Coordinate-based positioning system
- Basic game state management

---

## 🛠 Tech Stack

- **HTML5**
- **CSS3**
- **JavaScript (ES6)**

---

## ⚙️ How the Game Works

1. The board is divided into equal-sized grid blocks.
2. Each snake segment is represented by an `(x, y)` coordinate.
3. The snake is stored as an array of objects.
4. On every game tick:
   - A new head is added in the current direction.
   - The last tail segment is removed.
   - The snake is re-rendered on the board.

---

## 🎮 Controls

| Key | Action |
|----|-------|
| Arrow Left | Move Left |
| Arrow Right | Move Right |
| Arrow Up | Move Up |
| Arrow Down | Move Down |

---

## 📂 Project Structure

snake-game/
│
├── index.html
├── style.css
└── script.js