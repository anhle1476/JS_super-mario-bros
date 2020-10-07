export default class Layer {
  constructor() {
    this.objects = [];
  }

  addObject(object) {
    this.objects.push(object);
  }

  drawObjects(ctx) {
    this.objects.forEach((obj) => obj.draw(ctx));
  }
}
