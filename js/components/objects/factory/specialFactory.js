import CoinBox from "../special/CoinBox.js";

export function specialFactory(data, sprite) {
  const objects = [];

  data.forEach((items) => {
    switch (items.tile) {
      case "coin-box":
        items.set.forEach(([x, y]) => {
          objects.push(new CoinBox(sprite, x, y));
        });
        break;
      default:
        console.log("undefined special obj");
    }
  });

  return objects;
}
