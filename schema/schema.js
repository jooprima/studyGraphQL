const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const JurusanType = new GraphQLObjectType({
  name: "jurusan",
  fields: () => ({
    id: { type: GraphQLString },
    jurusan: { type: GraphQLString },
    kaprodi: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    prodi: {
      type: JurusanType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {}
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
