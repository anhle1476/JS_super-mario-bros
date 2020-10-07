export const loadImage = (url) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.src = url;
  });
};

export const loadLevel = (level) =>
  fetch(`./levels/${level}.json`).then((data) => data.json());
