
class UIManager {
    constructor(player) {
        this.player = player;

        this.screens = {
            start: document.getElementById('start-screen'),
            game: document.getElementById('game-screen'),
            gameOver: document.getElementById('game-over-screen')
        };

        this.elements = {
            startButton: document.getElementById('start-button'),
            restartButton: document.getElementById('restart-button'),
            currentScore: document.getElementById('current-score'),
            finalScore: document.getElementById('final-score'),
            bestScore: document.getElementById('best-score')
        };

        this.currentScreen = 'start';
        this.initializeEventListeners();
        this.setupKeyboard();
    }

    initializeEventListeners() {
        this.elements.startButton?.addEventListener('click', () => {
            this.onStartGame?.();
        });

        this.elements.restartButton?.addEventListener('click', () => {
            this.onRestartGame?.();
        });
    }

    showScreen(screenName) {
        // Hide all screens
        Object.values(this.screens).forEach(screen => {
            if (screen) screen.style.display = 'none';
        });

        // Show requested screen
        if (this.screens[screenName]) {
            this.screens[screenName].style.display = 'flex';
            this.currentScreen = screenName;
        }
    }

    updateCurrentScore(score) {
        if (this.elements.currentScore) {
            this.elements.currentScore.textContent = Math.floor(score);
        }
    }

    updateFinalScore(score) {
        if (this.elements.finalScore) {
            this.elements.finalScore.textContent = Math.floor(score);
        }
    }

    updateBestScore(score) {
        if (this.elements.bestScore) {
            this.elements.bestScore.textContent = Math.floor(score);
        }
    }

    showStartScreen() {
        this.showScreen('start');
    }

    showGameScreen() {
        this.showScreen('game');
    }

    showGameOverScreen(currentScore, bestScore) {
        this.updateFinalScore(currentScore);
        this.updateBestScore(bestScore);
        this.showScreen('gameOver');
    }

    // Callback setters
    setStartGameCallback(callback) {
        this.onStartGame = callback;
    }

    setRestartGameCallback(callback) {
        this.onRestartGame = callback;
    }


    //Shahd ==> Keyboard Handling part
    setupKeyboard() {
        window.addEventListener('keydown', (e) => {
            if (this.currentScreen !== 'game') return;

            if (!this.player) return;

            if (e.key === 'ArrowLeft') {
                this.player.moveLeft();
            }

            if (e.key === 'ArrowRight') {
                this.player.moveRight();
            }
        });
    }

}

export default UIManager;