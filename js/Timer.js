import { gameConst } from "./math/constant.js";

export default class Timer {
  constructor() {
    let _accumulatedTime = 0;
    let _lastTime = 0;

    this.isStop = false;

    this.updateProxy = (time) => {
      if (this.isStop) return;
      _accumulatedTime += (time - _lastTime) / 1000;

      while (_accumulatedTime > gameConst.DELTA_TIME) {
        _accumulatedTime -= gameConst.DELTA_TIME;
        this.update();
      }

      _lastTime = time;
      this.enqueue();
    };
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
