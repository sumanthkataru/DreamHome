const express = require("express");
const router = express.Router();

// Import your models
const Contact = require('./contactSchema');
const ContactRequest = require('./contactRequestSchema');
const Payment = require('./paymentSchema'); 

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Retrieve a list of all contacts.
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contacts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 *                 count:
 *                   type: number
 *       500:
 *         description: Internal server error
 * 
 *   post:
 *     summary: Create a new contact
 *     description: Create a new contact with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       500:
 *         description: Internal Server Error
 */

router.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find();
        const count = contacts.length; 
        res.json({ contacts, count });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/contacts", async (req, res) => {
    try {
        const { name, email, subject, message} = req.body;
        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        const savedContact = await newContact.save();
        return res.status(201).json(savedContact);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

/**
 * @swagger
 * /contactRequest:
 *   post:
 *     summary: Send contact request
 *     description: Send a contact request with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender:
 *                 type: string
 *               recipientType:
 *                 type: string
 *               recipient:
 *                 type: string
 *               message:
 *                 type: string
 *             required:
 *               - sender
 *               - recipientType
 *               - recipient
 *               - message
 *     responses:
 *       201:
 *         description: Contact request sent successfully
 *       500:
 *         description: Internal Server Error
 */

router.post('/contactRequest', async (req, res) => {
    try {
        // Destructure the required fields from the request body
        const { sender, recipientType, recipient, message } = req.body;

        // Create a new contact request document
        const newContactRequest = new ContactRequest({
            sender,
            recipientType,
            recipient,
            message,
        });

        // Save the new contact request to the database
        const savedContactRequest = await newContactRequest.save();

        // Respond with a success message
        res.status(201).json(savedContactRequest);
    } catch (error) {
        console.error('Error sending message:', error);
        // If an error occurs during submission, respond with an error message
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /contactRequests:
 *   get:
 *     summary: Get all contact requests
 *     description: Retrieve a list of all contact requests.
 *     responses:
 *       200:
 *         description: A list of contact requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContactRequest'
 *       500:
 *         description: Internal server error
 */

router.get('/contactRequests',async(req,res)=>{
    const requests = await ContactRequest.find();
    return res.status(200).json(requests);
});

/**
 * @swagger
 * /contactRequest/{id}:
 *   put:
 *     summary: Update contact request status
 *     description: Update the status of a contact request.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the contact request to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Contact request status updated successfully
 *       404:
 *         description: Contact request not found
 *       500:
 *         description: Internal Server Error
 */

router.put('/contactRequest/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Find the contact request by ID
        const contactRequest = await ContactRequest.findById(id);

        if (!contactRequest) {
            return res.status(404).json({ message: 'Contact request not found' });
        }

        // Update the status
        contactRequest.status = status;
        await contactRequest.save();

        res.status(200).json({ message: 'Contact request status updated successfully' });
    } catch (error) {
        console.error('Error updating contact request status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * @swagger
 * /process-payment:
 *   post:
 *     summary: Process payment
 *     description: Process a payment with the provided payment details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cardNumber:
 *                 type: string
 *               expirationMonth:
 *                 type: string
 *               expirationYear:
 *                 type: string
 *               securityCode:
 *                 type: string
 *             required:
 *               - name
 *               - cardNumber
 *               - expirationMonth
 *               - expirationYear
 *               - securityCode
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Payment failed. Please try again later.
 */

router.post('/process-payment', async (req, res) => {
    const formData = req.body;

    // Perform validation - You should add more validation logic as per your requirements
    if (!formData.name || !formData.cardNumber || !formData.expirationMonth || !formData.expirationYear || !formData.securityCode) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create a new payment document using the Payment model
        const newPayment = new Payment(formData);

        // Save the payment data to the database
        await newPayment.save();

        // Send a success response
        res.status(200).json({ message: 'Payment processed successfully' });
    } catch (error) {
        console.error('Error processing payment:', error);
        // Send an error response
        res.status(500).json({ error: 'Payment failed. Please try again later.' });
    }
});

module.exports = router;
