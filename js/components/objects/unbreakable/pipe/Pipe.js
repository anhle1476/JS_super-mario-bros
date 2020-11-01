import Unbreakable from "../Unbreakable.js";
import { createBuffer } from "../../../../utilities/createBuffer.js";

export default class Pipe extends Unbreakable {
  constructor(spriteSheet, posX, posY, height) {
    super(spriteSheet, "vertical-pipe", posX, posY, 2, height);
    this.buffer = this.createObjectBuffer(spriteSheet, 2, height);
  }

  createObjectBuffer(spriteSheet, width, height) {
    const [buffer, context] = createBuffer(width, height);

    spriteSheet.drawTile("vertical-pipe-head", context, 0, 0);

    for (let y = 1; y < height; y++) {
      spriteSheet.drawTile("vertical-pipe-body", context, 0, y);
    }

    return buffer;
  }
}
