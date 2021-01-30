import Phaser from "phaser";

export default class PlayerBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "playerBullet");

    this.bulletSpeed = 300;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (
      this.y <= 0 ||
      this.y > this.scene.height ||
      this.x <= 0 ||
      this.x > this.scene.width
    ) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  fire(x, y, vector) {
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);

    this.setVelocity(vector.x * this.bulletSpeed, vector.y * this.bulletSpeed);
  }
}
