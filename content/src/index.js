const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const debug = require('debug')('app');

(async () => {
  // debug('init');
  // await prisma.connect();
  // debug('connect');

  // create data if doesn't exist already
  // useful if we know the id for the data
  const id = "test";
  const data = { id, Data: { bar: 'foo', time: Date.now() } };
  const existing = await prisma.content.upsert({
    where: { id },
    create: data,
    update: data,
  });
  console.log(existing);

  // const res = await prisma.content.create({ data: { id: "test", Data: { bar: 'foo' } } });
  // debug('create');
  // console.log(res);
  // await prisma.post.update({ where: { id: res.id }, data: { Data: {foo: 'baz'} } });
  // debug('update');

  await prisma.disconnect();
  process.exit();
})();
