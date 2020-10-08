import { GAME_CONST } from "./math/gameConst.js";

export default class Timer {
  constructor(compositor, updateCenter, collisionDetector) {
    this.compositor = compositor;
    this.updateCenter = updateCenter;
    this.collisionDetector = collisionDetector;

    this._accumulatedTime = 0;
    this._lastTime = 0;
    this.isStop = false;

    this.updateProxy = this.updateProxy.bind(this);
    this.stop = this.stop.bind(this);

    document.getElementById("stop").addEventListener("click", this.stop);
  }

  updateProxy(time) {
    if (this.isStop) return;
    this._accumulatedTime += (time - this._lastTime) / 1000;

    while (this._accumulatedTime > GAME_CONST.DELTA_TIME) {
      this._accumulatedTime -= GAME_CONST.DELTA_TIME;

      this.updateCenter.updateObjects();
      this.compositor.drawLayers();

      this.collisionDetector.run();
    }

    this._lastTime = time;
    this.enqueue();
  }

  enqueue() {
    requestAnimationFrame(this.updateProxy);
  }

  start() {
    this.enqueue();
  }

  stop() {
    this.isStop = true;
    document.getElementById("stop").innerText = "OK";
  }
}
