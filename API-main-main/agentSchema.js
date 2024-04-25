const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    profession: { type: String, enum: ['Architect', 'Contractor', 'Interior Designer'], required: true },
    experience: { type: Number },
    education: { type: String },
    certifications: { type: String },
    projectsCompleted: { type: String },
    skills: { type: String },
    specializations: { type: String },
    contactAddress: { type: String },
    location: { type: String },
    languages: { type: String },
    linkedinUrl: { type: String },
    twitterUrl: { type: String },
    is_verified: {
        type: Boolean,
        default: false,
    },      
});

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
