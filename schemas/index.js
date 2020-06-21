const { schemaComposer } = require("graphql-compose");

const UserTC = require("./users");
const CompanyTC = require("./companies");

const { getUsers, getCompanies, addUser, addCompany } = require("../data");

UserTC.addFields({
  company: {
    type: CompanyTC,
    resolve: ({ companyId }) =>
      getCompanies().find(({ id }) => id === companyId),
  },
});

CompanyTC.addFields({
  users: {
    type: UserTC,
    resolve: ({ id }) => getUsers().find(({ companyId }) => id === companyId),
  },
});

schemaComposer.Query.addFields({
  Users: {
    type: [UserTC],
    resolve: () => getUsers(),
  },

  User: {
    type: UserTC,
    args: { id: "Int" },
    resolve: (_, { id }) => getUsers().find(({ id: userId }) => id === userId),
  },
  Companies: {
    type: [CompanyTC],
    resolve: () => getCompanies(),
  },
});

schemaComposer.Mutation.addFields({
  addUser: {
    type: "Int",
    args: {
      id: "Int",
      firstName: "String",
      lastName: "String",
      email: "String",
    },
    resolve: (_, user) => {
      return addUser(user);
    },
  },
});

module.exports = schemaComposer.buildSchema();
