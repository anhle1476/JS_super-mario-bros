import SpriteSheet from "../spriteSheet.js";

import { loadImage } from "./resourceLoader.js";

export function loadBackgroundSprite(game) {
  return loadImage("./img/tiles.png").then((image) => {
    const bgSprite = new SpriteSheet(game, image);
    bgSprite.defineTile("ground", 0, 0);
    bgSprite.defineTile("brick", 1, 0);
    bgSprite.defineTile("sky", 3, 23);

    return bgSprite;
  });
}

/**
 * DIE: 100
 *
 * Direction:
 * RIGHT: 0
 * LEFT: 10
 *
 * Action:
 * IDLE: 0
 * MOVE: 1
 * DRIFT : 2
 * JUMP: 3
 *
 * Calculate:
 * 0: idle_right
 * 1: move_right
 * 2: drift_right
 * 3: jump_right
 *
 * 10: idle_left
 * 11: move_left
 * 12: drift_left
 * 13: jump_left
 */

const marionAnimation = {
  0: [[275, 44]],
  1: [
    [290, 44],
    [304, 44],
    [320, 44],
  ],
  2: [[338, 44]],
  3: [[355, 44]],
  10: [[222, 44]],
  11: [
    [207, 44],
    [193, 44],
    [177, 44],
  ],
  12: [[160, 44]],
  13: [[142, 44]],
  100: [[12, 44]],
};

export function loadMarioSprite(game) {
  return loadImage("./img/characters.gif").then((image) => {
    const marioSprite = new SpriteSheet(game, image);

    marioSprite.defineAnimation("mario", marionAnimation, 1, 1);

    return marioSprite;
  });
}
