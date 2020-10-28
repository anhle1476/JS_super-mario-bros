import ViewPort from "./viewPort/ViewPort.js";
import Timer from "../Timer.js";

import { bgFactory } from "../components/objects/factory/bgFactory.js";
import { unbreakableFactory } from "../components/objects/factory/unbreakableFactory.js";
import { breakableFactory } from "../components/objects/factory/breakableFactory.js";
import { specialFactory } from "../components/objects/factory/specialFactory.js";
import { minionFactory } from "../components/entities/minions/factory/minionFactory.js";

import {
  setupCollisionController,
  setupCompositor,
  setupUpdateController,
} from "./setupControllers.js";
import MainController from "./MainController.js";

export function initialSetup(
  game,
  ctx,
  audioController,
  mario,
  bgSprite,
  marioSprite,
  levelData
) {
  // create view port
  const viewPort = new ViewPort(levelData.width, mario);

  // create objects
  const backgroundObj = bgFactory(levelData.background, bgSprite);
  const breakableObj = breakableFactory(levelData.breakable, bgSprite);
  const unbreakableObj = unbreakableFactory(levelData.unbreakable, bgSprite);
  const specialObj = specialFactory(levelData.special, bgSprite);
  const minions = minionFactory(levelData.minions, marioSprite);

  // create compositor
  const layerObjectsSet = [
    backgroundObj,
    breakableObj,
    unbreakableObj,
    specialObj,
    minions,
    [mario],
  ];
  const compositor = setupCompositor(ctx, viewPort, layerObjectsSet);

  // create updateController
  const updateController = setupUpdateController(viewPort, [mario, ...minions]);

  // create collision Detect
  const collisionController = setupCollisionController(
    game,
    mario,
    audioController,
    [unbreakableObj, specialObj],
    [breakableObj],
    [minions]
  );

  // create main Controller
  const mainController = new MainController(
    game,
    compositor,
    updateController,
    collisionController,
    audioController
  );

  return new Timer(game, mainController);
}
