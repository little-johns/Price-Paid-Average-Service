function writeFiveMillionTimes(writer, encoding, callback) {
  let tickers = tickerMaker();
  const priceRange = () => {
    let stockPriceRange = [];
    let price = Math.random() * 1000;
    for (let i = 1; i < 64; i += 1) {
      let range = Math.floor(Math.random() * 100);
      range *= Math.floor(Math.random() * 2) === 1 ? 0.05 : -0.047;
      price *= (1 + range / 100);
      price = price.toFixed(2);
      stockPriceRange.push(`{${i}, ${price}}`);
    }
    return stockPriceRange;
  }
  let names = companyNames();
  function write(id) {
    let ok = true;
    let i = id
    while (ok && 0 < i) {
      let companyName = names[Math.floor(Math.random() * 100)];
      var entry = `${i}|${tickers[i - 1]}|${companyName}|{${priceRange()}}`
      ok = writer.write(entry + "\n", encoding);
      i--;
    }
    if (0 < i) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', ()=>{write(i)});
    }
  }
  var dataGenerator = function () {
    let records = 5000000;

    write(records);
  }
  dataGenerator();
}  
writeFiveMillionTimes(writeStream, 'utf8', () => console.log('complete'))