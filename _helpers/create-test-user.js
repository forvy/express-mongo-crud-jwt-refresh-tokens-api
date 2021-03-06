const bcrypt = require("bcryptjs");
const db = require("./db");
const Role = require("./role");

module.exports = createTestUser;

async function createTestUser() {
  // create test user if the db is empty
  if ((await db.User.countDocuments({})) === 0) {
    const admin = new db.User({
      firstName: "Admin",
      lastName: "User",
      username: "admin",
      passwordHash: bcrypt.hashSync("admin", 10),
      role: Role.Admin,
    });
    const user = new db.User({
        firstName: 'Normal',
        lastName: 'User',
        username: 'user',
        passwordHash: bcrypt.hashSync('user', 10),
        role: Role.User
    });
    await admin.save();
    await user.save();
  }
}
