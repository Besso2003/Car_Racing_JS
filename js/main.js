import UIManager from './ui/UIManager.js';
import ScoreManager from './systems/ScoreManager.js';
import StorageManager from './storage/StorageManager.js';

import Obstacle from "./entities/Obstacle.js";
import ObstacleManager from './systems/ObstacleManager.js';
import { LANES, GAME_HEIGHT } from "./core/constants.js";

// Initialize managers
const uiManager = new UIManager();
const scoreManager = new ScoreManager();
const storageManager = new StorageManager();
const obstacleManager = new ObstacleManager();


uiManager.updateBestScore(storageManager.getBestScore());

// Set up UI callbacks
uiManager.setStartGameCallback(() => {
    startGame();
});

uiManager.setRestartGameCallback(() => {
    restartGame();
});

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
    if (uiManager.currentScreen === 'game') {
        scoreManager.updateScore();
        uiManager.updateCurrentScore(scoreManager.getCurrentScore());

        requestAnimationFrame(gameLoop);
    }
}

let lastTime = performance.now();

function obstacleLoop(time) {
  const deltaTime = time - lastTime;
  lastTime = time;

  obstacleManager.update(deltaTime);
  requestAnimationFrame(obstacleLoop);
}

requestAnimationFrame(obstacleLoop);