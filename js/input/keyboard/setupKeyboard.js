import Keyboard from "./Keyboard.js";
import { ACTION, DIRECTION } from "../../math/entityState.js";

export function setUpKeyboard(mario) {
  let keyboard = new Keyboard();

  function resetMove() {
    mario.action = ACTION.IDLE;
  }
  function resetNothing() {}

  function moveLeft() {
    mario.direction = DIRECTION.LEFT;
    mario.action = ACTION.MOVE;
  }

  function moveRight() {
    mario.direction = DIRECTION.RIGHT;
    mario.action = ACTION.MOVE;
  }

  function jump() {
    if (!mario.isJump) {
      mario.vel.y -= 0.42;
    }
  }

  function logMario() {
    console.log(mario);
  }

  keyboard.addKey("MOVE", 37, moveLeft, resetMove);
  keyboard.addKey("MOVE", 39, moveRight, resetMove);
  keyboard.addKey("JUMP", 32, jump, resetNothing);
  keyboard.addKey("LOG", 13, logMario, resetNothing);

  document.addEventListener("keydown", keyboard.keyDownHandler);
  document.addEventListener("keyup", keyboard.keyUpHandler);
}
