const { prisma } = require('../../prisma/generated/prisma-client');
const debug = require('debug')('core');
const { content } = require('@entrptaher/content');

// try to parse to json if it comes from playground
const parseIfString = (data) => {
  return typeof data === 'string' ? JSON.parse(data) : data;
};

const mutation = {
  async createSite(_, req, context) {
    // create a site and add content to a different store by the id
    return prisma.createSite({
      ...req.data,
      data: {},//parseIfString(req.data && req.data.data),
    });
  },
  async updateSite(_, req, context) {
    debug('init');

    const site = await prisma.site(req.where);
    debug('old data');
    if (!site) throw new Error('no data found');

    // update the content itself if provided
    const oldContent = await content.query(req.where.id);
    // console.log({ site, oldContent });
    // mimic merging data
    // chance of high cpu usage
    const newData = Object.assign(
      {},
      oldContent && oldContent.Data,
      parseIfString(req.data && req.data.data)
    );
    debug('merge');
    const saved = await content.upsert(req.where.id, {Data: newData});
    // console.log(saved.Data);
    debug('upsert');

    // update everything else
    const result = await prisma.updateSite({
      where: req.where,
      data: { ...req.data, data: {}},
    });
    debug('result');

    return {...result, data: saved.Data};
  },
};

module.exports = mutation;
