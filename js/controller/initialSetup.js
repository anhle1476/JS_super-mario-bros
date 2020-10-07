import Compositor from "./compositor/Compositor.js";
import UpdateCenter from "./updateCenter/UpdateCenter.js";
import { createLayer } from "./layers/createLayer.js";

import Sky from "../asset/objects/background/Sky.js";
import Ground from "../asset/objects/ground/Ground.js";
import Mario from "../asset/entities/mario/Mario.js";

export function initialSetup(ctx, bgSprite, marioSprite) {
  // create objects
  const ground = new Ground(bgSprite, 0, 13, 25, 2);
  const sky = new Sky(bgSprite, 0, 0, 25, 13);
  const mario = new Mario(marioSprite, 2, 12, 0.1, -0.5);

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

  return { compositor, updateCenter };
}
