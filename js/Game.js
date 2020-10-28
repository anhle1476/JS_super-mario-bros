import { GAME_STATE } from "./math/gameConst.js";

export default class Game {
  constructor() {
    this.init();
    this.state = GAME_STATE.READY;
  }

  init() {
    this.frames = 0;
    this.score = 0;
    this.timeLeft = 120;
    this.isWin = false;
  }

  reset() {
    this.init();
    this.state = GAME_STATE.PLAYING;
  }

  updateFrames(audioController) {
    this.frames++;
    if (this.isWin) {
      if (this.frames % 6 === 0) {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.score += 100;
        }
      }
    } else {
      if (this.frames % 60 === 0) {
        if (--this.timeLeft <= 0) this.gameOver(audioController);
      }
    }
  }

  scoreGetCoin() {
    this.score += 100;
  }

  scoreKillMinion() {
    this.score += 300;
  }

  gameOver(audioController) {
    setTimeout(() => {
      this.state = GAME_STATE.GAME_OVER;
      audioController.playGameOver();
    }, 3000);
  }

  win(audioController) {
    this.isWin = true;
    audioController.stopTheme();
    audioController.playWin();

    setTimeout(() => {
      this.state = GAME_STATE.WIN;
    }, 10000);
  }
}
