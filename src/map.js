import { canvas } from "./canvas";
import { filip, donut, needsWork } from "./sprites";
import { Entity } from "./Entity";

export const bgColors = ["#222222", "#272727"];

export const map = {
  background: [
    [1, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0]
  ],
  entities: [
    // new Entity({ x: 4, y: 5, name: "SUGA", sprite: donut }),
    new Entity({ x: 0, y: 3, name: "WORK", sprite: needsWork }),
    new Entity({ x: 1, y: 3, name: "WORK", sprite: needsWork }),
    new Entity({ x: 3, y: 3, name: "WORK", sprite: needsWork }),
    new Entity({ x: 4, y: 3, name: "WORK", sprite: needsWork }),
    new Entity({
      x: 1,
      y: 1,
      name: "FIFI",
      sprite: filip,
      color: "#3c3c02",
      isText: true
    }),
    new Entity({ x: 2, y: 1, name: "IS", color: "#fefefe", isText: true }),
    new Entity({ x: 3, y: 1, name: "YOU", color: "#cc00cc", isText: true }),
    new Entity({
      x: 1,
      y: 5,
      name: "SUGA",
      sprite: donut,
      color: "#3c3c02",
      isText: true
    }),
    new Entity({ x: 2, y: 5, name: "IS", color: "#fefefe", isText: true }),
    new Entity({ x: 3, y: 5, name: "WIN", color: "#cc00cc", isText: true }),
    new Entity({
      x: 2,
      y: 2,
      name: "WORK",
      sprite: needsWork,
      color: "#3c3c02",
      isText: true
    }),
    new Entity({ x: 2, y: 3, name: "IS", color: "#fefefe", isText: true }),
    new Entity({ x: 2, y: 4, name: "STOP", color: "#cc00cc", isText: true }),
    new Entity({ x: 0, y: 0, name: "FIFI", sprite: filip })
  ],
  get tileSize() {
    return Math.min(canvas.width / this.width, canvas.height / this.height);
  },
  get width() {
    return this.background[0].length;
  },
  get height() {
    return this.background.length;
  }
};
