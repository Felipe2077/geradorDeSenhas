import * as base from "./base.js";

/*
 *1 passo: Gerar um array com a combinação de caracteres selecionados (ex: letras e numeros)
 *2 passo: criar um novo array com a quantidade de caracteres selecionados no slider (esse novo array vai pegar caracteres aleatórios do primeiro array)
 *3 passo, colocar a senha gerada na tela.
 */
//*variables
let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
let passOutput = document.getElementById("password");
let novo = [];
let restartPass = document.getElementById("restartPass");
let copyPass = document.getElementById("copyPass");
//* variable froom checkbox
let inputMaiuscula = document.getElementById("maisculas");
//* variables froom checkbox
let inputNumero = document.getElementById("numeros");
//* variables froom checkbox
let inputSimbolo = document.getElementById("simbolos");
//* variables froom checkbox
let checkBox = document.querySelectorAll(".pass-check input");
let colorBar = document.getElementById("passColorBar");
let bannerCopy = document.querySelector(".bannerContainer");

//* criando o array com base na combinação de caracteres escolhido
let getPassWord = () => {
  //*Variáveis condicionais (define a combinação selecionada)
  const onlyNumbers =
    inputNumero.checked && !inputMaiuscula.checked && !inputSimbolo.checked;
  const onlyUpperCase =
    inputMaiuscula.checked && !inputNumero.checked && !inputSimbolo.checked;
  const onlySymbol =
    inputSimbolo.checked && !inputMaiuscula.checked && !inputNumero.checked;
  const numberAndUpper =
    inputMaiuscula.checked && inputNumero.checked && !inputSimbolo.checked;
  const numberAndSymbol =
    !inputMaiuscula.checked && inputNumero.checked && inputSimbolo.checked;
  const upperAndSymbol =
    inputMaiuscula.checked && !inputNumero.checked && inputSimbolo.checked;
  const allChar =
    inputMaiuscula.checked && inputNumero.checked && inputSimbolo.checked;

  //*Array para armazenar a combinação de senha
  let password = [];
  //*
  //*condicional para criar o array com base na combinação selecionada
  if (onlyUpperCase) {
    password = base.getLetraMinuscula().concat(base.getLetraMaiuscula());
  } else if (onlyNumbers) {
    password = base.getLetraMinuscula().concat(base.getNumbers());
  } else if (onlySymbol) {
    password = base.getLetraMinuscula().concat(base.getChar());
  } else if (numberAndUpper) {
    password = base
      .getLetraMinuscula()
      .concat(base.getLetraMaiuscula(), base.getNumbers());
  } else if (upperAndSymbol) {
    password = base
      .getLetraMinuscula()
      .concat(base.getLetraMaiuscula(), base.getChar());
  } else if (numberAndSymbol) {
    password = base
      .getLetraMinuscula()
      .concat(base.getNumbers(), base.getChar());
  } else if (allChar) {
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
  novo = [];
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
  checkBox.forEach((element) => {
    element.addEventListener("click", () => {
      generatePass();
    });
  });
  restartPass.addEventListener("click", generatePass);
  restartPass.addEventListener("click", () => {
    restartPass.classList.add("clique");
    setTimeout(() => {
      restartPass.classList.remove("clique");
    }, 550);
  });
}

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

generatePass();
printPassOnScreen();
