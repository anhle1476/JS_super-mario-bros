import Layer from "./Layer.js";

export function createLayer(objects) {
  const layer = new Layer();

  objects.forEach((object) => layer.addObject(object));

  return layer;
}
