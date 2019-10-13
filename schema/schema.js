const graphql = require("graphql");

const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

var jurusanx = [
  { jurusan: "Teknik Komputer", kaprodi: "Yohanes Prima", id: "1" },
  { jurusan: "Teknik Informatika", kaprodi: "Mahmuy", id: "2" },
  { jurusan: "Teknik Informasi", kaprodi: "Ucuo Marucup", id: "3" }
];

const JurusanType = new GraphQLObjectType({
  name: "jurusan",
  fields: () => ({
    id: { type: GraphQLID },
    jurusan: { type: GraphQLString },
    kaprodi: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    prodi: {
      type: JurusanType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(typeof(args.id));
        return _.find(jurusanx, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
