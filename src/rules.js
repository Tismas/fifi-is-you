import { map } from "./map";

const addRule = (object, func) => {
  if (!rules[object.name]) {
    rules[object.name] = [];
  }
  rules[object.name].push(func.name);
};

export let rules = {};

const createOrExecuteRule = (first, second) => {
  if (first.isObject() && second.isFunction()) {
    addRule(first, second);
  }
  if (first.isObject() && second.isObject()) {
    map.entities.forEach(entity => {
      if (!entity.isText && entity.name === first.name) {
        entity.become(second);
      }
    });
  }
};

export const updateRules = () => {
  rules = {};
  const words = map.entities.filter(entity => entity.isText);
  const middles = words.filter(word => word.name === "IS");
  for (const middle of middles) {
    const [left] = words.filter(
      word => word.x === middle.x - 1 && word.y === middle.y
    );
    const [right] = words.filter(
      word => word.x === middle.x + 1 && word.y === middle.y
    );
    const [top] = words.filter(
      word => word.x === middle.x && word.y === middle.y - 1
    );
    const [bottom] = words.filter(
      word => word.x === middle.x && word.y === middle.y + 1
    );
    if (left && right) {
      createOrExecuteRule(left, right);
    }
    if (top && bottom) {
      createOrExecuteRule(top, bottom);
    }
  }
};
