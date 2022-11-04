import * as passArray from "./passData.js";

export function getPass() {
  let pass = passArray.getLetters();
  const upperCase = document.querySelector("#upperCase").checked;
  const numbers = document.querySelector("#numbers").checked;
  const char = document.querySelector("#char").checked;

  const onlyUpperCase = upperCase && !numbers && !char;
  const onlyNumbers = numbers && !upperCase && !char;
  const onlyChar = char && !upperCase && !numbers;
  const upperCaseAndNumbers = upperCase && numbers && !char;
  const upperCaseAndChar = upperCase && char && !numbers;
  const charAndNumber = char && numbers && !upperCase;
  const all = char && numbers && upperCase;

  if (onlyUpperCase) {
    pass = [...pass, ...passArray.getUpperCase()];
  }
  if (onlyNumbers) {
    pass = [...pass, ...passArray.getNumbers()];
  }
  if (onlyChar) {
    pass = [...pass, ...passArray.getChar()];
  }
  if (upperCaseAndNumbers) {
    pass = [...pass, ...passArray.getUpperCase(), ...passArray.getNumbers()];
  }
  if (upperCaseAndChar) {
    pass = [...pass, ...passArray.getUpperCase(), ...passArray.getChar()];
  }
  if (charAndNumber) {
    pass = [...pass, ...passArray.getChar(), ...passArray.getNumbers()];
  }
  if (all) {
    pass = [
      ...pass,
      ...passArray.getChar(),
      ...passArray.getNumbers(),
      ...passArray.getUpperCase(),
    ];
  }

  return pass;
}
