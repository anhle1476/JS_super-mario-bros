export default class AudioController {
  constructor(buffer) {
    this.audioCtx = new AudioContext();
    this.buffer = buffer;
  }

  playSong(name) {
    const source = this.audioCtx.createBufferSource();
    source.buffer = this.buffer[name];
    source.connect(this.audioCtx.destination);
    source.start(0);
    return source;
  }

  playTheme() {
    this.theme = this.playSong("theme");
    this.theme.loop = true;
  }

  stopTheme() {
    this.theme.stop();
  }

  playJump() {
    this.playSong("jump");
  }

  playCoin() {
    this.playSong("coin");
  }

  playStomp() {
    this.playSong("stomp");
  }

  playBreak() {
    this.playSong("breakItem");
  }

  playDie() {
    this.stopTheme();
    this.playSong("die");
  }

  playGameOver() {
    this.stopTheme();
    this.playSong("gameOver");
  }

  playWin() {
    this.playSong("win");
  }
}
