const graphql = require("graphql");

const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

var jurusanx = [
  { jurusan: "Teknik Komputer", kaprodi: "Yohanes Prima", id: "1" },
  { jurusan: "Teknik Informatika", kaprodi: "Mahmuy", id: "2" },
  { jurusan: "Teknik Informasi", kaprodi: "Ucuo Marucup", id: "3" }
];

var data_mahasiswa = [
  { nama: "agung", umur: 30, id: "1", jurusanid: "2" },
  { nama: "fikri", umur: 20, id: "2", jurusanid: "3" },
  { nama: "wawan", umur: 20, id: "3", jurusanid: "2" },
  { nama: "aceng", umur: 23, id: "4", jurusanid: "1" },
  { nama: "mawar", umur: 20, id: "5", jurusanid: "2" },
  { nama: "cemen", umur: 39, id: "6", jurusanid: "1" }
];

const JurusanType = new GraphQLObjectType({
  name: "jurusan",
  fields: () => ({
    id: { type: GraphQLID },
    jurusan: { type: GraphQLString },
    kaprodi: { type: GraphQLString },
    mahasiswa: {
      type: new GraphQLList(MahasiswaType),
      resolve(parent, args) {
        return _.filter(data_mahasiswa, { jurusanid: parent.id });
      }
    }
  })
});

const MahasiswaType = new GraphQLObjectType({
  name: "mahasiswa",
  fields: () => ({
    id: { type: GraphQLID },
    nama: { type: GraphQLString },
    umur: { type: GraphQLInt },
    prodi: {
      type: JurusanType,
      resolve(parent, args) {
        console.log(parent);

        return _.find(jurusanx, { id: parent.jurusanid });
      }
    }
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
