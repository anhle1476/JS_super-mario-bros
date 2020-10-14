import Sky from "../background/Sky.js";

export function bgFactory(data, sprite) {
  const bgObjects = [];

  data.forEach((items) => {
    switch (items.tile) {
      case "sky":
        items.set.forEach(([x, y, width, height]) => {
          bgObjects.push(new Sky(sprite, x, y, width, height));
        });
        break;
      default:
        console.log("undefined bgObj");
    }
  });

  return bgObjects;
}
