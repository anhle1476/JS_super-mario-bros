import SpriteSheet from "../controller/spriteSheet/spriteSheet.js";
import AnimationSprite from "../controller/spriteSheet/AnimationSprite.js";

import { loadImage } from "./resourceLoader.js";

export async function loadBackgroundSprite() {
  const image = await loadImage("./img/tiles.png");
  const bgSprite = new SpriteSheet(image);

  bgSprite.defineTile("sky", 3, 23);
  bgSprite.defineTile("ground", 0, 0);
  bgSprite.defineTileWithSize("cloud-1", 0, 20, 3, 2);
  bgSprite.defineTileWithSize("cloud-2", 11, 20, 4, 2);
  bgSprite.defineTile("brick", 1, 0);
  bgSprite.defineTile("rock", 0, 1);
  bgSprite.defineTile("coin-box-3", 24, 0);
  bgSprite.defineTile("coin-box-2", 25, 0);
  bgSprite.defineTile("coin-box-1", 26, 0);
  bgSprite.defineTile("coin-box-0", 27, 0);
  bgSprite.defineTile("coin-3", 24, 1);
  bgSprite.defineTile("coin-2", 25, 1);
  bgSprite.defineTile("coin-1", 26, 1);
  bgSprite.defineTileWithSize("vertical-pipe-head", 0, 8, 2, 1);
  bgSprite.defineTileWithSize("vertical-pipe-body", 0, 9, 2, 1);

  return bgSprite;
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

const marioAnimation = {
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
  200: [[344, 162]],
  203: [[359, 162]],
  210: [[328, 162]],
  213: [[312, 162]],
};

const mushroomMinionAnimation = {
  0: [[277, 187]],
  1: [
    [296, 187],
    [315, 187],
  ],
};

const flowerMinionAnimation = {
  1: [
    [125, 180],
    [144, 180],
  ],
};

export async function loadMarioSprite(game) {
  const image = await loadImage("./img/characters.png");
  const marioSprite = new AnimationSprite(image, game);

  marioSprite.defineAnimation("mario", marioAnimation, 1, 1);
  marioSprite.defineAnimation("doctor", { 1: [[378, 162]] }, 1, 1.5);
  marioSprite.defineAnimation("mushroom-minion", mushroomMinionAnimation, 1, 1);
  marioSprite.defineAnimation("flower-minion", flowerMinionAnimation, 1, 2);

  return marioSprite;
}
