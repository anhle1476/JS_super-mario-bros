export function preloadFont() {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.font = "4px title";
  ctx.fillText("text", 0, 8);
  ctx.font = "4px normal";
  ctx.fillText("text", 0, 8);
}
