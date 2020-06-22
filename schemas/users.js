const { schemaComposer } = require("graphql-compose")

const UserTC = schemaComposer.createObjectTC({
  name: "User",
  fields: {
    id: "Int!",
    name: "String",
    email: "String"
  }
})

module.exports = UserTC
