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
    const result = await UserModel.updateMany(
      { account_no: { $exists: false } },
      { $set: { account_no: [] } }
    );

    console.log(`Migration complete. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
})();