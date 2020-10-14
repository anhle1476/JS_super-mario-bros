import Timer from "./Timer.js";
import Game from "./Game.js";

import { initialSetup } from "./controller/initialSetup.js";
import { loadLevel } from "./loader/resourceLoader.js";
import {
  loadBackgroundSprite,
  loadMarioSprite,
} from "./loader/spriteLoader.js";

const ctx = document.getElementById("screen").getContext("2d");

const game = new Game();

Promise.all([
  loadBackgroundSprite(game),
  loadMarioSprite(game),
  loadLevel("1-1"),
]).then(([bgSprite, marioSprite, levelData]) => {
  const { compositor, updateCenter, collisionDetector } = initialSetup(
    ctx,
    bgSprite,
    marioSprite,
    levelData
  );

  const timer = new Timer(game, compositor, updateCenter, collisionDetector);

  timer.start();
});
