export default class Game {
  constructor() {
    this.resetGame();
  }

  resetGame() {
    this.frames = 0;
    this.lives = 3;
    this.score = 0;
  }

  updateFrames() {
    this.frames++;
  }
}
