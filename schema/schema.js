const graphql = require("graphql");

const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

var jurusanx = [
  { jurusan: "Teknik Komputer", kaprodi: "Yohanes Prima", id: "1" },
  { jurusan: "Teknik Informatika", kaprodi: "Mahmuy", id: "2" },
  { jurusan: "Teknik Informasi", kaprodi: "Ucuo Marucup", id: "3" }
];

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
      resolve(parent, args) {
        return _.find(jurusanx, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
