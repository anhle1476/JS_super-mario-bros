export default class ViewPort {
  constructor(mapWidth, mario) {
    this.mario = mario;
    this.max = mapWidth - 25;
    this.base = 0;
  }

  update() {
    const delta = this.mario.pos.x - this.base;

    if (this.base < this.max && delta > 16) {
      this.base = Math.min(this.max, this.base + delta - 16);
      return;
    }

    if (this.base > 0 && delta < 8) {
      this.base = Math.max(0, this.base + delta - 8);
    }
  }
}
