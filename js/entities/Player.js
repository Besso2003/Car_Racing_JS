// js/entities/Player.js
//==================== Player.js =================//
import { LANES } from "../core/constants.js";

export default class Player {
    constructor() {
        this.currentLane = 1; // Start in middle lane
        this.x = LANES[this.currentLane];

        this.element = document.getElementById("player-car");
        this.isMoving = false;

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
        this.lockMovement();
    }

    moveRight() {
        if (this.isMoving) return;
        if (this.currentLane >= LANES.length - 1) return;

        this.currentLane++;
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

    getCurrentLane() {
        return this.currentLane;
    }

    getPosition() {
        return {
            x: this.x,
            lane: this.currentLane
        };
    }
}