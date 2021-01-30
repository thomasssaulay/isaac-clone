import Phaser from "phaser";
import Room from "./Room";

const dirs = [
  10, // N
  1, // E
  -10, // S
  -1 // W
];

export function generateLevel(scene, levelSize = 7, maxSize) {
  // const maxSize = { x: 7, y: 7 };
  let roomsRemaining = levelSize - 1;

  // init level queue
  let level = [];

  // add a room at the center
  const centerRoomPos =
    Math.floor(maxSize.x / 2) * 10 + Math.round(maxSize.y / 2);
  console.log("start room at " + centerRoomPos);
  level[centerRoomPos] = new Room(scene, centerRoomPos);

  while (roomsRemaining > 0) {
    level.forEach((curRoom) => {
      dirs.forEach((dir) => {
        let newRoomPos = curRoom.xy + dir;
        let newRoomExists = level.filter((obj) => {
          return obj.xy === newRoomPos;
        });
        if (!newRoomExists.length > 0) {
          if (roomsRemaining > 0) {
            let randChance = Math.random();
            if (randChance > 0.5) {
              // let newDirs = []
              // new.push()
              curRoom.connectedDirs.push(dir);
              level[newRoomPos] = new Room(scene, newRoomPos);
              level[newRoomPos].connectedDirs.push(-dir);
              roomsRemaining--;
              console.log("new room added at " + newRoomPos);
            }
          } else {
            console.info("enough rooms");
          }
        } else {
          console.info("already a room at " + newRoomPos);
        }
      });
    });
  }

  return level;
}

export function printLevel(level, maxSize) {
  for (let i = 0; i < maxSize.x; i++) {
    let s = "";
    for (let j = 0; j < maxSize.y * 10; j += 10) {
      if (level[j + i]) s += level[j + i].connectedDirs.length;
      else s += "_";
    }
    console.log(s);
  }
}
