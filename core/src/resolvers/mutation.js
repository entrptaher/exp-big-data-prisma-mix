const { prisma } = require('../../prisma/generated/prisma-client');

// try to parse to json if it comes from playground
const parseIfString = (data) => {
  return typeof data === 'string' ? JSON.parse(data) : data;
};

const mutation = {
  async createSite(_, req, context) {
    return prisma.createSite({
      ...req.data,
      data: parseIfString(req.data && req.data.data),
    });
  },
  async updateSite(_, req, context) {
    const oldData = await prisma.site(req.where);
    // mimic merging data
    // chance of high cpu usage
    const newData = Object.assign(
      {},
      oldData.data,
      parseIfString(req.data && req.data.data)
    );
    return prisma.updateSite({
      where: req.where,
      data: { ...req.data, data: newData },
    });
  },
};

module.exports = mutation;
