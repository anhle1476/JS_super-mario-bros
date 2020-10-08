import Compositor from "./compositor/Compositor.js";
import UpdateCenter from "./updateCenter/UpdateCenter.js";
import CollisionDetector from "./collision/CollisionDetector.js";

import { setUpKeyboard } from "../input/keyboard/setupKeyboard.js";

import { createLayer } from "./layers/createLayer.js";

import Sky from "../components/objects/background/Sky.js";
import Ground from "../components/objects/ground/Ground.js";
import Mario from "../components/entities/mario/Mario.js";

export function initialSetup(ctx, bgSprite, marioSprite) {
  // create objects
  const ground = new Ground(bgSprite, 0, 13, 25, 2);
  const sky = new Sky(bgSprite, 0, 0, 25, 13);
  const mario = new Mario(marioSprite, 2, 12, 0, -0.5);

  // create layers
  const backgroundLayer = createLayer([sky, ground]);
  const marioLayer = createLayer([mario]);

  // create compositor
  const compositor = new Compositor(ctx);
  compositor.addLayer(backgroundLayer);
  compositor.addLayer(marioLayer);

  // create updateCenter
  const updateCenter = new UpdateCenter();
  updateCenter.addObject(mario);

  // create collision Detect
  const collisionDetector = new CollisionDetector(mario);
  collisionDetector.addObstacles(ground);

  setUpKeyboard(mario);

  return { compositor, updateCenter, collisionDetector };
}
