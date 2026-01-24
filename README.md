# Car Racing Game

## Game Name
Car Racing

---

## Team Members
1. Bassant Ali Kamal  
2. Heba Maher Abdelrahman  
3. Ibrahim Elsayed Mostafa  
4. Mostafa Ahmed Ibrahim  
5. Sherif Mohammed Mohammed  
6. Shahd Mohammed Ramadan  

---

## Game Idea
A fast-paced arcade-style car racing game where the player controls a car moving left and right across multiple lanes to avoid incoming obstacles.  
The game gradually increases in speed and difficulty, challenging the player’s reflexes and focus.  
A single collision ends the game immediately.

---

## Game Objectives

- **Player Goal:** Survive as long as possible and achieve the highest score.
- **Win Condition:** No fixed win condition — aim for the highest score.
- **Lose Condition:** Colliding with any obstacle ends the game instantly.

---

## Features

### Mandatory Features
- Player car movement using keyboard controls (Left / Right arrows)
- Three road lanes (left, middle, right)
- Randomly generated falling obstacles
- Increasing obstacle speed over time
- Increasing number of obstacles as time progresses
- Collision detection between player and obstacles
- Score tracking based on survival time
- Best score saved using `localStorage`

### Bonus Features
- Animated road background (moving lane lines)
- Sound Effects (car moving, tires skid, collision sound)

---

## High-Level Game Flow
1. Start screen is displayed
2. Player presses **Start**
3. Game loop begins
4. Obstacles spawn and fall down the road
5. Speed and difficulty increase over time
6. Player avoids obstacles by switching lanes
7. Score increases continuously
8. Collision triggers game over
9. Final score and best score are displayed
10. Player can restart the game

---

## System Architecture (High Level)

The game is built using a **modular JavaScript architecture**, where each module has a single responsibility.

### Core Modules
- **GameEngine** – Controls game loop and state (start, running, game over)
- **Player** – Handles player movement and controls
- **ObstacleManager** – Generates and updates obstacles
- **CollisionSystem** – Detects collisions and triggers game over
- **ScoreManager** – Calculates and updates score
- **StorageManager** – Saves and loads best score
- **UIManager** – Manages screens and UI updates
- **RoadManager** – Animates the road and manages engine sound

---

## Project Structure
```
Car_Racing_JS/
│
├── index.html
├── README.md
│
├── css/
│   ├── main.css
│   ├── player.css
│   ├── road.css
│   └── ui.css
│
├── images/
│
├── sounds/
│   ├── car_moving.m4a
│   ├── car-driving.wav
│   ├── collision_sound.m4a
│   └── tire_skid.m4a
│
├── js/
│   ├── core/
│   │   └── constants.js
│   │
│   ├── entities/
│   │   ├── Player.js
│   │   └── Obstacle.js
│   │
│   ├── systems/
│   │   ├── GameEngine.js
│   │   ├── RoadManager.js
│   │   ├── ObstacleManager.js
│   │   ├── CollisionSystem.js
│   │   └── ScoreManager.js
│   │
│   ├── storage/
│   │   └── StorageManager.js
│   │
│   ├── ui/
│   │   └── UIManager.js
│   │
│   └── main.js


---

## Team Responsibilities

| Team Member | Responsibility |
|------------|----------------|
| Bassant Ali Kamal | Collision detection & game flow |
| Heba Maher Abdelrahman | Obstacle behavior & difficulty scaling |
| Ibrahim Elsayed Mostafa | Obstacle generation & logic |
| Sherif Mohammed Mohammed | UI, score handling & storage |
| Mostafa Ahmed Ibrahim | Bonus features & testing |
| Shahd Mohammed Ramadan | Player movement & controls |

---

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6 Modules)

---

## GitHub Repository
🔗 https://github.com/Besso2003/Car_Racing_JS

---
