export default class Compositor {
  constructor(ctx, viewPort) {
    this.ctx = ctx;
    this.viewPort = viewPort;
    this.layers = [];
  }

  addLayer(layer) {
    this.layers.push(layer);
  }

  drawLayers() {
    this.layers.forEach((layer) =>
      layer.drawObjects(this.ctx, this.viewPort.base)
    );
  }
}
