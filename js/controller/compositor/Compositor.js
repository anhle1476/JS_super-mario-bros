import { GAME_STATE } from "../../math/gameConst.js";
const CANVAS_SIZE = {
  WIDTH: 390,
  HEIGHT: 240,
};

export default class Compositor {
  constructor(ctx, viewPort) {
    this.ctx = ctx;
    this.viewPort = viewPort;
    this.layers = [];
  }

  addLayer(layer) {
    this.layers.push(layer);
  }

  drawLayers(game) {
    this.clearCanvas();
    this.layers.forEach((layer) =>
      layer.drawObjects(this.ctx, this.viewPort.base)
    );
    this.drawCurrentGameState(game);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
  }

  drawCurrentGameState(game) {
    switch (game.state) {
      case GAME_STATE.PLAYING:
        this.drawTimeAndScore(game);
        if (game.isWin) this.drawStory();
        break;
      case GAME_STATE.GAME_OVER:
        this.drawGameOver(game);
        break;
      case GAME_STATE.WIN:
        this.drawWin(game);
        break;
    }
  }

  drawTimeAndScore(game) {
    this.ctx.font = "8px normal";
    this.ctx.fillText(`SCORE: ${game.score}`, 16, 16);
    this.ctx.fillText(`TIME: ${game.timeLeft}`, 300, 16);
  }

  drawGameOver(game) {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 390, 240);

    this.ctx.fillStyle = "white";
    this.ctx.font = "16px normal";
    this.ctx.fillText("GAME OVER", 123, 100);

    this.ctx.font = "8px normal";
    const scoreMessage = `Score: ${game.score}`;
    this.ctx.fillText(scoreMessage, (390 - scoreMessage.length * 8) / 2, 135);

    this.ctx.fillText("PRESS ENTER TO RESTART", 106, 220);
  }

  drawWin(game) {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 390, 240);

    this.ctx.fillStyle = "white";
    this.ctx.font = "16px normal";
    this.ctx.fillText("WIN", 171, 60);

    this.drawStory();

    this.ctx.font = "8px normal";
    const scoreMessage = `Score: ${game.score}`;
    this.ctx.fillText(scoreMessage, (390 - scoreMessage.length * 8) / 2, 150);

    this.ctx.fillText("PRESS ENTER TO RESTART", 106, 220);
  }

  drawStory() {
    this.ctx.font = "8px normal";
    this.ctx.fillText("After the surgery,", 123, 90);
    this.ctx.fillText("Mario changed her name to Maria Ozawa", 47, 105);
    this.ctx.fillText("and lived happily ever after.", 79, 120);
  }
}
