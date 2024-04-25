const mongoose = require('mongoose');

// Define the contact request schema
const contactRequestSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model for the sender
        required: true
    },
    recipientType: {
        type: String,
        enum: ['User', 'Agent','Admin'], // Possible values for recipient type
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status:{
        type:String,
        default: "request"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a model for the contact request schema
const ContactRequest = mongoose.model('ContactRequest', contactRequestSchema);

module.exports = ContactRequest;
