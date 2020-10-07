import { createBuffer } from "./utilities/createBuffer.js";

export default class SpriteSheet {
  constructor(image) {
    this.image = image;
    this.tiles = new Map();
  }

  defineTile(name, sX, sY) {
    this.define(name, sX * 16, sY * 16, 16, 16);
  }

  define(name, sX, sY, width, height) {
    const [buffer, context] = createBuffer(width, height);

    context.drawImage(this.image, sX, sY, width, height, 0, 0, width, height);
    this.tiles.set(name, buffer);
  }

  drawTile(name, context, x, y) {
    context.drawImage(this.tiles.get(name), x * 16, y * 16);
  }

  draw(name, context, x, y) {
    context.drawImage(
      this.tiles.get(name),
      x * 16,
      y * 16 - buffer.height + 16
    );
  }
}
