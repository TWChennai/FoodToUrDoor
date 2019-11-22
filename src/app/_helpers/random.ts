export function getRandomInt() {
    const min = Math.ceil(1);
    const max = Math.floor(2);
    return Math.floor(Math.random() * (max - min)) + min;
  }
