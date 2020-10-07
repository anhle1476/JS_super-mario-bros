export class Vector {
  constructor(x, y) {
    this.x = x * 16;
    this.y = y * 16;
  }
}

export class Size {
  constructor(width, height) {
    this.width = width * 16;
    this.height = height * 16;
  }
}
