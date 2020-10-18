import Compositor from "./compositor/Compositor.js";
import UpdateCenter from "./updateCenter/UpdateCenter.js";
import CollisionDetector from "./collision/CollisionDetector.js";

import { createLayer } from "./layers/createLayer.js";

export function setupCompositor(ctx, viewPort, layerObjects) {
  const compositor = new Compositor(ctx, viewPort);
  layerObjects.forEach((objects) => compositor.addLayer(createLayer(objects)));
  return compositor;
}

export function setupUpdateCenter(viewPort, entities) {
  const updateCenter = new UpdateCenter(viewPort);
  entities.forEach((entities) => updateCenter.addEntity(entities));
  return updateCenter;
}

export function setupCollisionDetector(
  mario,
  audioController,
  unbreakable,
  breakable,
  minions
) {
  const collisionDetector = new CollisionDetector(mario, audioController);
  unbreakable.forEach((set) => collisionDetector.addUnbreakableSet(set));
  breakable.forEach((set) => collisionDetector.addBreakableSet(set));
  minions.forEach((set) => collisionDetector.addMinionsSet(set));
  return collisionDetector;
}
