class StorageManager {
    constructor() {
        this.bestScoreKey = 'carRacingBestScore';
        this.bestScore = parseInt(localStorage.getItem(this.bestScoreKey)) || 0;
    }
    
    saveBestScore(score) {
        if (score > this.bestScore) {
            this.bestScore = score;
            localStorage.setItem(this.bestScoreKey, score.toString());
            return true; 
        }
        return false;
    }

    getBestScore() {
        return this.bestScore;
    }
    

    resetBestScore() {
        this.bestScore = 0;
        localStorage.removeItem(this.bestScoreKey);
    }
}

export default StorageManager;