import SpriteSheet from "./spriteSheet.js";

export default class AnimationSprite extends SpriteSheet {
  constructor(image) {
    super(image);
  }

  defineChar(char, sX, sY) {
    this.define(char, sX * 8, sY * 8, 0.5, 0.5);
  }

  drawString(string, context, baseX, baseY) {
    for (let i = 0; i < string.length; i++) {
      this.drawTile(string.charAt(i), context, baseX + i * 0.5, baseY);
    }
  }
}
