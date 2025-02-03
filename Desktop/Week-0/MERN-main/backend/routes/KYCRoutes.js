// /backend/routes/kycRoutes.js
const express = require('express');
const multer = require('multer');
const kycController = require('../controllers/KYCcontroller');

const router = express.Router();

// Set up file upload configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Routes
router.post('/validateDL', upload.single('image'), kycController.validateDL);
router.post('/validateID', upload.single('image'), kycController.validateID);
router.post('/validateSelfie', upload.single('image'), kycController.validateSelfie);
router.post('/matchFace', upload.fields([{ name: 'selfie' }, { name: 'id' }]), kycController.matchFace);

module.exports = router;
