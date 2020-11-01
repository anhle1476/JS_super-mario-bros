import Ground from "../unbreakable/ground/Ground.js";
import Rock from "../unbreakable/rock/Rock.js";
import Pipe from "../unbreakable/pipe/Pipe.js";

export function unbreakableFactory(data, sprite) {
  const objects = [];

  data.forEach((items) => {
    switch (items.tile) {
      case "ground":
        items.set.forEach(([x, y, width, height]) => {
          objects.push(new Ground(sprite, x, y, width, height));
        });
        break;
      case "rock":
        items.set.forEach(([x, y, width, height]) => {
          objects.push(new Rock(sprite, x, y, width, height));
        });
        break;
      case "vertical-pipe":
        items.set.forEach(([x, y, height]) => {
          objects.push(new Pipe(sprite, x, y, height));
        });
        break;
      default:
        console.log("undefined unbreakable Obj");
    }
  });

  return objects;
}
