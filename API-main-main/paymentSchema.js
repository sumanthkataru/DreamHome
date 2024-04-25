// paymentSchema.js

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    name: String,
    cardNumber: String,
    expirationMonth: String,
    expirationYear: String,
    securityCode: String
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
