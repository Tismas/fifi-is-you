import { ctx } from "./canvas";
import { map } from "./map";
import { rules } from "./rules";
import { handleMove } from "./controls";

const functions = ["YOU", "WIN", "STOP"];
const objects = ["FIFI", "SUGA", "WORK"];

export class Entity {
  constructor({ name, color, sprite, x, y, isText = false } = {}) {
    this.color = color;
    this.sprite = sprite;
    this.name = name;
    this.isText = isText;
    this.x = x;
    this.y = y;
    this.lastMove = new Date();

    if (!color && !sprite) throw new Error("I cant draw this!");
  }

  isObject() {
    return objects.includes(this.name);
  }
  isFunction() {
    return functions.includes(this.name);
  }
  become(entity) {
    this.color = entity.color;
    this.name = entity.name;
    this.sprite = entity.sprite;
  }

  update() {
    if (this.isText) return;
    if (rules[this.name] && rules[this.name].includes("YOU")) {
      handleMove(this);
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.font = `${map.tileSize / 2}px Monospace`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    if (this.isText) {
      if (this.name.length === 4) {
        ctx.fillText(
          this.name.substr(0, 2),
          this.x * map.tileSize + map.tileSize / 2,
          this.y * map.tileSize + map.tileSize / 4
        );
        ctx.fillText(
          this.name.substr(2),
          this.x * map.tileSize + map.tileSize / 2,
          this.y * map.tileSize + (map.tileSize * 3) / 4
        );
      } else {
        ctx.fillText(
          this.name,
          this.x * map.tileSize + map.tileSize / 2,
          this.y * map.tileSize + map.tileSize / 2
        );
      }
    } else if (this.sprite) {
      ctx.drawImage(
        this.sprite,
        this.x * map.tileSize,
        this.y * map.tileSize,
        map.tileSize,
        map.tileSize
      );
    } else {
      ctx.fillRect(
        this.x * map.tileSize,
        this.y * map.tileSize,
        map.tileSize,
        map.tileSize
      );
    }
  }
}
