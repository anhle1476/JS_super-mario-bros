import Object from "../Object.js";

export default class FlyUpCoin extends Object {
  constructor(spriteSheet, posX, posY) {
    super(spriteSheet, "coin-3", posX, posY, 1, 1);
    this.baseY = posY;
    this.spriteSheet = spriteSheet;
    this.currentCoin = 3;
  }

  nextCoin() {
    this.pos.y = this.baseY;
    this.currentCoin--;
    this.name = "coin-" + this.currentCoin;
    if (this.currentCoin === 0) return;
    this.buffer = this.createObjectBuffer(this.spriteSheet, this.name, 1, 1);
  }

  flyUp() {
    this.pos.y -= 0.2;
    if (this.baseY - this.pos.y > 2.5) {
      this.nextCoin();
    }
  }
}
