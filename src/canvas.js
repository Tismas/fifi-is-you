import { map, bgColors } from "./map";

export const canvas = document.getElementById("game");
export const ctx = canvas.getContext("2d");

export const draw = () => {
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      ctx.fillStyle = bgColors[map.background[y][x]];
      ctx.fillRect(
        x * map.tileSize,
        y * map.tileSize,
        map.tileSize,
        map.tileSize
      );
    }
  }
  map.entities.forEach(entity => entity.draw());
};

export const clear = () => {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
};

export const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
