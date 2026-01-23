// js/main.js
// ================== ENTRY POINT ==================
// This file is ONLY responsible for:
// 1. Creating objects
// 2. Wiring dependencies
// 3. Connecting UI events to the engine
// -------------------------------------------------

import GameEngine from "./systems/GameEngine.js";

import Player from "./entities/Player.js";
import RoadManager from "./systems/RoadManager.js";
import ObstacleManager from "./systems/ObstacleManager.js";
import CollisionSystem from "./systems/CollisionSystem.js";
import ScoreManager from "./systems/ScoreManager.js";
import StorageManager from "./storage/StorageManager.js";
import UIManager from "./ui/UIManager.js";

// -------------------------------------------------
// Create core game objects
// -------------------------------------------------

const player = new Player();
const roadManager = new RoadManager();
const obstacleManager = new ObstacleManager();
const collisionSystem = new CollisionSystem(player, obstacleManager);
const scoreManager = new ScoreManager();
const storageManager = new StorageManager();
const uiManager = new UIManager(player);
uiManager.obstacleManager = obstacleManager;
uiManager.roadManager = roadManager;

// -------------------------------------------------
// Create Game Engine (single source of truth)
// -------------------------------------------------

const engine = new GameEngine({
  player,
  roadManager,
  obstacleManager,
  collisionSystem,
  scoreManager,
  uiManager,
  storageManager,
});

// -------------------------------------------------
// Initialize UI state
// -------------------------------------------------

uiManager.updateBestScore(storageManager.getBestScore());
uiManager.showStartScreen();

// -------------------------------------------------
// Wire UI → Engine callbacks
// -------------------------------------------------

uiManager.setStartGameCallback(() => {
  engine.start();
});

uiManager.setRestartGameCallback(() => {
  engine.restart();
});

// -------------------------------------------------
// Input handling (delegated to engine/player)
// -------------------------------------------------

window.addEventListener("keydown", (e) => {
  if (!engine.isRunning()) return;

  if (e.key === "ArrowLeft") player.moveLeft();
  if (e.key === "ArrowRight") player.moveRight();
});
