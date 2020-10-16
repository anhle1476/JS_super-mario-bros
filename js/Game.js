export default class Game {
  constructor() {
    this.resetGame();
  }

  resetGame() {
    this.frames = 0;
    this.score = 0;
  }

  updateFrames() {
    this.frames++;
  }

  scoreGetCoin() {
    this.score += 100;
    console.log("score", this.score);
  }

  scoreKillMinion() {
    this.score += 300;
    console.log("score", this.score);
  }

  gameOver() {
    alert(`Game Over! Score: ${this.score}`);
  }
}
