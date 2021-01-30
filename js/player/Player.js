import Phaser from "phaser";
import PlayerBulletGroup from "./PlayerBulletGroup";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene);

    this.speed = 150;
    this.scene = scene;
    this.x = this.scene.width / 2;
    this.y = this.scene.height / 2;
    this.sprite = this.scene.physics.add.image(this.x, this.y, "player", 0);
    // this.sprite.setCollideWorldBounds(true);

    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.cursorsShoot = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.Z,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.Q,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });

    this.bulletGroup = new PlayerBulletGroup(this.scene, this.x, this.y);
  }

  updateMovement() {
    this.sprite.setVelocity(0);

    if (this.cursors.left.isDown && !this.cursors.right.isDown) {
      this.sprite.setVelocityX(-this.speed);
    }
    if (this.cursors.right.isDown && !this.cursors.left.isDown) {
      this.sprite.setVelocityX(this.speed);
    }
    if (this.cursors.up.isDown && !this.cursors.down.isDown) {
      this.sprite.setVelocityY(-this.speed);
    }
    if (this.cursors.down.isDown && !this.cursors.up.isDown) {
      this.sprite.setVelocityY(this.speed);
    }
  }
  updateShooting() {
    if (Phaser.Input.Keyboard.JustDown(this.cursorsShoot.left)) {
      this.shoot(new Phaser.Math.Vector2(-1, 0));
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursorsShoot.right)) {
      this.shoot(new Phaser.Math.Vector2(1, 0));
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursorsShoot.up)) {
      this.shoot(new Phaser.Math.Vector2(0, -1));
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursorsShoot.down)) {
      this.shoot(new Phaser.Math.Vector2(0, 1));
    }
  }
  shoot(vec) {
    this.bulletGroup.fire(
      this.sprite.x - this.sprite.displayWidth / 2,
      this.sprite.y - this.sprite.displayHeight / 2,
      vec
    );
  }
}
