import UIManager from './ui/UIManager.js';
import ScoreManager from './systems/ScoreManager.js';
import StorageManager from './storage/StorageManager.js';

// Initialize managers
const uiManager = new UIManager();
const scoreManager = new ScoreManager();
const storageManager = new StorageManager();


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

