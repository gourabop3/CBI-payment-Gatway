// Quick integration test that spins up an in-memory MongoDB instance (mongodb-memory-server),
// seeds two users + accounts, then checks the money-transfer and mobile-recharge
// endpoints.  Run with:  `node backend/scripts/test_transfer_recharge.js`

const { MongoMemoryServer } = require('mongodb-memory-server');
const supertest = require('supertest');
const JWTService = require('../src/utils/JwtService');
const { generateAccountNumber } = require('../src/utils/accountNumberUtils');
const { ConnectDB } = require('../src/config/db.config');

const { UserModel } = require('../src/models/User.model');
const { AccountModel } = require('../src/models/Account.model');
const app = require('../src/app');

(async () => {
  const mongod = await MongoMemoryServer.create();
  try {
    process.env.MONGO_URI = mongod.getUri();
    await ConnectDB();

    // ─────────────────────────────────────────
    // Seed test data
    // ─────────────────────────────────────────
    const alice = await UserModel.create({
      name: 'Alice',
      email: 'alice@test.com',
      password: 'secret',
      ac_type: 'saving',
      account_no: []
    });

    const bob = await UserModel.create({
      name: 'Bob',
      email: 'bob@test.com',
      password: 'secret',
      ac_type: 'saving',
      account_no: []
    });

    const aliceAcc = await AccountModel.create({ user: alice._id, amount: 100000, ac_type: 'saving' });
    const bobAcc   = await AccountModel.create({ user: bob._id,   amount: 50000,  ac_type: 'saving' });

    alice.account_no.push(aliceAcc._id);
    bob.account_no.push(bobAcc._id);
    await alice.save();
    await bob.save();

    const bobAccNumber = generateAccountNumber(bob._id.toString(), bobAcc._id.toString(), 'saving');
    const aliceToken   = JWTService.generateToken(alice._id.toString());

    const request = supertest(app);

    // ─── 1) Verify account ──────────────────
    const verifyRes = await request
      .post('/api/v1/transfer/verify-account')
      .set('Authorization', `Bearer ${aliceToken}`)
      .send({ accountNumber: bobAccNumber });

    console.log('Verify Account →', verifyRes.status, verifyRes.body);
    if (verifyRes.status !== 200) throw new Error('Verify account failed');

    // ─── 2) Initiate transfer ───────────────
    const transferRes = await request
      .post('/api/v1/transfer/initiate')
      .set('Authorization', `Bearer ${aliceToken}`)
      .send({
        recipientAccountNumber: bobAccNumber,
        recipientAccountId: bobAcc._id.toString(),
        amount: 1000,
        remark: 'integration-test',
        transferType: 'NEFT'
      });

    console.log('Initiate Transfer →', transferRes.status, transferRes.body);
    if (transferRes.status !== 200) throw new Error('Transfer failed');

    // ─── 3) Mobile recharge ─────────────────
    const rechargeRes = await request
      .post('/api/v1/recharge/mobile')
      .set('Authorization', `Bearer ${aliceToken}`)
      .send({
        mobileNumber: '9123456789',
        operator: 'jio',
        amount: 199,
        rechargeType: 'prepaid'
      });

    console.log('Mobile Recharge →', rechargeRes.status, rechargeRes.body);
    if (rechargeRes.status !== 200) throw new Error('Recharge failed');

    console.log('\nAll tests passed ✔️');
    process.exit(0);
  } catch (err) {
    console.error('\nTest run failed ❌', err);
    process.exit(1);
  } finally {
    await mongod.stop();
  }
})();