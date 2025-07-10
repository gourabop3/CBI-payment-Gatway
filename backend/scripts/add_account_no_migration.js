// Migration script: ensure every user document has an `account_no` array field.
// Usage: `node backend/scripts/add_account_no_migration.js`
// It will connect using the same ENV vars as the main backend.

require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const { ConnectDB } = require('../src/config/db.config');
const { UserModel } = require('../src/models/User.model');

(async () => {
  try {
    await ConnectDB();
    const { AccountModel } = require('../src/models/Account.model');

    const users = await UserModel.find();
    let updated = 0;

    for (const u of users) {
      // Pull all accounts that belong to the user
      const accs = await AccountModel.find({ user: u._id }).select('_id');
      const accIds = accs.map(a => a._id);

      // If user doesn\'t have account_no or it is out-of-date, update it
      const needsUpdate = !u.account_no || u.account_no.length !== accIds.length ||
        accIds.some(id => !u.account_no.includes(id));

      if (needsUpdate) {
        u.account_no = accIds;
        await u.save();
        updated += 1;
      }
    }

    console.log(`Migration complete. Users processed: ${users.length}, Users updated: ${updated}`);
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
})();