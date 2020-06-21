const fs = require("fs");
const path = require("path");

const getUsers = async () => {
  const str = await fs.readFileSync(
    path.join(__dirname, "users.json"),
    "utf-8"
  );
  return JSON.parse(str);
};
const getCompanies = () =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "companies.json"), "utf-8"));

const addUser = async (user) => {
  const Users = await getUsers();
  Users.push(user);
  await fs.writeFileSync(
    path.join(__dirname, "users.json"),
    JSON.stringify(Users),
    "utf-8"
  );
  return user.id;
};

const addCompany = (company) => {
  const companies = getCompanies();
  companies.push(company);
  fs.writeFileSync(
    path.join(__dirname, "companies.json"),
    JSON.stringify(companies),
    "utf-8"
  );
  return company.id;
};

module.exports = {
  getUsers,
  getCompanies,
  addCompany,
  addUser,
};
