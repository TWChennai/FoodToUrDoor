export function getRandomInt() {
    const min = Math.ceil(5000);
    const max = Math.floor(10000);
    return Math.floor(Math.random() * (max - min)) + min;
  }
