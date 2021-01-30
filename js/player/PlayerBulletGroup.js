import Phaser from "phaser";
import PlayerBullet from "./PlayerBullet";

export default class PlayerBulletGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene, x, y) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: PlayerBullet,
      frameQuantity: 30,
      active: false,
      visible: false,
      setXY: {
        x: x,
        y: y
      },
      key: "playerBullet"
    });

    this.children.each(function (bullet) {
      bullet.setCircle(7);
    });
  }

  fire(x, y, vector) {
    const bullet = this.getFirstDead(false);
    if (bullet) {
      bullet.fire(x, y, vector);
    }
  }
}
