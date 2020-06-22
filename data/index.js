const fs = require("fs")
const path = require("path")

const getUsers = () =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "users.json"), "utf-8"))

const getCompanies = () =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "companies.json"), "utf-8"))

const updateUserCompany = async ({ userName, companyName }) => {
  const Users = await getUsers()
  const companies = await getCompanies()

  const CompanyId = companies.find(({ name }) => name === companyName).id

  const userIndex = Users.findIndex(({ name }) => name === userName)
  Users[userIndex]["companyId"] = CompanyId

  await fs.writeFileSync(
    path.join(__dirname, "users.json"),
    JSON.stringify(Users),
    "utf-8"
  )
  return Users[userIndex]
}
const addUser = async (user) => {
  const Users = await getUsers()
  user["id"] = Users.length + 1
  Users.push(user)
  await fs.writeFileSync(
    path.join(__dirname, "users.json"),
    JSON.stringify(Users),
    "utf-8"
  )
  return user.id
}

const addCompany = (company) => {
  const companies = getCompanies()
  company["id"] = companies.length + 1
  companies.push(company)
  fs.writeFileSync(
    path.join(__dirname, "companies.json"),
    JSON.stringify(companies),
    "utf-8"
  )
  return company.id
}

module.exports = {
  getUsers,
  getCompanies,
  addCompany,
  addUser,
  updateUserCompany
}
