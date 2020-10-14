export function createBuffer(width, height) {
  const buffer = document.createElement("canvas");
  buffer.width = width * 16;
  buffer.height = height * 16;
  const context = buffer.getContext("2d");
  return [buffer, context];
}

export function createSingleTileBuffer(spriteSheet, name, width, height) {
  const [buffer, context] = createBuffer(width, height);
  spriteSheet.drawTile(name, context, 0, 0);
  return buffer;
}

export function createMultipleTilesBuffer(spriteSheet, name, width, height) {
  const [buffer, context] = createBuffer(width, height);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      spriteSheet.drawTile(name, context, x, y);
    }
  }

  return buffer;
}
