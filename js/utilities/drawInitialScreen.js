export function drawInitialScreen(ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 390, 240);

  ctx.fillStyle = "white";
  ctx.font = "48px title";
  ctx.fillText("MINI MARIO", 105, 120);

  ctx.font = "8px normal";
  ctx.fillText("PRESS ENTER TO START", 111, 160);
}
