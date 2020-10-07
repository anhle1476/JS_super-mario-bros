import Unbreakable from "../collision/Unbreakable.js";

export function collisionReading(data, collision) {
  Object.keys(data).forEach((objType) => {
    data[objType].forEach(({ type, ranges }) => {
      switch (type) {
        case 1:
          ranges.forEach((range) =>
            collision.addObject(new Unbreakable(...range))
          );
          break;
      }
    });
  });
}
