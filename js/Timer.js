import { GAME_CONST } from "./math/gameConst.js";

export default class Timer {
  constructor(
    game,
    compositor,
    updateCenter,
    collisionDetector,
    audioController
  ) {
    this.game = game;
    this.compositor = compositor;
    this.updateCenter = updateCenter;
    this.collisionDetector = collisionDetector;
    this.audioController = audioController;

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

      this.game.updateFrames();
      this.updateCenter.update(this.game);
      this.compositor.drawLayers();
      this.collisionDetector.run(this.game, this.audioController);
    }

    this._lastTime = time;
    this.enqueue();
  }

  enqueue() {
    requestAnimationFrame(this.updateProxy);
  }

  start() {
    this.enqueue();
    this.audioController.playTheme();
  }

  stop() {
    this.isStop = true;
    document.getElementById("stop").innerText = "OK";
    this.audioController.stopTheme();
  }
}
