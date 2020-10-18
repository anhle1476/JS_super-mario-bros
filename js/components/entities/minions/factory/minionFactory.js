import MushroomMinion from "../mushroom/MushroomMinion.js";
import Doctor from "../doctor/Doctor.js";

export function minionFactory(data, sprite) {
  const minionsList = [];

  data.forEach((minions) => {
    switch (minions.tile) {
      case "mushroom":
        minions.set.forEach(([x, y]) => {
          minionsList.push(new MushroomMinion(sprite, x, y));
        });
        break;
      case "doctor":
        minions.set.forEach(([x, y]) => {
          minionsList.push(new Doctor(sprite, x, y));
        });
        break;
      default:
        console.log("undefined minion");
    }
  });

  return minionsList;
}
