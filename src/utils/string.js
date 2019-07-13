export const paddingLeft = (str, length, letter = '0') => {
  if (str.length >= length) {
    return str;
  }
  return paddingLeft(letter + str, length, letter);
};

export const paddingRight = (str, length, letter = '0') => {
  if (str.length >= length) {
    return str;
  }
  return paddingRight(str + letter, length, letter);
};

export default {
  paddingLeft,
  paddingRight,
};
