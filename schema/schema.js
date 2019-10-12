const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString } = graphql;

const JurusanType = new GraphQLObjectType({
  name: "jurusan",
  fields: () => ({
    id: { type: GraphQLString },
    jurusan: { type: GraphQLString },
    kaprodi: { type: GraphQLString }
  })
});
