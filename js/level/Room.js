import Phaser from "phaser";

const spriteMap = {
  X: "wall",
  ".": "floor",
  "?": "chest",
  "!": "dude"
};

export default class Room {
  constructor(scene, xy) {
    this.scene = scene;
    this.xy = xy;
    this.connectedDirs = [];
    this.design = [
      ["X", "X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "!", ".", ".", ".", "X", "!", ".", "X"],
      ["X", ".", "?", ".", ".", ".", ".", ".", "X"],
      ["X", ".", ".", ".", ".", ".", ".", ".", "X"],
      ["X", "!", ".", ".", ".", ".", ".", ".", "X"],
      ["X", "?", ".", "X", ".", ".", ".", ".", "X"],
      ["X", ".", ".", "X", ".", "?", ".", ".", "X"],
      ["X", ".", ".", "X", ".", ".", ".", ".", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X"]
    ];
    this.walls = [];
  }

  loadRoom() {
    const spriteSize = 32;

    const centerX = Math.round(this.scene.maxSize.x / 2);
    const centerY = Math.floor(this.scene.maxSize.y / 2);
    const roomOffsetX =
      -(centerX - (this.xy % 10)) * this.design[0].length * spriteSize;
    const roomOffsetY =
      -(centerY - Math.floor(this.xy / 10)) * this.design.length * spriteSize;

    console.table(this.xy, this.connectedDirs);
    for (let i = 0; i < this.design[0].length; i++) {
      for (let j = 0; j < this.design.length; j++) {
        // doors
        // if (
        //   (i === 0 && j === centerY && this.connectedDirs.includes(-1)) ||
        //   (i === this.design[0].length - 1 &&
        //     j === centerY &&
        //     this.connectedDirs.includes(1)) ||
        //   (i === centerX && j === 0 && this.connectedDirs.includes(-10)) ||
        //   (i === 0 &&
        //     j === this.design.length - 1 &&
        //     this.connectedDirs.includes(10))
        // ) {
        //   this.design[i][j] = ".";
        // }

        if (i === 0 && j === centerY - 1 && this.connectedDirs.includes(10)) {
          console.log("Room " + this.xy + " : Nord");
          this.design[i][j] = ".";
        }
        if (
          i === this.design.length - 1 &&
          j === centerY - 1 &&
          this.connectedDirs.includes(-10)
        ) {
          console.log("Room " + this.xy + " : Sud");
          this.design[i][j] = ".";
        }
        if (i === centerX - 1 && j === 0 && this.connectedDirs.includes(-1)) {
          console.log("Room " + this.xy + " : Ouest");
          this.design[i][j] = ".";
        }
        if (i === 0 && j === centerY - 1 && this.connectedDirs.includes(1)) {
          console.log("Room " + this.xy + " : Est");
          this.design[i][j] = ".";
        }

        let sprite = spriteMap[this.design[j][i]];
        if (sprite !== "floor" && sprite !== "wall") {
          this.scene.physics.add
            .sprite(
              roomOffsetX + i * spriteSize,
              roomOffsetY + j * spriteSize,
              "floor",
              0
            )
            .setOrigin(0, 0);
          this.scene.physics.add
            .sprite(
              roomOffsetX + i * spriteSize,
              roomOffsetY + j * spriteSize,
              sprite,
              0
            )
            .setOrigin(0, 0);
        } else if (sprite !== "wall") {
          this.scene.physics.add
            .sprite(
              roomOffsetX + i * spriteSize,
              roomOffsetY + j * spriteSize,
              "floor",
              0
            )
            .setOrigin(0, 0);
        } else {
          this.walls.push(
            this.scene.physics.add
              .image(
                roomOffsetX + i * spriteSize,
                roomOffsetY + j * spriteSize,
                sprite,
                0
              )
              .setOrigin(0, 0)
          );

          this.walls[this.walls.length - 1].setImmovable(true);
          this.walls[this.walls.length - 1].body.allowGravity = false;
        }
      }
    }
  }
}
