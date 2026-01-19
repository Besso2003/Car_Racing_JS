export default class Player {
  constructor() {
    this.currentLane = 1;
    this.x = LANES[this.currentLane];
    this.y = PLAYER_Y;

    this.element = document.getElementById("player-car");
    this.render();
  }

  render() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  moveLeft() {
    if (this.currentLane > 0) {
      this.currentLane--;
      this.x = LANES[this.currentLane];
      this.render();
    }
  }

  moveRight() {
    if (this.currentLane < LANES.length - 1) {
      this.currentLane++;
      this.x = LANES[this.currentLane];
      this.render();
    }
  }
}
