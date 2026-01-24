// js/entities/RoadManager.js

//==================== RoadManager.js =================//
export default class RoadManager {
  constructor() {
    this.roadElement = document.querySelector('.road');
    this.leftMarker = document.querySelector('.lane-marker.left');
    this.rightMarker = document.querySelector('.lane-marker.right');
    
    this.offset = 0;
    this.speed = 5; // pixels per frame
    this.stripeHeight = 120; // height of one stripe segment
    
    // car on road sound
    this.carsound = new Audio("./sounds/car-driving.wav");
    this.carsound.loop = true;
    this.carsound.volume = 0.3;

    this.engineStarted = false;

    this.createStripes();
  }

  createStripes() {
    // Create moving stripes for left lane marker
    this.leftStripes = this.createStripeContainer(this.leftMarker);
    
    // Create moving stripes for right lane marker
    this.rightStripes = this.createStripeContainer(this.rightMarker);
  }

  createStripeContainer(parent) {
    const container = document.createElement('div');
    container.className = 'stripe-container';
    
    // Create enough stripes to fill the screen + buffer
    for (let i = 0; i < 10; i++) {
      const stripe = document.createElement('div');
      stripe.className = 'road-stripe';
      stripe.style.top = `${i * this.stripeHeight - this.stripeHeight}px`;
      container.appendChild(stripe);
    }
    
    parent.appendChild(container);
    return container;
  }

update() {
  // Update offset
  this.offset += this.speed;

  // start car sound when moving
  if (this.speed > 0 && !this.engineStarted) {
    this.carsound.play().catch(() => {});
    this.engineStarted = true;
  }

  // smooth manual loop to avoid click at the end
  if (this.carsound.duration && this.carsound.currentTime >= this.carsound.duration - 0.05) {
    this.carsound.currentTime = 0; // jump back 50ms before the end
  }
  
  // Reset when one full stripe has passed
  if (this.offset >= this.stripeHeight) {
    this.offset = 0;
  }
  
  // Update all stripes position
  this.updateStripes(this.leftStripes);
  this.updateStripes(this.rightStripes);
  
  // Update road edges animation
  if (this.roadElement) {
    this.roadElement.style.setProperty('--road-offset', `${this.offset}px`);
  }
}


  updateStripes(container) {
    const stripes = container.querySelectorAll('.road-stripe');
    stripes.forEach((stripe, index) => {
      const basePosition = index * this.stripeHeight - this.stripeHeight;
      const newPosition = basePosition + this.offset;
      stripe.style.top = `${newPosition}px`;
    });
  }

  increaseSpeed() {
    this.speed = Math.min(this.speed + 0.5, 15); // max speed 15
  }

  resetSpeed() {
    this.speed = 5;
  }

  stop() {
    this.speed = 0;

    // stop car sound
    this.carsound.pause();
    this.carsound.currentTime = 0;
    this.engineStarted = false;
  }
}
