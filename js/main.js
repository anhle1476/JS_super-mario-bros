import Timer from "./Timer.js";

import { initialSetup } from "./controller/initialSetup.js";
import { loadLevel } from "./loader/resourceLoader.js";
import {
  loadBackgroundSprite,
  loadMarioSprite,
} from "./loader/spriteLoader.js";

const ctx = document.getElementById("screen").getContext("2d");

Promise.all([loadBackgroundSprite(), loadMarioSprite(), loadLevel("1-1")]).then(
  ([bgSprite, marioSprite, levelData]) => {
    const { compositor, updateCenter, collisionDetector } = initialSetup(
      ctx,
      bgSprite,
      marioSprite
    );

    const timer = new Timer(compositor, updateCenter, collisionDetector);

    timer.start();
  }
);

/**
 * NEXT:
 *  - CollisionDetect
 *    + obstacles[]
 *    + entities = Mario
 *    + getBounding() => x0, y0, x1, y1
 *    + outOfRange()
 *    + detect([mBound], [oBound])
 *
 *  - Mario State
 *    + isJump = boolean
 *    + hitTop()
 *    + direction: LEFT, RIGHT
 *    + action: IDLE, MOVE
 *    + change update() base on direction & action
 *
 *  - Keyboard
 *    + keyCode -> currentKey + callback -> change State
 **/
