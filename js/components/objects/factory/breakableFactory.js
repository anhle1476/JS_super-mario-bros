import Brick from "../breakable/brick/Brick.js";

export function breakableFactory(data, sprite) {
  const objects = [];

  data.forEach((items) => {
    switch (items.tile) {
      case "brick":
        items.set.forEach(([x, y]) => {
          objects.push(new Brick(sprite, x, y));
        });
        break;
      default:
        console.log("undefined breakable obj");
    }
  });

  return objects;
}
