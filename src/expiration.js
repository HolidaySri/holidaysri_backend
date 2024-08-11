const { MongoClient } = require('mongodb');
const moment = require('moment'); // For date manipulation
const cron = require('node-cron'); // For scheduling

// MongoDB connection details
const MONGO_URI = process.env.MONGO_CONNECT_URL; // Replace with actual details
const DB_NAME = 'test'; // Replace with your database name
const COLLECTIONS_TO_CLEAN = ['events', 'hotels']; // Replace with your collection names

// Function to delete records older than one month
async function deleteOldRecords() {
  const client = new MongoClient(MONGO_URI);

  try {
    // Connect to the MongoDB server
    await client.connect();

    const db = client.db(DB_NAME);

    // Calculate the date exactly one month ago
    const oneMonthAgo = moment().subtract(1, 'months').startOf('day').toDate();

    // Iterate through the selected collections
    for (const collectionName of COLLECTIONS_TO_CLEAN) {
      console.log(`Deleting records older than one month in collection: ${collectionName}`);

      // Delete documents with `createdAt` timestamp older than one month
      const result = await db.collection(collectionName).deleteMany({
        createdAt: { $lt: oneMonthAgo } // Records older than one month
      });

      console.log(`Deleted ${result.deletedCount} documents from ${collectionName}`);
    }
  } catch (error) {
    console.error('Error during record deletion:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Schedule the script to run every day at 7:00 AM
cron.schedule('0 7 * * *', () => {
  console.log('Starting daily deletion of old records...');
  deleteOldRecords();
});

// Optionally, run the deletion immediately on script start
deleteOldRecords();

module.exports = { deleteOldRecords };
