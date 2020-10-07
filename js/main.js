import { initialSetup } from "./controller/initialSetup.js";
import { loadLevel } from "./loader/resourceLoader.js";
import {
  loadBackgroundSprite,
  loadMarioSprite,
} from "./loader/spriteLoader.js";
import Timer from "./Timer.js";

const ctx = document.getElementById("screen").getContext("2d");

Promise.all([loadBackgroundSprite(), loadMarioSprite(), loadLevel("1-1")]).then(
  ([bgSprite, marioSprite, levelData]) => {
    const { compositor, updateCenter } = initialSetup(
      ctx,
      bgSprite,
      marioSprite
    );

    const timer = new Timer(compositor, updateCenter);

    timer.start();
  }
);
