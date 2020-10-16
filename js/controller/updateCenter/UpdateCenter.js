export default class UpdateCenter {
  constructor() {
    this.objects = [];
    this.entities = [];
  }

  addObject(object) {
    this.objects.push(object);
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  update(game) {
    this.objects.forEach((obj) => obj.update());

    let removeIndex = -1;
    this.entities.forEach((entity, i) => {
      entity.update();
      if (entity.pos.y > 17) {
        removeIndex = i;
      }
    });

    if (removeIndex >= 0) {
      const removed = this.entities.splice(removeIndex, 1);
      if (removed[0].name === "mario") {
        removed[0].die();
        game.gameOver();
      }
    }
  }
}
