import Game from "./Game.js";
import Mario from "./components/entities/mario/Mario.js";
import AudioController from "./controller/audio/AudioController.js";
import Keyboard from "./input/keyboard/Keyboard.js";

import { GAME_STATE } from "./math/gameConst.js";
import { ACTION, DIRECTION } from "./math/entityState.js";

import { initialSetup } from "./controller/initialSetup.js";
import { loadLevel } from "./loader/resourceLoader.js";
import {
  loadBackgroundSprite,
  loadMarioSprite,
} from "./loader/spriteLoader.js";
import { loadAudioResource } from "./loader/audioLoader.js";
import { preloadFont } from "./loader/preloadFont.js";
import { drawInitialScreen } from "./utilities/drawInitialScreen.js";

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
  const audioController = new AudioController(audio);
  const mario = new Mario(marioSprite, audioController);

  let timer = initialSetup(
    game,
    ctx,
    audioController,
    mario,
    bgSprite,
    marioSprite,
    levelData
  );

  // setup Keyboard
  let keyboard = new Keyboard(audioController);

  function resetMove() {
    mario.action = ACTION.IDLE;
  }
  function resetNothing() {}

  function moveLeft() {
    mario.direction = DIRECTION.LEFT;
    mario.action = ACTION.MOVE;
  }

  function moveRight() {
    mario.direction = DIRECTION.RIGHT;
    mario.action = ACTION.MOVE;
  }

  function jump() {
    if (game.state === GAME_STATE.PLAYING && !mario.isJump) {
      mario.vel.y -= 0.42;
      keyboard.audioController.playJump();
    }
  }

  function startGame() {
    switch (game.state) {
      case GAME_STATE.PLAYING:
        return;
      case GAME_STATE.READY:
        timer.start();
        break;
      case GAME_STATE.GAME_OVER:
      case GAME_STATE.WIN:
        game.reset();
        mario.reset();
        timer = initialSetup(
          game,
          ctx,
          audioController,
          mario,
          bgSprite,
          marioSprite,
          levelData
        );
        timer.start();
    }
  }

  keyboard.addKey("MOVE", 37, moveLeft, resetMove);
  keyboard.addKey("MOVE", 39, moveRight, resetMove);
  keyboard.addKey("JUMP", 32, jump, resetNothing);
  keyboard.addKey("SYSTEM", 13, startGame, resetNothing);

  document.addEventListener("keydown", keyboard.keyDownHandler);
  document.addEventListener("keyup", keyboard.keyUpHandler);

  drawInitialScreen(ctx);
});
