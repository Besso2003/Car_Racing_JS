export default class Obstacle {
  constructor(laneIndex, lanePositions, speed) {
    this.laneIndex = laneIndex;
    this.x = lanePositions[laneIndex];
    this.y = -100; // start above screen
    this.width = 200;
    this.height = 150;
    this.speed = speed;

    // Create DOM element
    this.element = document.createElement("div");
    this.element.classList.add("obstacle");

    // Random color (bonus requirement)
    const colors = ["red", "blue", "yellow", "green"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.element.style.backgroundColor = this.color;

    this.updatePosition();
    document.querySelector(".road").appendChild(this.element); 
  }

  update(deltaTime) {
    this.y += this.speed * (deltaTime / 1000); // Move downwards with speed and deltaTime
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`; // Use css gpu transform for better performance while animating, translate(x,y) sets the transformation to a new position
  }

  isOutOfScreen(screenHeight) {
    return this.y > screenHeight;
  }

  destroy() {
    this.element.remove();
  }
}
