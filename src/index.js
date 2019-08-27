import { clear, resize, draw } from "./canvas";
import { updateRules } from "./rules";
import { map } from "./map";

const update = () => {
  updateRules();
  map.entities.forEach(e => e.update());
};

const loop = () => {
  clear();
  update();
  draw();
};

resize();
setInterval(loop, 1000 / 30);

window.onresize = resize;
