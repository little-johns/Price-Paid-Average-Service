const rng = (tries) => {
  let randomNumbers = [];
  for (let i = 0; i < tries; i++) {
    randomNumbers.push(Math.floor(Math.random() * (5000000 - 1)) + 1)
  }

  return randomNumbers;
}

console.log(rng(20))