export default class CollisionSystem {
  constructor(player, obstacleManager) {
    this.player = player;
    this.obstacleManager = obstacleManager;
  }

   //Checks collision between player and obstacles
  check() {
    const playerBox = this.player.getBoundingBox();
    const obstacles = this.obstacleManager.getObstacles();

    for (let obstacle of obstacles) {
      const obstacleBox = obstacle.getBoundingBox();

      if (this.isColliding(playerBox, obstacleBox)) {
        return true;
      }
    }

    return false;
  }

  //Axis-Aligned Bounding Box collision detection
  isColliding(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }
}
