import Ground from "../ground/Ground.js";

export function unbreakableFactory(data, sprite) {
  const objects = [];

  data.forEach((items) => {
    switch (items.tile) {
      case "ground":
        items.set.forEach(([x, y, width, height]) => {
          objects.push(new Ground(sprite, x, y, width, height));
        });
        break;
      default:
        console.log("undefined unbreakable Obj");
    }
  });

  return objects;
}
