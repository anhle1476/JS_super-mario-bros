import ViewPort from "./viewPort/ViewPort.js";
import Mario from "../components/entities/mario/Mario.js";
import Timer from "../Timer.js";
import AudioController from "./audioController/AudioController.js";

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
import { setUpKeyboard } from "../input/keyboard/setupKeyboard.js";

export function initialSetup(
  game,
  ctx,
  bgSprite,
  marioSprite,
  levelData,
  audio
) {
  //create audio controller
  const audioController = new AudioController(audio);
  // create objects
  const backgroundObj = bgFactory(levelData.background, bgSprite);
  const breakableObj = breakableFactory(levelData.breakable, bgSprite);
  const unbreakableObj = unbreakableFactory(levelData.unbreakable, bgSprite);
  const specialObj = specialFactory(levelData.special, bgSprite);
  const minions = minionFactory(levelData.minions, marioSprite);
  const mario = new Mario(marioSprite, 2, 12, 0, -0.5, audioController);

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
  const updateCenter = setupUpdateCenter([viewPort], [mario, ...minions]);

  // create collision Detect
  const collisionDetector = setupCollisionDetector(
    mario,
    audioController,
    [unbreakableObj, specialObj],
    [breakableObj],
    [minions]
  );

  setUpKeyboard(mario, audioController);

  return new Timer(
    game,
    compositor,
    updateCenter,
    collisionDetector,
    audioController
  );
}
