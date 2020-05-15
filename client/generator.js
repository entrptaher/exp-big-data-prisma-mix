// 1 => ~100kb data, 2 => ~200kb data
module.exports = (limit = 1) => {
  const rawData = {};
  for(let i = 0; i< 1; i++){
    rawData[`page${i}`]={}
    for(let j = 0; j< limit; j++){
      rawData[`page${i}`][`group${j}`]=[]
      for(let k = 0; k< 100; k++){
        rawData[`page${i}`][`group${j}`].push({"x": "x".repeat(1000)})
      }
    }
  }
  // 100 kb = 100000 bytes
  // 250 kb = 250000 bytes
  // 500 kb = 500000 bytes
  console.log(Buffer.from(JSON.stringify(rawData)).length)
  // by default above combination creates 100kb data
  return rawData;
}