
const between = (min, max) =>
  // max is not included
  min + Math.floor(Math.random() * (max - min));

const choose = (arr) => {
  const index = between(0, arr.length);
  return arr[index];
};

export default {
  choose,
  between,
};
