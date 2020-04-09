var readline = require('readline');
console.log('running');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
rl.on('line', function (line) {
  console.log(JSON.parse(line));
});