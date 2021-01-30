/**
 * Author: Thomas SAULAY
 */

import Phaser from "phaser";

import SceneGameOver from "./js/SceneGameOver";
import SceneMainMenu from "./js/SceneMainMenu";
import SceneMain from "./js/SceneMain";

const config = {
  type: Phaser.AUTO,
  width: 288,
  height: 288,
  zoom: 2,
  backgroundColor: "#222222",
  parent: "game-container",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  scene: [SceneMainMenu, SceneMain, SceneGameOver]
};

const game = new Phaser.Game(config);
