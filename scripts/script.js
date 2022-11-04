import * as password from "./passArrayGenerator.js";

const slider = document.querySelector("#slider");
const inputs = document.querySelectorAll(".inputPass");
let passwordScreen = document.querySelector("#password");

function generatePass() {
  let pass = [];
  for (let i = 0; i <= slider.value; i++) {
    const random = Math.floor(Math.random() * password.getPass().length);
    pass += password.getPass()[random];
  }
  passwordScreen.value = pass;
  return pass;
}

function changeEvents() {
  //* checkbox clicks
  inputs.forEach((e) => {
    e.addEventListener("change", () => {
      generatePass();
    });
  });
  //* slider changes
  slider.addEventListener("input", () => {
    const passSize = document.querySelector("#passSize");
    passSize.innerHTML = slider.value;
    generatePass();
  });
  passSize.innerHTML = slider.value;
  passwordScreen.value = generatePass();
}

function resetPass() {
  const restartBtn = document.querySelector("#restartPass");

  restartBtn.addEventListener("click", () => {
    changeEvents();
    generatePass();
    restartBtn.classList.add("clique");
    setTimeout(() => {
      restartBtn.classList.remove("clique");
    }, 500);
  });
}

changeEvents();
resetPass();
