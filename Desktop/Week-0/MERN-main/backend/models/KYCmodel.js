// /backend/models/KYC.js
const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
    driverName: { type: String, required: true },
    phoneNo: { type: String, required: true },
    age: { type: Number, required: true },
    driverLicense: { type: String },
    idCard: { type: String },
    selfie: { type: String },
    selectedDocument: { type: String, required: true },
    step: { type: Number, default: 1 },
    status: { type: String, default: 'Pending' },
    actionStatus: { type: String, enum: ['pass', 'fail'], default: 'fail' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('KYC', kycSchema);
