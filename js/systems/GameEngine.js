const GAME_STATE = {
  START: "START",
  RUNNING: "RUNNING",
  GAME_OVER: "GAME_OVER",
};

export default class GameEngine {
  constructor({
    player,
    roadManager,
    obstacleManager,
    collisionSystem,
    scoreManager,
    uiManager,
    storageManager,
  }) {
    this.player = player;
    this.roadManager = roadManager;
    this.obstacleManager = obstacleManager;
    this.collisionSystem = collisionSystem;
    this.scoreManager = scoreManager;
    this.uiManager = uiManager;
    this.storageManager = storageManager;

    this.state = GAME_STATE.START;
    this.lastFrameTime = 0;
    this.running = false;
  }

  /* ================= LIFECYCLE ================= */

  start() {
    this.reset();
    this.state = GAME_STATE.RUNNING;
    this.running = true;

    this.scoreManager.startScoring();
    this.uiManager.showGameScreen();

    this.lastFrameTime = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(timestamp) {
    if (!this.running) return;

    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    this.update(deltaTime);

    requestAnimationFrame(this.loop.bind(this));
  }

  update(deltaTime) {
    if (this.state !== GAME_STATE.RUNNING) return;

    // Animate road
    this.roadManager.update();

    // Obstacles
    this.obstacleManager.update(deltaTime);

    // Collision
    if (this.collisionSystem.check()) {
      this.gameOver();
      return;
    }

    // Score
    const score = this.scoreManager.updateScore();
    this.uiManager.updateCurrentScore(score);
  }

  /* ================= GAME OVER ================= */

  gameOver() {
    this.running = false;
    this.state = GAME_STATE.GAME_OVER;

    const finalScore = this.scoreManager.stopScoring();
    let bestScore = this.storageManager.getBestScore();

    if (finalScore > bestScore) {
      bestScore = finalScore;
      this.storageManager.saveBestScore(finalScore);
      this.uiManager.updateBestScore(finalScore);
    }

    this.uiManager.showGameOverScreen(finalScore, bestScore);
  }

  /* ================= RESET / RESTART ================= */

  reset() {
    this.obstacleManager.reset();
    this.scoreManager.resetScore();
    this.roadManager.resetSpeed();
  }

  restart() {
    this.running = false;
    this.state = GAME_STATE.START;
    this.uiManager.showStartScreen();
  }

  isRunning() {
    return this.running && this.state === GAME_STATE.RUNNING;
  }
}
