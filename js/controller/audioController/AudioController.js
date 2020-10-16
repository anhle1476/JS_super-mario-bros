export default class AudioController {
  constructor(audio) {
    this.audio = audio;
  }

  playTheme() {
    this.audio.theme.loop = true;
    this.audio.theme.start(0);
    console.log(this.audio.theme);
  }

  stopTheme() {
    this.audio.theme.stop();
  }

  pauseTheme() {
    this.audio.theme.pause();
  }

  resumeTheme() {
    this.audio.theme.resume();
  }
}
