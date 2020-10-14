import Compositor from "./compositor/Compositor.js";
import UpdateCenter from "./updateCenter/UpdateCenter.js";
import CollisionDetector from "./collision/CollisionDetector.js";

import { setUpKeyboard } from "../input/keyboard/setupKeyboard.js";

import { createLayer } from "./layers/createLayer.js";

import Sky from "../components/objects/background/Sky.js";
import Ground from "../components/objects/ground/Ground.js";
import Mario from "../components/entities/mario/Mario.js";
import {createBrickSet} from '../components/objects/brick/createBrickSet.js'

const brickPos =  [[5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [5, 8], [6, 8], [7, 8], [8, 8]]

export function initialSetup(ctx, bgSprite, marioSprite) {
  // create objects
  const ground = new Ground(bgSprite, 0, 13, 25, 2);
  const sky = new Sky(bgSprite, 0, 0, 25, 13);
  const bricksSet = createBrickSet(bgSprite,brickPos)
  const mario = new Mario(marioSprite, 2, 12, 0, -0.5);

  // create layers
  const backgroundLayer = createLayer([sky, ground]);
  const marioLayer = createLayer([mario]);
  const bricksLayer = createLayer(bricksSet);

  // create compositor
  const compositor = new Compositor(ctx);
  compositor.addLayer(backgroundLayer);
  compositor.addLayer(bricksLayer);
  compositor.addLayer(marioLayer);

  // create updateCenter
  const updateCenter = new UpdateCenter();
  updateCenter.addObject(mario);

  // create collision Detect
  const collisionDetector = new CollisionDetector(mario);
  collisionDetector.addUnbreakable(ground);
  collisionDetector.addBreakableSet(bricksSet)

  setUpKeyboard(mario);

  return { compositor, updateCenter, collisionDetector };
}
