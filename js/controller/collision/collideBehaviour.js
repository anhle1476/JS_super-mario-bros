import {GAME_CONST} from '../../math/gameConst.js'

export function normalCollideTop(obj, entity) {
  entity.pos.y = obj.pos.y - 1;
  entity.vel.y = -GAME_CONST.GRAVITY;
}

export function normalCollideBottom(obj, entity) {
  entity.pos.y = obj.pos.y + obj.size.height;
  entity.vel.y = 0;
}

export function normalCollideRight(obj, entity) {
  entity.pos.x = obj.pos.x + obj.size.width + 0.01;
  entity.vel.x = 0;
}

export function normalCollideLeft(obj, entity) {
  entity.pos.x = obj.pos.x - 1.01;
  entity.vel.x = 0; 
}