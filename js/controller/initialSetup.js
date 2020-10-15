import Compositor from "./compositor/Compositor.js";
import UpdateCenter from "./updateCenter/UpdateCenter.js";
import CollisionDetector from "./collision/CollisionDetector.js";
import ViewPort from "./viewPort/ViewPort.js";
import Mario from "../components/entities/mario/Mario.js";

import { bgFactory } from "../components/objects/factory/bgFactory.js";
import { unbreakableFactory } from "../components/objects/factory/unbreakableFactory.js";
import { breakableFactory } from "../components/objects/factory/breakableFactory.js";
import { specialFactory } from "../components/objects/factory/specialFactory.js";
import { minionFactory } from "../components/entities/minions/factory/minionFactory.js";

import { setUpKeyboard } from "../input/keyboard/setupKeyboard.js";
import { createLayer } from "./layers/createLayer.js";

function setupCompositor(ctx, viewPort, layerObjects) {
  const compositor = new Compositor(ctx, viewPort);
  layerObjects.forEach((objects) => compositor.addLayer(createLayer(objects)));
  return compositor;
}

function setupUpdateCenter(updateObjects, entities) {
  const updateCenter = new UpdateCenter();
  updateObjects.forEach((objects) => updateCenter.addObject(objects));
  entities.forEach((entities) => updateCenter.addEntity(entities));
  return updateCenter;
}

function setupCollisionDetector(mario, unbreakable, breakable, minions) {
  const collisionDetector = new CollisionDetector(mario);
  unbreakable.forEach((set) => collisionDetector.addUnbreakableSet(set));
  breakable.forEach((set) => collisionDetector.addBreakableSet(set));
  minions.forEach((set) => collisionDetector.addMinionsSet(set));
  return collisionDetector;
}

export function initialSetup(ctx, bgSprite, marioSprite, levelData) {
  // create objects
  const backgroundObj = bgFactory(levelData.background, bgSprite);
  const breakableObj = breakableFactory(levelData.breakable, bgSprite);
  const unbreakableObj = unbreakableFactory(levelData.unbreakable, bgSprite);
  const specialObj = specialFactory(levelData.special, bgSprite);
  const minions = minionFactory(levelData.minions, marioSprite);

  const mario = new Mario(marioSprite, 2, 12, 0, -0.5);

  // create viewPort
  const viewPort = new ViewPort(levelData.width, mario);

  // create compositor
  const compositor = setupCompositor(ctx, viewPort, [
    backgroundObj,
    breakableObj,
    unbreakableObj,
    specialObj,
    minions,
    [mario],
  ]);

  // create updateCenter
  const updateCenter = setupUpdateCenter([viewPort], [mario, ...minions]);

  // create collision Detect
  const collisionDetector = setupCollisionDetector(
    mario,
    [unbreakableObj, specialObj],
    [breakableObj],
    [minions]
  );

  setUpKeyboard(mario);

  return { compositor, updateCenter, collisionDetector };
}
