// js/main.js
import Player from "./entities/Player.js";
import RoadManager from "./entities/RoadManager.js";
import UIManager from "./ui/UIManager.js";
import ScoreManager from "./systems/ScoreManager.js";
import StorageManager from "./storage/StorageManager.js";

// Initialize managers
let player = null;
let roadManager = null;
let isGameRunning = false;

const uiManager = new UIManager(null);
const scoreManager = new ScoreManager();
const storageManager = new StorageManager();

const engine = new GameEngine({
  player,
  obstacleManager,
  collisionSystem,
  scoreManager,
  uiManager,
});

uiManager.updateBestScore(storageManager.getBestScore());

// Set up UI callbacks
uiManager.setStartGameCallback(() => {
  engine.start();
});

uiManager.setRestartGameCallback(() => {
  engine.restart();
});

/*
function startGame() {

  scoreManager.startScoring();
  uiManager.showGameScreen();
  gameLoop();
}

function restartGame() {
  scoreManager.resetScore();
  uiManager.showStartScreen();
  // Reset any game state here
}

function gameLoop() {
  if (uiManager.currentScreen === "game") {
    scoreManager.updateScore();
    uiManager.updateCurrentScore(scoreManager.getCurrentScore());

    requestAnimationFrame(gameLoop);
  }
}

*/

uiManager.showGameScreen();

// Initialize player
player = new Player();
uiManager.player = player;

// Initialize road manager
roadManager = new RoadManager();

// Setup input controls
setupControls();

// Reset and start scoring
scoreManager.resetScore();
scoreManager.startScoring();

// Start game loop
isGameRunning = true;
gameLoop();

function restartGame() {
  isGameRunning = false;

  // Save best score
  const currentScore = scoreManager.getCurrentScore();
  const bestScore = storageManager.getBestScore();
  if (currentScore > bestScore) {
    storageManager.saveBestScore(currentScore);
  }

  scoreManager.resetScore();
  uiManager.showStartScreen();

  // Clean up
  player = null;
  uiManager.player = null;
  roadManager = null;

  // Remove event listeners
  removeControls();
}

function setupControls() {
  window.addEventListener("keydown", handleKeyPress);
}

function removeControls() {
  window.removeEventListener("keydown", handleKeyPress);
}

function handleKeyPress(e) {
  if (!player || !isGameRunning) return;

  if (e.key === "ArrowLeft") {
    player.moveLeft();
  } else if (e.key === "ArrowRight") {
    player.moveRight();
  }
}

function gameLoop() {
  if (!isGameRunning || uiManager.currentScreen !== "game") {
    return;
  }

  // Update road animation
  if (roadManager) {
    roadManager.update();
  }

  // Update score
  scoreManager.updateScore();
  uiManager.updateCurrentScore(scoreManager.getCurrentScore());

  // Optionally increase road speed over time
  if (
    scoreManager.getCurrentScore() % 500 === 0 &&
    scoreManager.getCurrentScore() > 0
  ) {
    roadManager.increaseSpeed();
  }

  requestAnimationFrame(gameLoop);
}

// Handle game over (you can call this from collision detection)
window.gameOver = function () {
  isGameRunning = false;

  const currentScore = scoreManager.getCurrentScore();
  const bestScore = storageManager.getBestScore();

  if (currentScore > bestScore) {
    storageManager.saveBestScore(currentScore);
    uiManager.updateBestScore(currentScore);
  }

  uiManager.showGameOverScreen(currentScore);
};
