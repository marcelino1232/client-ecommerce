export const convertIntToArray = (num) => {
  let array = [];
  for (let i = 0; i < num; i++) {
    array.push(i + 1);
  }
  return array;
};
