import Compositor from "./compositor/Compositor.js";
import UpdateCenter from "./updateCenter/UpdateCenter.js";
import CollisionDetector from "./collision/CollisionDetector.js";
import Mario from "../components/entities/mario/Mario.js";

import { bgFactory } from "../components/objects/factory/bgFactory.js";
import { unbreakableFactory } from "../components/objects/factory/unbreakableFactory.js";
import { breakableFactory } from "../components/objects/factory/breakableFactory.js";

import { setUpKeyboard } from "../input/keyboard/setupKeyboard.js";
import { createLayer } from "./layers/createLayer.js";

export function initialSetup(ctx, bgSprite, marioSprite, levelData) {
  // create objects
  const backgroundObj = bgFactory(levelData.background, bgSprite);
  const breakableObj = breakableFactory(levelData.breakable, bgSprite);
  const unbreakableObj = unbreakableFactory(levelData.unbreakable, bgSprite);

  const mario = new Mario(marioSprite, 2, 12, 0, -0.5);

  // create compositor
  const compositor = new Compositor(ctx);
  compositor.addLayer(createLayer(backgroundObj));
  compositor.addLayer(createLayer(breakableObj));
  compositor.addLayer(createLayer(unbreakableObj));
  compositor.addLayer(createLayer([mario]));

  // create updateCenter
  const updateCenter = new UpdateCenter();
  updateCenter.addObject(mario);

  // create collision Detect
  const collisionDetector = new CollisionDetector(mario);
  collisionDetector.addUnbreakableSet(unbreakableObj);
  collisionDetector.addBreakableSet(breakableObj);

  setUpKeyboard(mario);

  return { compositor, updateCenter, collisionDetector };
}
