const fs = require('fs')

var tickerMaker = function () {
  const tickers = [];
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  for (let i = 0; i < alphabet.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      for (let k = 0; k < alphabet.length; k++) {
        for (let l = 0; l < alphabet.length; l++) {
          for (let n = 0; n < alphabet.length; n++) {
            tickers.push(alphabet[i] + alphabet[j] + alphabet[k] + alphabet[l] + alphabet[n])
            // yield alphabet[i] + alphabet[j] + alphabet[k] + alphabet[l] + alphabet[n];
          }
        }
      }
    }
  }
  return tickers;
}

const writeStream = fs.createWriteStream('data/data6.csv');

function writeFiveMillionTimes(writer, encoding, callback) {
  // let i = 500000;
  
  let tickers = tickerMaker();
  function write(id) {
    let ok = true;
    let i = id

    while (ok && 0 < i) {
        let entry = `${i}|${tickers[i]}`
        ok = writer.write(entry + "\n", encoding);
        i--
    }
    if (0 < i) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', ()=>{write(i)});
    }
    if (i === 0) {
      writer.end();
    }
  }
  var dataGenerator = function (num) {
    let records = num;

    write(records);
  }
  dataGenerator(5000000);
}  
writeFiveMillionTimes(writeStream, 'utf8', () => console.log('complete'))