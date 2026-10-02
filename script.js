/* ============================================
   DRUM MACHINE - script.js
   ============================================ */

const PADS = [
  { key: "Q", name: "Heater 1" },
  { key: "W", name: "Heater 2" },
  { key: "E", name: "Heater 3" },
  { key: "A", name: "Heater 4" },
  { key: "S", name: "Clap" },
  { key: "D", name: "Open-HH" },
  { key: "Z", name: "Kick-n'-Hat" },
  { key: "X", name: "Kick" },
  { key: "C", name: "Closed-HH" },
];

const display = document.getElementById("display");

function playPad(key) {
  const audio = document.getElementById(key.toUpperCase());
  if (!audio) return;

  const pad = audio.parentElement;
  const padData = PADS.find((p) => p.key === key.toUpperCase());

  if (padData) {
    updateDisplay(padData.name);
  }

  audio.currentTime = 0;
  audio.play().catch(() => {});

  triggerPadAnimation(pad);
}

function updateDisplay(text) {
  display.textContent = text;
  display.classList.add("active");
  clearTimeout(display._resetTimer);
  display._resetTimer = setTimeout(() => {
    display.classList.remove("active");
  }, 600);
}

function triggerPadAnimation(pad) {
  pad.classList.add("active");
  createRipple(pad);
  clearTimeout(pad._activeTimer);
  pad._activeTimer = setTimeout(() => {
    pad.classList.remove("active");
  }, 150);
}

function createRipple(pad) {
  const existingRipples = pad.querySelectorAll(".ripple");
  existingRipples.forEach((r) => r.remove());

  const ripple = document.createElement("span");
  ripple.classList.add("ripple");

  const size = Math.max(pad.offsetWidth, pad.offsetHeight);
  ripple.style.width = size + "px";
  ripple.style.height = size + "px";
  ripple.style.left = pad.offsetWidth / 2 - size / 2 + "px";
  ripple.style.top = pad.offsetHeight / 2 - size / 2 + "px";

  pad.appendChild(ripple);

  ripple.addEventListener("animationend", () => ripple.remove());
}

document.querySelectorAll(".drum-pad").forEach((pad) => {
  pad.addEventListener("click", () => {
    const audio = pad.querySelector(".clip");
    if (!audio) return;
    playPad(audio.id);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  const key = e.key.toUpperCase();
  const validKeys = PADS.map((p) => p.key);
  if (validKeys.includes(key)) {
    playPad(key);
  }
});
