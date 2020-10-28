import { loadAudio } from "./resourceLoader.js";

export function loadAudioResource() {
  return Promise.all([
    loadAudio("./audio/theme.ogg"),
    loadAudio("./audio/coin.ogg"),
    loadAudio("./audio/jump.ogg"),
    loadAudio("./audio/stomp.ogg"),
    loadAudio("./audio/die.ogg"),
    loadAudio("./audio/break.ogg"),
    loadAudio("./audio/gameOver.ogg"),
    loadAudio("./audio/win.ogg"),
  ]).then(([theme, coin, jump, stomp, die, breakItem, gameOver, win]) => ({
    theme,
    coin,
    jump,
    stomp,
    die,
    breakItem,
    gameOver,
    win,
  }));
}
