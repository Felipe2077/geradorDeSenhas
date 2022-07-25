import * as base from "./base.js";

//*variables
let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
let passOutput = document.getElementById("password");
let novo = [];
let restartPass = document.getElementById("restartPass");
let copyPass = document.getElementById("copyPass");
let inputMaiuscula = document.getElementById("maisculas");
let inputNumero = document.getElementById("numeros");
let inputSimbolo = document.getElementById("simbolos");
let checkBox = document.querySelectorAll(".pass-check input");
let colorBar = document.getElementById("passColorBar");

let getPassWord = () => {
  let password = [];
  if (inputMaiuscula.checked && !inputNumero.checked && !inputSimbolo.checked) {
    //* apenas letra maiuscula
    password = base.getLetraMinuscula().concat(base.getLetraMaiuscula());
  } else if (
    !inputMaiuscula.checked &&
    inputNumero.checked &&
    !inputSimbolo.checked
  ) {
    //* apenas numero
    password = base.getLetraMinuscula().concat(base.getNumbers());
  } else if (
    !inputMaiuscula.checked &&
    !inputNumero.checked &&
    inputSimbolo.checked
  ) {
    //* apenas simbolo
    password = base.getLetraMinuscula().concat(base.getChar());
  } else if (
    inputMaiuscula.checked &&
    inputNumero.checked &&
    !inputSimbolo.checked
  ) {
    //* maiuscula e numero
    password = base
      .getLetraMinuscula()
      .concat(base.getLetraMaiuscula(), base.getNumbers());
  } else if (
    inputMaiuscula.checked &&
    !inputNumero.checked &&
    inputSimbolo.checked
  ) {
    //* maiuscula e simbolo
    password = base
      .getLetraMinuscula()
      .concat(base.getLetraMaiuscula(), base.getChar());
  } else if (
    !inputMaiuscula.checked &&
    inputNumero.checked &&
    inputSimbolo.checked
  ) {
    //* numero e simbolo
    password = base
      .getLetraMinuscula()
      .concat(base.getNumbers(), base.getChar());
  } else if (
    inputMaiuscula.checked &&
    inputNumero.checked &&
    inputSimbolo.checked
  ) {
    //* todos
    password = base
      .getLetraMinuscula()
      .concat(base.getNumbers(), base.getChar(), base.getLetraMaiuscula());
  } else {
    password = base.getLetraMinuscula();
  }
  return password;
};

//* Functions
function generatePass() {
  novo = "";
  for (let i = 0; i < slider.value; i++) {
    const random = Math.floor(Math.random() * getPassWord().length);
    novo += getPassWord()[random];
  }
  passOutput.setAttribute("value", (passOutput.innerHTML = novo));
}

function generateColorBar(slider) {
  if (slider <= 6) {
    colorBar.classList.remove("forte");
    colorBar.classList.remove("media");
    colorBar.classList.add("fraca");
    colorBar.textContent = "Essa é uma senha fraca";
  } else if (slider >= 7 && slider <= 9) {
    colorBar.classList.remove("forte");
    colorBar.classList.remove("fraca");
    colorBar.classList.add("media");
    colorBar.textContent = "Ainda falta um pouco.";
  } else if (slider > 9 && slider <= 14) {
    colorBar.classList.remove("media");
    colorBar.classList.remove("fraca");
    colorBar.classList.add("forte");
    colorBar.textContent = "Ótimo! Essa senha é forte";
  } else if (slider > 14) {
    colorBar.textContent = "Você atingiu o nível máximo de segurança da senha!";
  }
}

function printPassOnScreen() {
  output.innerHTML = slider.value;
  slider.oninput = function () {
    output.innerHTML = this.value;
    generatePass();
    generateColorBar(slider.value);
  };
}
checkBox.forEach((element) => {
  element.addEventListener("click", () => {
    generatePass();
  });
});

let bannerCopy = document.querySelector(".bannerContainer");

function copyToClipBoard() {
  passOutput.select();
  navigator.clipboard.writeText(passOutput.textContent);
}

function generateBanner() {
  bannerCopy.classList.remove("inativo");
  bannerCopy.classList.add("ativo");
  setTimeout(() => {
    bannerCopy.classList.remove("ativo");
    bannerCopy.classList.add("inativo");
  }, 1500);
}

copyPass.addEventListener("click", copyToClipBoard);
copyPass.addEventListener("click", generateBanner);

restartPass.addEventListener("click", generatePass);
restartPass.addEventListener("click", () => {
  restartPass.classList.add("clique");
  setTimeout(() => {
    restartPass.classList.remove("clique");
  }, 550);
});

generatePass();
printPassOnScreen();
