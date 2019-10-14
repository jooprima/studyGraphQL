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

const Jurusan = require("../models/jurusan");
const Mahasiswa = require("../models/mahasiswa");

const JurusanType = new GraphQLObjectType({
  name: "jurusan",
  fields: () => ({
    id: { type: GraphQLID },
    jurusan: { type: GraphQLString },
    kaprodi: { type: GraphQLString },
    mahasiswa: {
      type: new GraphQLList(MahasiswaType),
      resolve(parent, args) {
        // return _.filter(data_mahasiswa, { jurusanid: parent.id });
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

        // return _.find(jurusanx, { id: parent.jurusanid });
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
        // return _.find(jurusanx, { id: args.id });
      }
    },
    mahasiswa: {
      type: MahasiswaType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(data_mahasiswa, { id: args.id });
      }
    },
    read_mahasiswa: {
      type: new GraphQLList(MahasiswaType),
      resolve(parent, args) {
        // return data_mahasiswa;
      }
    },
    read_jurusan: {
      type: new GraphQLList(JurusanType),
      resolve(parent, args) {
        return jurusanx;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addJurusan: {
      type: JurusanType,
      args: {
        jurusan: { type: GraphQLString },
        kaprodi: { type: GraphQLString }
      },
      resolve(parent, args) {
        let jurusan = new Jurusan({
          jurusan: args.jurusan,
          kaprodi: args.kaprodi
        });
        return jurusan.save();
      }
    },
    addMahasiswa: {
      type: MahasiswaType,
      args: {
        nama: { type: GraphQLString },
        umur: { type: GraphQLInt },
        jurusanid: { type: GraphQLID }
      },
      resolve(parent, args) {
        let mahasiswa = new Mahasiswa({
          nama: args.nama,
          umur: args.umur,
          jurusanid: args.jurusanid
        });
        return mahasiswa.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
