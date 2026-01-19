// js/core/constants.js

export const ROAD_WIDTH = 600;
export const PLAYER_WIDTH = 80;

// Lane positions as PERCENTAGES of road width (much simpler!)
export const LANE_PERCENTAGES = [
  16.67,  // Left lane (1/6 of road)
  50,     // Middle lane (1/2 of road)
  83.33   // Right lane (5/6 of road)
];

// No need for complex calculations!
export const LANES = LANE_PERCENTAGES;