import ViewPort from "./viewPort/ViewPort.js";
import Timer from "../Timer.js";

import { bgFactory } from "../components/objects/factory/bgFactory.js";
import { unbreakableFactory } from "../components/objects/factory/unbreakableFactory.js";
import { breakableFactory } from "../components/objects/factory/breakableFactory.js";
import { specialFactory } from "../components/objects/factory/specialFactory.js";
import { minionFactory } from "../components/entities/minions/factory/minionFactory.js";

import {
  setupCollisionDetector,
  setupCompositor,
  setupUpdateCenter,
} from "./setupControllers.js";

export function initialSetup(
  game,
  ctx,
  audioController,
  mario,
  bgSprite,
  marioSprite,
  levelData
) {
  // create objects
  const backgroundObj = bgFactory(levelData.background, bgSprite);
  const breakableObj = breakableFactory(levelData.breakable, bgSprite);
  const unbreakableObj = unbreakableFactory(levelData.unbreakable, bgSprite);
  const specialObj = specialFactory(levelData.special, bgSprite);
  const minions = minionFactory(levelData.minions, marioSprite);

  // create view port
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
  const updateCenter = setupUpdateCenter(viewPort, [mario, ...minions]);

  // create collision Detect
  const collisionDetector = setupCollisionDetector(
    mario,
    audioController,
    [unbreakableObj, specialObj],
    [breakableObj],
    [minions]
  );

  return new Timer(
    game,
    compositor,
    updateCenter,
    collisionDetector,
    audioController
  );
}
