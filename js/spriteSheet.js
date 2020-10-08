import { createBuffer } from "./utilities/createBuffer.js";

export default class SpriteSheet {
  constructor(game, image) {
    this.image = image;
    this.game = game;
    this.tiles = new Map();
  }

  defineTile(name, sX, sY) {
    this.define(name, sX * 16, sY * 16, 16, 16);
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

  define(name, sX, sY, width, height) {
    const [buffer, context] = createBuffer(width, height);

    this._drawImageToBuffer(context, sX, sY, width, height);

    this.tiles.set(name, buffer);
  }

  defineAnimation(name, animations, width, height) {
    const animationBuffer = {};

    for (const state in animations) {
      const stateBuffers = [];

      animations[state].forEach(([sX, sY]) => {
        const [buffer, context] = createBuffer(width, height);
        this._drawImageToBuffer(context, sX, sY, width, height);
        stateBuffers.push(buffer);
      });

      animationBuffer[state] = stateBuffers;
    }

    this.tiles.set(name, animationBuffer);
  }

  drawTile(name, context, x, y) {
    context.drawImage(this.tiles.get(name), x * 16, y * 16);
  }

  _drawBufferToCanvas(context, buffer, x, y) {
    context.drawImage(buffer, x * 16, y * 16 - buffer.height + 16);
  }

  draw(name, context, x, y) {
    this._drawBufferToCanvas(context, this.tiles.get(name), x, y);
  }

  drawAnimation(name, context, state, x, y) {
    const stateBuffers = this.tiles.get(name)[state];
    const buffer =
      stateBuffers[
        Math.floor((this.game.frames % 20) / (20 / stateBuffers.length))
      ];

    this._drawBufferToCanvas(context, buffer, x, y);
  }
}
