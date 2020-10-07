import Object from "./asset/objects/Object.js";

import { loadLevel } from "./loader/resourceLoader.js";
import {
  loadBackgroundSprite,
  loadMarioSprite,
} from "./loader/spriteLoader.js";

const ctx = document.getElementById("screen").getContext("2d");

// const pauseToggle = document.getElementById("stop");
// const mario = new Mario(2, 12, 0, -25);

Promise.all([loadBackgroundSprite(), loadMarioSprite(), loadLevel("1-1")]).then(
  ([bgSprite, marioSprite, levelData]) => {
    bgSprite.draw("sky", ctx, 0, 0);
    bgSprite.draw("ground", ctx, 3, 0);
    marioSprite.draw("idle", ctx, 5, 10);

    let ground = new Object(bgSprite, "ground", 0, 13, 25, 2);

    ground.draw(ctx);
  }
);
