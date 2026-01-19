import UIManager from "./ui/UIManager.js";
import ScoreManager from "./systems/ScoreManager.js";
import StorageManager from "./storage/StorageManager.js";
import GameEngine from "./systems/GameEngine.js";

// Initialize managers
const uiManager = new UIManager();
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
