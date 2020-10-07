import Ground from "./asset/objects/ground/Ground.js";
import Sky from "./asset/objects/background/Sky.js";

import { loadLevel } from "./loader/resourceLoader.js";
import {
  loadBackgroundSprite,
  loadMarioSprite,
} from "./loader/spriteLoader.js";
import Entity from "./asset/entities/Entity.js";

const ctx = document.getElementById("screen").getContext("2d");

// const pauseToggle = document.getElementById("stop");
// const mario = new Mario(2, 12, 0, -25);

Promise.all([loadBackgroundSprite(), loadMarioSprite(), loadLevel("1-1")]).then(
  ([bgSprite, marioSprite, levelData]) => {
    bgSprite.drawTile("sky", ctx, 0, 0);
    bgSprite.drawTile("ground", ctx, 3, 0);

    let ground = new Ground(bgSprite, 0, 13, 25, 2);
    let sky = new Sky(bgSprite, 0, 0, 25, 13);

    let mario = new Entity(marioSprite, "idle", 2, 12, 0, 0, 1, 1);

    ground.draw(ctx);
    sky.draw(ctx);

    console.log(mario);

    mario.draw(ctx);
    // marioSprite.drawTile("idle", ctx, 10, 10);
    // marioSprite.draw("idle", ctx, 5, 10);
  }
);
