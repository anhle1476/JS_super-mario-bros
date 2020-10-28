import Compositor from "./compositor/Compositor.js";
import UpdateController from "./update/UpdateController.js";
import CollisionController from "./collision/CollisionController.js";

import { createLayer } from "./layers/createLayer.js";

export function setupCompositor(ctx, viewPort, layerObjects) {
  const compositor = new Compositor(ctx, viewPort);
  layerObjects.forEach((objects) => compositor.addLayer(createLayer(objects)));
  return compositor;
}

export function setupUpdateController(viewPort, entities) {
  const updateController = new UpdateController(viewPort);
  entities.forEach((entities) => updateController.addEntity(entities));
  return updateController;
}

export function setupCollisionController(
  game,
  mario,
  audioController,
  unbreakable,
  breakable,
  minions
) {
  const collisionController = new CollisionController(
    mario,
    game,
    audioController
  );
  unbreakable.forEach((set) => collisionController.addUnbreakableSet(set));
  breakable.forEach((set) => collisionController.addBreakableSet(set));
  minions.forEach((set) => collisionController.addMinionsSet(set));
  return collisionController;
}
