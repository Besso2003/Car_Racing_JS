class ScoreManager {
    constructor() {
        this.currentScore = 0;
        this.startTime = 0;
        this.isRunning = false;
        this.scoreMultiplier = 10;
    }
    
    startScoring() {
        this.currentScore = 0;
        this.startTime = Date.now();
        this.isRunning = true;
    }
    
    updateScore() {
        if (!this.isRunning) return this.currentScore;
        
        const currentTime = Date.now();
        const elapsedSeconds = (currentTime - this.startTime) / 1000;
        this.currentScore = elapsedSeconds * this.scoreMultiplier;
        
        return this.currentScore;
    }
    
    stopScoring() {
        this.isRunning = false;
        return this.currentScore;
    }
    
    getCurrentScore() {
        return Math.floor(this.currentScore);
    }
    
    resetScore() {
        this.currentScore = 0;
        this.startTime = 0;
        this.isRunning = false;
    }
}

export default ScoreManager;