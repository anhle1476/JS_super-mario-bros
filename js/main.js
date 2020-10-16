import Game from "./Game.js";

import { initialSetup } from "./controller/initialSetup.js";
import { loadLevel } from "./loader/resourceLoader.js";
import {
  loadBackgroundSprite,
  loadMarioSprite,
} from "./loader/spriteLoader.js";
import { loadAudioResource } from "./loader/audioLoader.js";
import { preloadFont } from "./loader/preloadFont.js";

const ctx = document.getElementById("screen").getContext("2d");

ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
window.AudioContext = window.AudioContext || window.webkitAudioContext;

ctx.fillStyle = "white";
preloadFont();

const game = new Game(ctx);

Promise.all([
  loadBackgroundSprite(game),
  loadMarioSprite(game),
  loadLevel("1-1"),
  loadAudioResource(),
]).then(([bgSprite, marioSprite, levelData, audio]) => {
  const timer = initialSetup(
    game,
    ctx,
    bgSprite,
    marioSprite,
    levelData,
    audio
  );

  timer.getReady();
});
