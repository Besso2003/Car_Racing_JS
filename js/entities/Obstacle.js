import { LANE_WIDTH } from "../core/constants.js";

export default class Obstacle {
  constructor(laneIndex, lanePositions, speed) {
    this.laneIndex = laneIndex;
    //this.width = this.element.offsetWidth;
    this.x = lanePositions[laneIndex] - LANE_WIDTH / 2;
    this.y = -100; // start above screen
    this.width = 180;
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
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  isOutOfScreen(screenHeight) {
    return this.y > screenHeight;
  }

  destroy() {
    this.element.remove();
  }
}
