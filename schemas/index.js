const { schemaComposer } = require("graphql-compose")

const UserTC = require("./users")
const CompanyTC = require("./companies")

const {
  getUsers,
  getCompanies,
  addUser,
  addCompany,
  updateUserCompany
} = require("../data")

UserTC.addFields({
  company: {
    type: CompanyTC,
    resolve: ({ companyId }) =>
      getCompanies().find(({ id }) => id === companyId)
  }
})

CompanyTC.addFields({
  users: {
    type: UserTC,
    resolve: ({ id }) => getUsers().find(({ companyId }) => id === companyId)
  }
})

schemaComposer.Query.addFields({
  Users: {
    type: [UserTC],
    resolve: () => getUsers()
  },

  User: {
    type: UserTC,
    args: { id: "Int" },
    resolve: (_, { id }) => getUsers().find(({ id: userId }) => id === userId)
  },

  Company: {
    type: CompanyTC,
    args: { id: "Int!" },
    resolve: (_, { id }) =>
      getCompanies().find(({ id: companyId }) => companyId === id)
  },

  Companies: {
    type: [CompanyTC],
    resolve: () => getCompanies()
  }
})

schemaComposer.Mutation.addFields({
  addUser: {
    type: "Int",
    args: {
      name: "String",
      email: "String",
      companyId: "Int"
    },
    resolve: (_, user) => {
      return addUser(user)
    }
  },

  addCompany: {
    type: "Int",
    args: {
      name: "String"
    },
    resolve: (_, company) => addCompany(company)
  },

  updateUserCompany: {
    type: "User",
    args: { userName: "String", companyName: "String" },
    resolve: (_, args) => updateUserCompany(args)
  }
})

module.exports = schemaComposer.buildSchema()
