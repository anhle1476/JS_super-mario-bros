export default class Compositor {
  constructor(ctx) {
    this.ctx = ctx;
    this.layers = [];
  }

  addLayer(layer) {
    this.layers.push(layer);
  }

  drawLayers() {
    this.layers.forEach((layer) => layer.drawObjects(this.ctx));
  }
}
