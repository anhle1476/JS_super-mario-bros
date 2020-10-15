import MushroomMinion from "../mushroom/MushroomMinion.js";

export function minionFactory(data, sprite) {
  const minionsList = [];

  data.forEach((minions) => {
    switch (minions.tile) {
      case "mushroom":
        minions.set.forEach(([x, y]) => {
          minionsList.push(new MushroomMinion(sprite, x, y));
        });
        break;
      default:
        console.log("undefined minion");
    }
  });

  return minionsList;
}
