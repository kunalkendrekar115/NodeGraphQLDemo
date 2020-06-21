const { schemaComposer } = require("graphql-compose");

const CompanyTC = schemaComposer.createObjectTC({
  name: "Company",
  fields: {
    id: "Int!",
    name: "String",
  },
});

module.exports = CompanyTC;
