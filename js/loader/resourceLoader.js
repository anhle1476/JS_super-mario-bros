export const loadImage = (url) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.src = url;
  });
};

export const loadAudio = async (url) => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const context = new AudioContext();
  return context.decodeAudioData(buffer);
};

export const loadLevel = (level) =>
  fetch(`./levels/${level}.json`).then((data) => data.json());
