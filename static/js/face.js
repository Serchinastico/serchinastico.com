const MAX_X_TRANSLATION = 20;
const MIN_X_TRANSLATION = -MAX_X_TRANSLATION;
const MAX_Y_TRANSLATION = 20;
const MIN_Y_TRANSLATION = -MAX_Y_TRANSLATION;
const FACTOR = 0.01;
const BLINKING_AVG_INTERVAL = 8000;
const BLINKING_RANDOM_DELTA = 1500;
const OH_MOUTH_INTERVAL = 9000;
const OH_MOUTH_RANDOM_DELTA = 2500;

document.addEventListener("DOMContentLoaded", () => {
  const rightEye = document.querySelector("#right-eye");
  const leftEye = document.querySelector("#left-eye");
  const blinkingMask = document.querySelector("#blinking-mask");
  const smileMouth = document.querySelector("#smile-mouth");
  const ohMouth = document.querySelector("#oh-mouth");

  const initialLeftEyePosition = {
    x: Number.parseFloat(leftEye.getAttribute("cx")),
    y: Number.parseFloat(leftEye.getAttribute("cy")),
  };
  const initialRightEyePosition = {
    x: Number.parseFloat(rightEye.getAttribute("cx")),
    y: Number.parseFloat(rightEye.getAttribute("cy")),
  };
  const leftEyeBoundingBox = leftEye.getBoundingClientRect();

  document.addEventListener("mousemove", (event) => {
    const vector = {
      x: event.pageX - leftEyeBoundingBox.left,
      y: event.pageY - leftEyeBoundingBox.top,
    };

    leftEye.setAttribute(
      "cx",
      initialLeftEyePosition.x +
        clamp(MIN_X_TRANSLATION, MAX_X_TRANSLATION, vector.x * FACTOR)
    );
    leftEye.setAttribute(
      "cy",
      initialLeftEyePosition.y +
        clamp(MIN_X_TRANSLATION, MAX_X_TRANSLATION, vector.y * FACTOR)
    );
    rightEye.setAttribute(
      "cx",
      initialRightEyePosition.x +
        clamp(MIN_Y_TRANSLATION, MAX_Y_TRANSLATION, vector.x * FACTOR)
    );
    rightEye.setAttribute(
      "cy",
      initialRightEyePosition.y +
        clamp(MIN_Y_TRANSLATION, MAX_Y_TRANSLATION, vector.y * FACTOR)
    );
  });

  const blink = () => {
    blinkingMask.style.display = "block";
    setTimeout(() => {
      blinkingMask.style.display = "none";
    }, 100);
  };

  const moveMouth = () => {
    smileMouth.style.display = "none";
    ohMouth.style.display = "block";
    setTimeout(() => {
      smileMouth.style.display = "block";
      ohMouth.style.display = "none";
    }, 1200);
  };

  (function blinkLoop() {
    var rand =
      Math.round(
        Math.random() * (BLINKING_AVG_INTERVAL - BLINKING_RANDOM_DELTA)
      ) + BLINKING_RANDOM_DELTA;
    setTimeout(function () {
      blink();
      blinkLoop();
    }, rand);
  })();

  (function mouthLoop() {
    var rand =
      Math.round(Math.random() * (OH_MOUTH_INTERVAL - OH_MOUTH_RANDOM_DELTA)) +
      OH_MOUTH_RANDOM_DELTA;
    setTimeout(function () {
      moveMouth();
      mouthLoop();
    }, rand);
  })();
});
