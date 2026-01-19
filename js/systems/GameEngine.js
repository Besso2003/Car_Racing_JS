const GAME_STATE = {
  START: "START",
  RUNNING: "RUNNING",
  GAME_OVER: "GAME_OVER",
};

export default class GameEngine {
  constructor(dependencies) {
    this.player = dependencies.player;
    this.obstacleManager = dependencies.obstacleManager;
    this.collisionSystem = dependencies.collisionSystem;
    this.scoreManager = dependencies.scoreManager;
    this.uiManager = dependencies.uiManager;

    this.state = GAME_STATE.START;
    this.lastFrameTime = 0;
    this.isRunning = false;
  }

  start() {
    this.reset();
    this.state = GAME_STATE.RUNNING;
    this.isRunning = true;
    this.lastFrameTime = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(timestamp) {
    if (!this.isRunning) return;

    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame(this.loop.bind(this));
  }

  update(deltaTime) {
    this.player.update(deltaTime);
    this.obstacleManager.update(deltaTime);
    this.collisionSystem.check();

    if (this.collisionSystem.hasCollision()) {
      this.gameOver();
    }

    this.scoreManager.update(deltaTime);
  }

  render() {
    this.uiManager.render();
  }

  gameOver() {
    this.isRunning = false;
    this.state = GAME_STATE.GAME_OVER;

    this.scoreManager.stop();
    this.uiManager.showGameOver(this.scoreManager.getScore());
  }

  reset() {
    this.player.reset();
    this.obstacleManager.reset();
    this.scoreManager.reset();
    this.uiManager.reset();
  }

  restart() {
    this.start();
  }
}
