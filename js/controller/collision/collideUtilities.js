export function getMarioPosition(ent) {
  return [
    ent.pos.x + 0.1,
    ent.pos.y + 1 - ent.size.height,
    ent.pos.x + ent.size.width - 0.1,
    ent.pos.y + ent.size.height,
  ];
}

export function getMinionPosition(minion) {
  return [
    minion.pos.x,
    minion.pos.y + 1 - minion.size.height,
    minion.pos.x + minion.size.width,
    minion.pos.y + minion.size.height,
  ];
}

export function getObstaclePosition(obstacle) {
  return [
    obstacle.pos.x,
    obstacle.pos.y,
    obstacle.pos.x + obstacle.size.width,
    obstacle.pos.y + obstacle.size.height,
  ];
}
