import SpriteSheet from "./spriteSheet.js";
import { createBuffer } from "../../utilities/createBuffer.js";

export default class AnimationSprite extends SpriteSheet {
  constructor(image, game) {
    super(image);
    this.game = game;
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

  drawAnimation(name, context, state, x, y) {
    const stateBuffers = this.tiles.get(name)[state];
    const buffer =
      stateBuffers[
        Math.floor((this.game.frames % 20) / (20 / stateBuffers.length))
      ];

    context.drawImage(buffer, x * 16, y * 16 - buffer.height + 16);
  }
}
