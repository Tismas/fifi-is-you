import { map } from "./map";
import { rules } from "./rules";

const keys = {};

const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;

window.onkeydown = e => {
  keys[e.keyCode] = true;
};
window.onkeyup = e => {
  keys[e.keyCode] = false;
};

export const isKeyPressed = keyCode => keys[keyCode];

const isValidMove = (entity, dx, dy) => {
  if (
    entity.x + dx < 0 ||
    entity.x + dx >= map.width ||
    entity.y + dy < 0 ||
    entity.y + dy >= map.height
  )
    return false;
  const [collidingEntity] = map.entities.filter(
    e => e.x === entity.x + dx && e.y === entity.y + dy
  );
  if (!collidingEntity) return true;
  if (
    rules[collidingEntity.name] &&
    rules[collidingEntity.name].includes("WIN")
  ) {
    console.log("WIN");
  }
  if (
    !collidingEntity.isText &&
    rules[collidingEntity.name] &&
    rules[collidingEntity.name].includes("STOP")
  )
    return false;
  if (
    collidingEntity.isText ||
    (rules[collidingEntity.name] &&
      rules[collidingEntity.name].includes("PUSH"))
  ) {
    return isValidMove(collidingEntity, dx, dy);
  }
  return true;
};

const updateEntity = (entity, dx, dy) => {
  const pushedEntities = map.entities.filter(
    e => e.x === entity.x + dx && e.y === entity.y + dy
  );
  for (const pushedEntity of pushedEntities) {
    if (
      pushedEntity &&
      (pushedEntity.isText ||
        (rules[pushedEntity.name] && rules[pushedEntity.name].includes("PUSH")))
    ) {
      updateEntity(pushedEntity, dx, dy);
    }
  }
  entity.x += dx;
  entity.y += dy;
};

export const handleMove = entity => {
  const now = new Date();
  if (now - entity.lastMove > 100) {
    let dx = 0;
    let dy = 0;
    if (keys[LEFT]) dx = -1;
    if (keys[RIGHT]) dx = 1;
    if (keys[DOWN] && dx === 0) dy = 1;
    if (keys[UP] && dx === 0) dy = -1;
    if (dx || dy) {
      if (isValidMove(entity, dx, dy)) {
        updateEntity(entity, dx, dy);
        entity.lastMove = now;
      }
    }
  }
};
