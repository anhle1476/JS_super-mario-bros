export const createBuffer = (width, height) => {
  const buffer = document.createElement("canvas");
  buffer.width = width * 16;
  buffer.height = height * 16;
  const context = buffer.getContext("2d");
  return [buffer, context];
};
