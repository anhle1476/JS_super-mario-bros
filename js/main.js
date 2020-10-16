import Game from "./Game.js";

import { initialSetup } from "./controller/initialSetup.js";
import { loadLevel, loadAudio } from "./loader/resourceLoader.js";
import {
  loadBackgroundSprite,
  loadMarioSprite,
} from "./loader/spriteLoader.js";
import { loadAudioResource } from "./loader/audioLoader.js";

const ctx = document.getElementById("screen").getContext("2d");

ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const game = new Game();

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

  timer.start();
});
