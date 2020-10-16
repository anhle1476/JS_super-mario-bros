import { createBuffer } from "../../utilities/createBuffer.js";

export default class SpriteSheet {
  constructor(image) {
    this.image = image;
    this.tiles = new Map();
  }

  _drawImageToBuffer(context, sX, sY, width, height) {
    context.drawImage(
      this.image,
      sX,
      sY,
      width * 16,
      height * 16,
      0,
      0,
      width * 16,
      height * 16
    );
  }

  defineTile(name, sX, sY) {
    this.defineTileWithSize(name, sX, sY, 1, 1);
  }

  defineTileWithSize(name, sX, sY, width, height) {
    this.define(name, sX * 16, sY * 16, width, height);
  }

  define(name, sX, sY, width, height) {
    const [buffer, context] = createBuffer(width, height);
    this._drawImageToBuffer(context, sX, sY, width, height);
    this.tiles.set(name, buffer);
  }

  drawTile(name, context, x, y) {
    context.drawImage(this.tiles.get(name), x * 16, y * 16);
  }
}
