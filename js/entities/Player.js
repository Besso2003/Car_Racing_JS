import { LANE_PERCENTAGES as LANES } from "../core/constants.js";

export default class Player {
  constructor() {
    this.currentLane = 1; // Start in middle lane
    this.x = LANES[this.currentLane];

    this.element = document.getElementById("player-car");
    this.isMoving = false;

    // Load tire sound
    this.tireSound = new Audio("../sounds/tire_skid.m4a");
    this.tireSound.volume = 0.3;

    // Position the car in the center of the road
    this.render();
  }

  render() {
    if (this.element) {
      this.element.style.left = `${LANES[this.currentLane]}%`;
    }
  }

  moveLeft() {
    if (this.isMoving) return;
    if (this.currentLane <= 0) return;

    this.currentLane--;
    this.playTireSound();
    this.lockMovement();
  }

  moveRight() {
    if (this.isMoving) return;
    if (this.currentLane >= LANES.length - 1) return;

    this.currentLane++;
    this.playTireSound();
    this.lockMovement();
  }

  lockMovement() {
    this.isMoving = true;
    this.x = LANES[this.currentLane];
    this.render();

    setTimeout(() => {
      this.isMoving = false;
    }, 150);
  }

  playTireSound() {
    // Play from start each time
    this.tireSound.currentTime = 0;
    this.tireSound.play();
  }

  getCurrentLane() {
    return this.currentLane;
  }

  getPosition() {
    return {
      x: this.x,
      lane: this.currentLane,
    };
  }

  getBoundingBox() {
    const rect = this.element.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };
  }

  reset() {
    this.currentLane = 1;
    this.render();
  }
}
