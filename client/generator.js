// a copy from https://stackoverflow.com/a/1349426/6161265
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// 1 => ~100kb data, 2 => ~200kb data
module.exports = (groups=1, groupData = 100) => {
  const rawData = {};
  for(let i = 0; i< 1; i++){
    rawData[`page${i}`]={}
    for(let j = 0; j< groups; j++){
      rawData[`page${i}`][`group${j}`]=[]
      for(let k = 0; k < groupData; k++){
        rawData[`page${i}`][`group${j}`].push({"x": makeid(1000)})
      }
    }
  }
  // 100 kb = 100000 bytes
  // 250 kb = 250000 bytes
  // 500 kb = 500000 bytes
  // console.log(Buffer.from(JSON.stringify(rawData)).length)
  // by default above combination creates 100kb data
  return rawData;
}