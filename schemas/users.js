const { schemaComposer } = require("graphql-compose");

const UserTC = schemaComposer.createObjectTC({
  name: "User",
  fields: {
    id: "Int!",
    firstName: "String",
    lastName: "String",
    email: "String",
  },
});

module.exports = UserTC;
