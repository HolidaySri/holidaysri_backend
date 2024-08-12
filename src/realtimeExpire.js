const { MongoClient } = require('mongodb');
const moment = require('moment'); // For date manipulation
const cron = require('node-cron'); // For scheduling

// MongoDB connection details
const MONGO_URI = process.env.MONGO_CONNECT_URL; // Replace with actual details
const DB_NAME = 'test'; // Replace with your database name
const COLLECTION_NAME = 'realtimes'; // Replace with your collection name

// Function to delete expired records
async function deleteExpiredRecords() {
  const client = new MongoClient(MONGO_URI);

  try {
    // Connect to the MongoDB server
    await client.connect();
    const db = client.db(DB_NAME);

    // Current date and time
    const now = moment().toDate();

    // Delete records with a monthly subscription that are exactly one month old
    const oneMonthAgo = moment().subtract(1, 'months').startOf('day').toDate();
    const monthlyResult = await db.collection(COLLECTION_NAME).deleteMany({
      Subscription: 'Monthly',
      createdAt: { $lt: oneMonthAgo }
    });
    console.log(`Deleted ${monthlyResult.deletedCount} monthly records from ${COLLECTION_NAME}`);

    // Delete records with a daily subscription that are exactly 24 hours old
    const oneDayAgo = moment().subtract(24, 'hours').toDate();
    const dailyResult = await db.collection(COLLECTION_NAME).deleteMany({
      Subscription: 'Daily',
      createdAt: { $lt: oneDayAgo }
    });
    console.log(`Deleted ${dailyResult.deletedCount} daily records from ${COLLECTION_NAME}`);

  } catch (error) {
    console.error('Error during record deletion:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Schedule the script to run every day at 1:00 AM
cron.schedule('0 1 * * *', () => {
  console.log('Starting daily deletion of expired records...');
  deleteExpiredRecords();
});

// Optionally, run the deletion immediately on script start
deleteExpiredRecords();

module.exports = { deleteExpiredRecords };
