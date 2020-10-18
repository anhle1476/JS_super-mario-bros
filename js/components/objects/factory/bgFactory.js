import Sky from "../background/Sky.js";
import Misc from "../background/Misc.js";

export function bgFactory(data, sprite) {
  const bgObjects = [];

  data.forEach((items) => {
    switch (items.tile) {
      case "sky":
        items.set.forEach(([x, y, width, height]) => {
          bgObjects.push(new Sky(sprite, x, y, width, height));
        });
        break;
      case "cloud-1":
        items.set.forEach(([x, y]) => {
          bgObjects.push(new Misc(sprite, "cloud-1", x, y, 3, 2));
        });
        break;
      case "cloud-2":
        items.set.forEach(([x, y]) => {
          bgObjects.push(new Misc(sprite, "cloud-2", x, y, 4, 2));
        });
        break;
      default:
        console.log("undefined bgObj");
    }
  });

  return bgObjects;
}
