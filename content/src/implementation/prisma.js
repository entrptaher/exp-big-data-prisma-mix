const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const debug = require('debug')('content');

// create data if doesn't exist already
// useful if we know the id for the data
const upsert = async (id, data = {}) => {
  const dataWithId = { id, ...data };
  const existing = await prisma.content.upsert({
    where: { id },
    create: dataWithId,
    update: dataWithId,
  });
  debug('upsert');
  return existing;
};

const query = async (id) => {
  const result = prisma.content.findOne({ where: { id } });
  debug('query');
  return result;
};

module.exports = { upsert, query };
