import Phaser from "phaser";
import * as LevelGenerator from "./level/LevelGenerator";
import Player from "./player/Player";

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {
    this.load.image("player", "../assets/sprites/chicken.png");
    this.load.image("dude", "../assets/sprites/dude.png");
    this.load.image("wall", "../assets/sprites/wall.png");
    this.load.image("floor", "../assets/sprites/floor.png");
    this.load.image("chest", "../assets/sprites/chest.png");
    this.load.image("playerBullet", "../assets/sprites/bullet.png");
  }

  create() {
    const { width, height } = this.sys.game.config;
    this.width = width;
    this.height = height;

    this.levelSize = 3;
    this.maxSize = { x: 10, y: 10 };
    this.level = LevelGenerator.generateLevel(
      this,
      this.levelSize,
      this.maxSize
    );
    LevelGenerator.printLevel(this.level, this.maxSize);
    // console.log(this.level[55].connectedDirs);
    // this.level[55].loadRoom();
    // if (this.level[56]) {
    //   this.level[56].loadRoom();
    // }
    this.level.forEach((room) => {
      room.loadRoom();
    });

    this.add
      .text(width / 2, height / 2, "start\nroom", {
        font: "5vw courier",
        color: "white"
      })
      .setOrigin(0.5, 0.5);

    this.player = new Player(this);

    this.cameras.main.startFollow(this.player.sprite);

    this.initColliders();

    this.reloadState = true;
  }

  update(time, delta) {
    this.player.updateMovement();
    this.player.updateShooting();

    // if (this.cursors.space.isDown && this.reloadState) {
    // this.level = LevelGenerator.generateLevel(this, 10);
    // LevelGenerator.printLevel(this.level, 7, 7);
    // console.log(this.level[0].connectedDirs);
    //   this.reloadState = false;
    // }
    // if (this.cursors.space.isUp && !this.reloadState) {
    //   this.reloadState = true;
    // }
  }

  initColliders() {
    // this.level[34].walls.forEach((wall) => {
    //   this.physics.add.collider(this.player.sprite, wall, function (
    //     _player,
    //     _wall
    //   ) {
    //     // console.log("hello");
    //   });
    // });

    // this.physics.add.collider(this.player.sprite, this.level[55].walls);
    this.physics.add.collider(
      this.player.bulletGroup,
      this.level[55].walls,
      function (_bulletGroup, _walls) {
        // console.log("hi");
      }
    );
  }
}
