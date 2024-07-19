const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

// Route to get all collections
router.get('/collections', collectionController.getCollections);

// Route to get all records from a specific collection
router.get('/collections/:collectionName', collectionController.getRecords);

// Route to download a PDF for a specific record in a collection
router.get('/collections/:collectionName/pdf/:recordId', collectionController.downloadPDF);

module.exports = router;
