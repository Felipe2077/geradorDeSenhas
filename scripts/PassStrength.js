const passStrengthData = {
  passWordWeak: {
    class: "weak",
    level: 8,
    passWordText: "Essa é uma senha fraca",
  },
  passWordAverage: {
    class: "average",
    level: 10,
    passWordText: "Ainda falta um pouco.",
  },
  passWordStrong: {
    class: "strong",
    level: 12,
    passWordText: "Ótimo! Essa senha é forte",
  },
  passWordFull: {
    class: "strong",
    level: 15,
    passWordText: "Você atingiu o nível máximo de segurança da senha!",
  },
};

export function passStrengthBar(sliderValue) {
  const passColorBar = document.querySelector("#passColorBar");

  if (sliderValue <= 8) {
    passColorBar.classList.add(passStrengthData.passWordWeak.class);
    passColorBar.classList.remove(passStrengthData.passWordAverage.class);
    passColorBar.classList.remove(passStrengthData.passWordStrong.class);
    passColorBar.textContent = passStrengthData.passWordWeak.passWordText;
  } else if (sliderValue > 8 && sliderValue <= 10) {
    passColorBar.classList.remove(passStrengthData.passWordWeak.class);
    passColorBar.classList.add(passStrengthData.passWordAverage.class);
    passColorBar.classList.remove(passStrengthData.passWordStrong.class);
    passColorBar.textContent = passStrengthData.passWordAverage.passWordText;
  } else if (sliderValue > 11 && sliderValue <= 15) {
    passColorBar.classList.remove(passStrengthData.passWordWeak.class);
    passColorBar.classList.remove(passStrengthData.passWordAverage.class);
    passColorBar.classList.add(passStrengthData.passWordStrong.class);
    passColorBar.textContent = passStrengthData.passWordStrong.passWordText;
  } else if (sliderValue >= 16) {
    passColorBar.classList.remove(passStrengthData.passWordWeak.class);
    passColorBar.classList.remove(passStrengthData.passWordAverage.class);
    passColorBar.classList.add(passStrengthData.passWordStrong.class);
    passColorBar.textContent = passStrengthData.passWordFull.passWordText;
  }
}

//** Ideia para passar valores dinamicamente: pesquisar no objeto */
