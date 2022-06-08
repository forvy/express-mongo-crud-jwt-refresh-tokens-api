const bcrypt = require("bcryptjs");
const db = require("./db");
const Role = require("./role");

module.exports = createTestData;

async function createTestData() {
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
  if ((await db.Booking.countDocuments({})) === 0 && await db.Income.countDocuments({}) === 0) {
    const booking = new db.Booking({
      booking_no: 1, 
      booking_date: "2022-06-05T02:40:10.085Z", 
      schedule_date: "2022-06-09T11:19:13.511Z", 
      booking_duration: 1, 
      room_no: 1, 
      total_price: 10000, 
      status: "Active",
      created_by: "user",
      updated_at: null,
      updated_by: null
    });
    await booking.save(async function (err) {
      if (err) return handleError(err);

      const income = new db.Income({
        source_id: booking._id, 
        amount: 10000, 
        created_by: "user"
      });
      await income.save(function (err) {
        if (err) return handleError(err);
      });
    });
  }
}
