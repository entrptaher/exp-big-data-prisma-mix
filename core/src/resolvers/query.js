module.exports = {
  site(_, { id }, context) {
    return context.prisma.site({ id });
  },
  sites(_, {}, context) {
    return context.prisma.sites({})
  },
}