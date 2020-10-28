import { GAME_CONST, GAME_STATE } from "./math/gameConst.js";

export default class Timer {
  constructor(game, mainController) {
    this._mainController = mainController;
    this._game = game;
    this._accumulatedTime = 0;
    this._lastTime = 0;

    this.updateProxy = this.updateProxy.bind(this);
  }

  updateProxy(time) {
    this._accumulatedTime += (time - this._lastTime) / 1000;

    while (this._accumulatedTime > GAME_CONST.DELTA_TIME) {
      this._accumulatedTime -= GAME_CONST.DELTA_TIME;
      this._mainController.update();
    }

    if (this._game.state !== GAME_STATE.PLAYING) return;

    this._lastTime = time;
    requestAnimationFrame(this.updateProxy);
  }

  start() {
    this._game.state = GAME_STATE.PLAYING;

    this._accumulatedTime = 0;
    this._lastTime = performance.now();
    this.updateProxy(performance.now());

    this._mainController.audioController.playTheme();
  }

  getReady() {
    this._game.drawGameReady();
  }
}
