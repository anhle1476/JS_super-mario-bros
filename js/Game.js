import { GAME_STATE } from "./math/gameConst.js";

export default class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.init();
    this.highestScore = 50000;

    this.state = GAME_STATE.READY;
  }

  init() {
    this.frames = 0;
    this.score = 0;
    this.timeLeft = 120;
  }

  reset() {
    this.init();
    this.state = GAME_STATE.PLAYING;
  }

  updateFrames(audioController) {
    this.frames++;
    if (this.frames % 60 === 0) {
      if (--this.timeLeft <= 0) this.gameOver(audioController);
    }
  }

  scoreGetCoin() {
    this.score += 100;
  }

  scoreKillMinion() {
    this.score += 300;
  }

  gameOver(audioController) {
    this.state = GAME_STATE.GAME_OVER;
    setTimeout(() => {
      this.drawGameOver();
      audioController.playGameOver();
    }, 3000);
  }

  drawGameReady() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 390, 240);

    this.ctx.fillStyle = "white";
    this.ctx.font = "48px title";
    this.ctx.fillText("MINI MARIO", 105, 120);

    this.ctx.font = "8px normal";
    this.ctx.fillText("PRESS ENTER TO START", 111, 160);
  }

  drawGameState() {
    this.ctx.font = "8px normal";
    this.ctx.fillText(`SCORE: ${this.score}`, 16, 16);
    this.ctx.fillText(`TIME: ${this.timeLeft}`, 300, 16);
  }

  drawGameOver() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 390, 240);
    this.ctx.fillStyle = "white";

    this.ctx.font = "16px normal";
    this.ctx.fillText("GAME OVER", 123, 90);

    this.ctx.font = "8px normal";
    const scoreMessage = `Score: ${this.score}`;
    const highestScoreMessage = `Highest: ${this.highestScore}`;
    this.ctx.fillText(scoreMessage, (390 - scoreMessage.length * 8) / 2, 130);
    this.ctx.fillText(
      highestScoreMessage,
      (390 - highestScoreMessage.length * 8) / 2,
      150
    );

    this.ctx.fillText("PRESS ENTER TO RESTART", 106, 220);
  }
}
