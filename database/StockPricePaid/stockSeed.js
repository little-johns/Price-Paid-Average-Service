/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
const db = require('../index.js');
const Stock = require('./StockScheme.js');
// const companyData = require('../stockList.js');
const companyNames = require('../stockList.js').companyNames;
const fs = require('fs')

const sampleStock = [];
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

// //stopped at 200000, testing bigger number
// var dataGenerator = function () {
//   let names = companyNames();
//   let price = Math.random() * 1000;
//   let tickers = tickerMaker();
//   for (let i = 1; i < 5000000; i++) {
//     const ticker = tickers.next().value
//     const companyName = names[Math.floor(Math.random() * 100)];
//     //change 252 weeks to 63
//     for (let day = 0; day < 63; day += 1) {
//       let range = Math.floor(Math.random() * 100);
//       range *= Math.floor(Math.random() * 2) === 1 ? 0.05 : -0.047;
//       price *= (1 + range / 100);
//       price = price.toFixed(2);
//       // sampleStock.push({
//       //   company: companyName,
//       //   price: Number(price),
//       //   day,
//       //   id: i,
//       //   ticker: ticker,
//       // });
//       var newEntry = {
//         company: companyName,
//         price: Number(price),
//         day,
//         id: null,
//         ticker: ticker,
//       }
//       // return newEntry
//       // console.log(JSON.stringify(newEntry));
//       // console.log(JSON.stringify({
//       //   company: companyName,
//       //   price: Number(price),
//       //   day,
//       //   id: i,
//       //   ticker: ticker,
//       // }))
//     }
//   }
//   // console.log(JSON.stringify(sampleStock));
// }
// // dataGenerator()

const writeStream = fs.createWriteStream('data/data3.csv');

function writeFiveMillionTimes(writer, encoding, callback) {
  // let i = 500000;
  
  let tickers = tickerMaker();
  function write(currentPrice, currentDay, currentName, id) {
    let price = currentPrice || Math.random() * 1000;
    let names = companyNames();
    let companyName = currentName || names[Math.floor(Math.random() * 100)];
    let ok = true;
    let i = id
    let day = currentDay;
    while (ok && 0 < i) {
      do {
        let range = Math.floor(Math.random() * 100);
        range *= Math.floor(Math.random() * 2) === 1 ? 0.05 : -0.047;
        price *= (1 + range / 100);
        price = price.toFixed(2);
        var entry = `${i}|${tickers[i - 1]}|${day}|${Number(price)}`
        // var newEntry = {
        //   company: companyName,
        //   price: Number(price),
        //   day,
        //   id: i,
        //   ticker: tickers[i - 1],
        // }
        ok = writer.write(entry + "\n", encoding);
        day += 1
      } while (ok && day < 64);
      if (day === 64) {
        price = Math.random() * 1000;
        companyName = names[Math.floor(Math.random() * 100)];
        i -= 1;
        day = 1;
      }
    }
    if (day < 64) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', ()=>{write(price, day, companyName, i)});
    }
    if (i === 0) {
      writer.end();
    }
  }
  var dataGenerator = function (num) {
    let day = 1;
    let records = num;

    write(null, day, null, records);
  }
  dataGenerator(5000000);
}  
writeFiveMillionTimes(writeStream, 'utf8', () => console.log('complete'))

  // for (const company of companyData) {
  //   const companyName = company.company;
  //   let price = Math.random() * 1000;
  //   for (let day = 0; day < 252; day += 1) {
  //     let range = Math.floor(Math.random() * 100);
  //     range *= Math.floor(Math.random() * 2) === 1 ? 0.05 : -0.047;
  //     price *= (1 + range / 100);
  //     price = price.toFixed(2);
  //     sampleStock.push({
  //       company: companyName,
  //       price: Number(price),
  //       day,
  //       id: company.id,
  //       ticker: company.ticker,
  //     });
  //   }
  // }

  const insertSampleStocks = function () {
    Stock.create(sampleStock)
      .then(() => db.close());
  };

//insertSampleStocks();
