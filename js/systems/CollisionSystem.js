export default class CollisionSystem {
  constructor(player, obstacleManager) {
    this.player = player;
    this.obstacleManager = obstacleManager;

    // Load collision sound
    this.collisionSound = new Audio("../sounds/collision_sound.m4a");
    this.collisionSound.volume = 0.2;

    // Prevent repeated triggering
    this.hasCollided = false;
  }

  // Checks collision between player and obstacles
  check() {
    const playerBox = this.player.getBoundingBox();
    const obstacles = this.obstacleManager.getObstacles();

    for (let obstacle of obstacles) {
      const obstacleBox = obstacle.getBoundingBox();

      if (this.isColliding(playerBox, obstacleBox)) {
        if (!this.hasCollided) {
          this.playCollisionSound();
          this.hasCollided = true;
        }
        return true;
      }
    }

    // Reset if no collision (for next round / restart)
    this.hasCollided = false;
    return false;
  }

  playCollisionSound() {
    this.collisionSound.currentTime = 0;
    this.collisionSound.play();
  }

  // Axis-Aligned Bounding Box collision detection
  isColliding(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }
}
