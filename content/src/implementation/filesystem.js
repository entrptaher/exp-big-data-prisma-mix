const debug = require('debug')('content');
const fs = require('fs-extra');

// create data if doesn't exist already
// useful if we know the id for the data
const upsert = async (id, data = {}) => {
  const dataWithId = { id, ...data };
  await fs.ensureDirSync(`data`);
  await fs.writeFileSync(`data/${id}.json`, JSON.stringify(dataWithId));
  debug('upsert');
  return dataWithId;
};

const query = async (id) => {
  // await fs.ensureDirSync(__dirname + `/data`);
  try {
    const rawData = await fs.ensureFileSync(`data/${id}.json`, 'utf-8');
    debug('query');
    return JSON.parse(rawData);
  } catch {
    return {};
  }
};

module.exports = { upsert, query };
