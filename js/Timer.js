import { GAME_CONST, GAME_STATE } from "./math/gameConst.js";

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

    this.updateProxy = this.updateProxy.bind(this);
  }

  updateProxy(time) {
    this._accumulatedTime += (time - this._lastTime) / 1000;

    while (this._accumulatedTime > GAME_CONST.DELTA_TIME) {
      this._accumulatedTime -= GAME_CONST.DELTA_TIME;

      this.game.updateFrames(this.audioController);
      this.updateCenter.update(this.game, this.audioController);
      this.compositor.drawLayers(this.game);
      this.collisionDetector.run(this.game, this.audioController);
    }

    if (this.game.state !== GAME_STATE.PLAYING) return;

    this._lastTime = time;
    requestAnimationFrame(this.updateProxy);
  }

  start() {
    this.game.state = GAME_STATE.PLAYING;

    this._accumulatedTime = 0;
    this._lastTime = performance.now();

    this.updateProxy(performance.now());
    this.audioController.playTheme();
  }

  getReady() {
    this.game.drawGameReady();
  }
}
