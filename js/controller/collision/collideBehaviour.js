import { GAME_CONST } from "../../math/gameConst.js";

export const normalCollide = {
  top: (obj, entity) => {
    entity.pos.y = obj.pos.y - 1;
    entity.vel.y = -GAME_CONST.GRAVITY;
  },

  bottom: (obj, entity) => {
    entity.pos.y = obj.pos.y + obj.size.height;
    entity.vel.y = 0;
  },

  right: (obj, entity) => {
    if (!entity.isMario) {
      entity.changeDirection();
    }
    entity.pos.x = obj.pos.x + obj.size.width + 0.01;
    entity.vel.x = 0;
  },

  left: (obj, entity) => {
    if (!entity.isMario) {
      entity.changeDirection();
    }
    entity.pos.x = obj.pos.x - 1.01;
    entity.vel.x = 0;
  },
};

export const minionCollide = {
  top: (minion, entity) => {
    entity.pos.y = minion.pos.y - 1;
    entity.vel.y = -0.1;
  },
  bottom: (minion, entity) => {
    if (!entity.isMario) return;
    normalCollide.bottom(minion, entity);
    entity.die();
  },

  right: (minion, entity) => {
    if (!entity.isMario) return;
    normalCollide.right(minion, entity);
    entity.die();
  },

  left: (minion, entity) => {
    if (!entity.isMario) return;
    normalCollide.left(minion, entity);
    entity.die();
  },
};
