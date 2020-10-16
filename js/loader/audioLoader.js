import { loadAudio } from "./resourceLoader.js";

export function loadAudioResource() {
  return Promise.all([
    loadAudio("./audio/theme.ogg"),
    loadAudio("./audio/coin.ogg"),
    loadAudio("./audio/jump.ogg"),
    loadAudio("./audio/stomp.ogg"),
    loadAudio("./audio/die.ogg"),
  ]).then(([theme, coin, jump, stomp, die]) => ({
    theme,
    coin,
    jump,
    stomp,
    die,
  }));
}
