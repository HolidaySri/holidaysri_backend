const { MongoClient } = require('mongodb');
const cron = require('node-cron');

// MongoDB connection details
const MONGO_URI = process.env.MONGO_CONNECT_URL; // Replace with actual details
const SOURCE_DB = 'test';
const TARGET_DB = 'backup';
const BACKUP_TRACKER_COLLECTION = 'backupTracker';

// Function to perform the backup
async function performBackup() {
  const client = new MongoClient(MONGO_URI);

  try {
    // Connect to the MongoDB server
    await client.connect();

    const sourceDb = client.db(SOURCE_DB);
    const targetDb = client.db(TARGET_DB);
    const backupTracker = targetDb.collection(BACKUP_TRACKER_COLLECTION);

    // Get the last backup time
    const lastBackup = await backupTracker.findOne({ type: 'lastBackup' });
    const lastBackupTime = lastBackup ? lastBackup.timestamp : new Date(0);

    // Get list of collections in the source database
    const collections = await sourceDb.listCollections().toArray();

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      console.log(`Checking for new records in collection: ${collectionName}`);

      // Find new or updated documents since the last backup time
      const newDocuments = await sourceDb.collection(collectionName).find({
        $or: [
          { createdAt: { $gt: lastBackupTime } },
          { updatedAt: { $gt: lastBackupTime } }
        ]
      }).toArray();

      if (newDocuments.length > 0) {
        console.log(`Backing up ${newDocuments.length} new documents from ${collectionName}`);

        const bulkOps = newDocuments.map(doc => ({
          updateOne: {
            filter: { _id: doc._id },  // Match by document ID
            update: { $set: doc },     // Use $set to update the document
            upsert: true               // Insert if it does not exist
          }
        }));

        try {
          await targetDb.collection(collectionName).bulkWrite(bulkOps);
        } catch (error) {
          console.error('Error during bulk write operation:', error);
        }
      } else {
        console.log(`No new documents found in ${collectionName}`);
      }
    }

    // Update the last backup time
    await backupTracker.updateOne(
      { type: 'lastBackup' },
      { $set: { timestamp: new Date() } },
      { upsert: true }
    );

    console.log('Backup completed successfully.');
  } catch (error) {
    console.error('Error during backup:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Schedule the script to run every day at 6:00 AM
cron.schedule('0 6 * * *', () => {
  console.log('Starting daily backup...');
  performBackup();
});

// Optionally, run the backup immediately on script start
performBackup();

// Export the performBackup function
module.exports = { performBackup };
