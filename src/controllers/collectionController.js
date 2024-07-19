const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');
const stream = require('stream');

// Fetch all collection names from the database
exports.getCollections = async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.status(200).json({ collections: collections.map(col => col.name) });
  } catch (error) {
    res.status(500).json({ status: "Error fetching collections", error: error.message });
  }
};

// Fetch all records from a specific collection
exports.getRecords = async (req, res) => {
  const { collectionName } = req.params;
  try {
    const collection = mongoose.connection.db.collection(collectionName);
    const records = await collection.find({}).toArray();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ status: "Error fetching records", error: error.message });
  }
};

// Generate and download a PDF for a specific record in a collection
exports.downloadPDF = async (req, res) => {
  const { collectionName, recordId } = req.params;
  try {
    const collection = mongoose.connection.db.collection(collectionName);
    const record = await collection.findOne({ _id: new mongoose.Types.ObjectId(recordId) });

    if (!record) {
      return res.status(404).json({ status: "Record not found" });
    }

    const doc = new PDFDocument();
    const pdfStream = new stream.PassThrough();
    
    doc.pipe(pdfStream);
    doc.pipe(res);

    doc.fontSize(12).text(`Record ID: ${record._id}`, { align: 'left' });
    for (const [key, value] of Object.entries(record)) {
      doc.text(`${key}: ${value}`, { align: 'left' });
    }
    doc.end();
  } catch (error) {
    res.status(500).json({ status: "Error generating PDF", error: error.message });
  }
};
