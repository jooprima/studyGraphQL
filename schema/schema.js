const graphql = require("graphql");

const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} = graphql;

var jurusanx = [
  { jurusan: "Teknik Komputer", kaprodi: "Yohanes Prima", id: "1" },
  { jurusan: "Teknik Informatika", kaprodi: "Mahmuy", id: "2" },
  { jurusan: "Teknik Informasi", kaprodi: "Ucuo Marucup", id: "3" }
];

var data_mahasiswa = [
  { nama: "agung", umur: 30, id: "1" },
  { nama: "mawar", umur: 20, id: "2" },
  { nama: "cemen", umur: 39, id: "3" }
];

const JurusanType = new GraphQLObjectType({
  name: "jurusan",
  fields: () => ({
    id: { type: GraphQLID },
    jurusan: { type: GraphQLString },
    kaprodi: { type: GraphQLString }
  })
});

const MahasiswaType = new GraphQLObjectType({
  name: "mahasiswa",
  fields: () => ({
    id: { type: GraphQLID },
    nama: { type: GraphQLString },
    umur: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    prodi: {
      type: JurusanType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(typeof args.id);
        return _.find(jurusanx, { id: args.id });
      }
    },
    mahasiswa: {
      type: MahasiswaType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(data_mahasiswa, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
