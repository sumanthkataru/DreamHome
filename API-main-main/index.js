const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const cors = require('cors');
const multer = require('multer');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

mongoose.connect('mongodb://localhost:27017/api');

const logsFolder = path.join(__dirname, 'logs');
if (!fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder);
}
const accessLogStream = fs.createWriteStream(path.join(logsFolder, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Import your models
const User = require('./userSchema');
const Agent = require('./agentSchema');
const Contact = require('./contactSchema');
const House = require('./houseSchema');
const Land = require('./landSchema');
const WishlistHouse = require('./wishlistHouseSchema');
const ContactRequest = require('./contactRequestSchema');
const WishlistLand = require('./wishlistLandSchema');
const Payment = require('./paymentSchema'); // Import the Payment model

app.listen(5000, function () {
    console.log("server is running.....");
});

app.get('/image/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, filename);
    res.sendFile(imagePath);
});

app.get("/users", async (req, res) => {
    const users = await User.find();
    return res.status(200).json(users);
});

app.get("/houses", async (req, res) => {
    const houses = await House.find();
    return res.status(200).json(houses);
});

app.get("/lands", async (req, res) => {
    const lands = await Land.find();
    return res.status(200).json(lands);
});

app.get("/agents", async (req, res) => {
    const agents = await Agent.find();
    return res.status(200).json(agents);
});

app.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find();
        const count = contacts.length; 
        res.json({ contacts, count });
      } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
});

app.get('/get-payments', async (req, res) => {
    try {
        const payments = await Payment.find(); // Assuming you have a Payment model
        res.json({ payments });
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post("/users", async (req, res) => {
    try {
        const { name, email, mobile, password} = req.body;

        const duplicateUser = await User.findOne({ $or: [{ email }, { mobile }] });
        if (duplicateUser) {
            return res.status(400).json({ error: "User already exists with this email or mobile number" });
        }

        const newUser = new User({
            name,
            email,
            mobile,
            password
        });

        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.put('/agents/profile/:userId', async (req, res) => {
    const userId = req.params.userId;
    const formData = req.body;

    try {
        const updatedProfile = await Agent.findByIdAndUpdate(userId, formData, { new: true });

        if (!updatedProfile) {
            return res.status(404).json({ error: 'Agent profile not found' });
        }
        return res.status(200).json({ message: 'Agent profile updated successfully', updatedProfile });
    } catch (error) {
        console.error('Error updating agent profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


app.put("/agents/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { is_verified } = req.body;

        // Update the agent's isVerified field based on the provided ID
        await Agent.findByIdAndUpdate(id, { $set: { is_verified } });

        res.status(200).json({ message: 'Agent updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/agents", async (req, res) => {
    try {
        const { name, email, mobile, password, profession, experience} = req.body;

        const duplicateAgent = await Agent.findOne({ $or: [{ email }, { mobile }] });
        if (duplicateAgent) {
            return res.status(400).json({ error: "Agent already exists with this email or mobile number" });
        }

        const newAgent = new Agent({
            name,
            email,
            mobile,
            password,
            profession,
            experience
        });

        const savedAgent = await newAgent.save();
        return res.status(201).json(savedAgent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/contacts", async (req, res) => {
    try {
        const { name, email, subject, message} = req.body;
        console.log(name);
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


// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads') // Destination folder for uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename for each uploaded image
    }
});

// Multer file upload configuration
const upload = multer({ storage: storage });

app.post('/houses', upload.array('images', 10), async (req, res) => {
    try {
        const {
            userId, // Add userId to the destructured request body
            title,
            location,
            price,
            bedrooms,
            bathrooms,
            squareFootage,
            yearBuilt,
            description,
            contactInfo
        } = req.body;

        const images = req.files.map(file => file.path); // Get paths of uploaded images

        // Create a new house object
        const newHouse = new House({
            userId, // Include userId in the new house object
            title,
            location,
            price,
            bedrooms,
            bathrooms,
            squareFootage,
            yearBuilt,
            description,
            contactInfo,
            images
        });
      
        // Save the new house object to the database
        await newHouse.save();

        res.status(201).json({ message: 'House posted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/lands', upload.array('images', 10), async (req, res) => {
    try {
        const {
            userId, // Add userId to the destructured request body
            title,
            location,
            price,
            area,
            description,
            contactInfo
        } = req.body;

        const images = req.files.map(file => file.path); // Get paths of uploaded images

        // Create a new land object
        const newLand = new Land({
            userId, // Include userId in the new land object
            title,
            location,
            price,
            area,
            description,
            contactInfo,
            images
        });

        // Save the new land object to the database
        await newLand.save();

        res.status(201).json({ message: 'Land posted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a house
app.post('/deleteHouse/:id', async (req, res) => {
    const { id } = req.params;
    try {
      // Delete the house based on the provided ID
      await House.findByIdAndDelete(id);
  
      // Respond with a success message
      res.status(200).json({ message: 'House deleted successfully' });
    } catch (error) {
      // If an error occurs during deletion, respond with an error message
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Delete a land
app.post('/deleteLand/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Delete the land based on the provided ID
      await Land.findByIdAndDelete(id);
  
      // Respond with a success message
      res.status(200).json({ message: 'Land deleted successfully' });
    } catch (error) {
      // If an error occurs during deletion, respond with an error message
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
 
  
app.post('/wishlistHouse', async (req, res) => {
    try {
        const { userId, houseId } = req.body;
        // Create a new WishlistHouse document
        const wishlistHouse = new WishlistHouse({ userId, houseId });

        // Save the new WishlistHouse document
        await wishlistHouse.save();

        res.status(201).json({ message: 'WishlistHouse created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/wishlistHouses',async(req,res)=>{
    const houses = await WishlistHouse.find();
    return res.status(200).json(houses);
})

app.post('/wishlistLand', async (req, res) => {
    try {
        const { userId, landId } = req.body;
        console.log(landId);
        // Create a new WishlistHouse document
        const wishlistLand = new WishlistLand({ userId, landId });

        await wishlistLand.save();

        res.status(201).json({ message: 'WishlistLand created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/wishlistLands',async(req,res)=>{
    const lands = await WishlistLand.find();
    return res.status(200).json(lands);
})

app.post('/contactRequest', async (req, res) => {
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
  
app.get('/contactRequests',async(req,res)=>{
    const requests = await ContactRequest.find();
    return res.status(200).json(requests);
})

// Update contact request status
app.put('/contactRequest/:id', async (req, res) => {
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


app.post('/process-payment', async (req, res) => {
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