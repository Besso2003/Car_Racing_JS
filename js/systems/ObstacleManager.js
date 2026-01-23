import Obstacle from "../entities/Obstacle.js";
import { LANES, GAME_HEIGHT } from "../core/constants.js";

export default class ObstacleManager {
  constructor() {
    this.obstacles = [];
    this.replicateTimer = 0;
    this.replicateInterval = 1500; // ms
    this.baseSpeed = 300;
    this.difficultyTimer = 0;
    this.difficultyInterval = 10000;
  }

  reset() {
    this.obstacles.forEach((o) => o.destroy());
    this.obstacles = [];
    this.replicateTimer = 0;
    this.replicateInterval = 1500;
    this.baseSpeed = 300;
    this.difficultyTimer = 0;
    this.difficultyInterval = 10000;
  }

  update(deltaTime) {
    this.replicateTimer += deltaTime;
    this.difficultyTimer += deltaTime;

    // Replicate new obstacle
    if (this.replicateTimer > this.replicateInterval) {
      this.replicateObstacle();
      this.replicateTimer = 0;
    }

    // Increase difficulty every 10 seconds
    if (this.difficultyTimer > this.difficultyInterval) {
      this.increaseDifficulty();
      this.difficultyTimer = 0;
    }
    if (this.obstacles.length === 0) {
      this.replicateObstacle(); // FORCE replication if no obstacles
    }

    // Update obstacles
    this.obstacles.forEach((obstacle) => obstacle.update(deltaTime));

    // Remove off-screen obstacles
    this.obstacles = this.obstacles.filter((obstacle) => {
      if (obstacle.isOutOfScreen(GAME_HEIGHT)) {
        obstacle.destroy();
        return false;
      }
      return true;
    });
  }

  replicateObstacle() {
    const laneIndex = Math.floor(Math.random() * LANES.length);
    const obstacle = new Obstacle(laneIndex, LANES, this.baseSpeed);
    this.obstacles.push(obstacle);
  }

  increaseDifficulty() {
    this.baseSpeed += 50;

    if (this.replicateInterval > 600) {
      this.replicateInterval -= 150;
    }
  }

  getObstacles() {
    return this.obstacles;
  }
  render() {
    this.obstacles.forEach((obstacle) => obstacle.updatePosition());
  }
}
