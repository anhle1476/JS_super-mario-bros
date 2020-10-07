import SpriteSheet from "../spriteSheet.js";

import { loadImage } from "./resourceLoader.js";

export function loadBackgroundSprite() {
  return loadImage("./img/tiles.png").then((image) => {
    const bgSprite = new SpriteSheet(image);
    bgSprite.defineTile("ground", 0, 0);
    bgSprite.defineTile("sky", 3, 23);

    return bgSprite;
  });
}

export function loadMarioSprite() {
  return loadImage("./img/characters.gif").then((image) => {
    const marioSprite = new SpriteSheet(image);
    marioSprite.define("idle", 276, 44, 16, 16);

    return marioSprite;
  });
}
