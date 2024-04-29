const express = require("express");
const router = express.Router();
const path = require("path"); // Add path module
const multer = require('multer'); // Add multer module

// Import your models
const House = require('./houseSchema');
const Land = require('./landSchema');
const WishlistHouse = require('./wishlistHouseSchema'); // Require WishlistHouse model
const WishlistLand = require('./wishlistLandSchema'); // Require WishlistLand model

/**
 * @swagger
 * /image/{filename}:
 *   get:
 *     summary: Get image by filename
 *     description: Retrieve the image by its filename.
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         description: The filename of the image.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The image content
 *       500:
 *         description: Internal server error
 */

router.get('/image/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, filename);
    res.sendFile(imagePath);
});

/**
 * @swagger
 * /houses:
 *   get:
 *     summary: Get all houses
 *     description: Retrieve a list of all houses.
 *     responses:
 *       200:
 *         description: A list of houses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/House'
 *       500:
 *         description: Internal server error
 * 
 *   post:
 *     summary: Create a new house
 *     description: Create a new house with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               title:
 *                 type: string
 *               location:
 *                 type: string
 *               price:
 *                 type: number
 *               bedrooms:
 *                 type: number
 *               bathrooms:
 *                 type: number
 *               squareFootage:
 *                 type: number
 *               yearBuilt:
 *                 type: number
 *               description:
 *                 type: string
 *               contactInfo:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - userId
 *               - title
 *               - location
 *               - price
 *               - bedrooms
 *               - bathrooms
 *               - squareFootage
 *               - yearBuilt
 *               - description
 *               - contactInfo
 *               - images
 *     responses:
 *       201:
 *         description: House posted successfully
 *       500:
 *         description: Internal Server Error
 */

router.get("/houses", async (req, res) => {
    try {
        const houses = await House.find();
        return res.status(200).json(houses);
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

router.post('/houses', upload.array('images', 10), async (req, res) => {
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

/**
 * @swagger
 * /lands:
 *   get:
 *     summary: Get all lands
 *     description: Retrieve a list of all lands.
 *     responses:
 *       200:
 *         description: A list of lands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Land'
 *       500:
 *         description: Internal server error
 * 
 *   post:
 *     summary: Create a new land
 *     description: Create a new land with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               title:
 *                 type: string
 *               location:
 *                 type: string
 *               price:
 *                 type: number
 *               area:
 *                 type: number
 *               description:
 *                 type: string
 *               contactInfo:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - userId
 *               - title
 *               - location
 *               - price
 *               - area
 *               - description
 *               - contactInfo
 *               - images
 *     responses:
 *       201:
 *         description: Land posted successfully
 *       500:
 *         description: Internal Server Error
 */

router.get("/lands", async (req, res) => {
    try {
        const lands = await Land.find();
        return res.status(200).json(lands);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/lands', upload.array('images', 10), async (req, res) => {
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

/**
 * @swagger
 * /deleteHouse/{id}:
 *   post:
 *     summary: Delete a house
 *     description: Delete a house based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the house to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: House deleted successfully
 *       500:
 *         description: Internal Server Error
 */

router.post('/deleteHouse/:id', async (req, res) => {
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

/**
 * @swagger
 * /deleteLand/{id}:
 *   post:
 *     summary: Delete a land
 *     description: Delete a land based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the land to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Land deleted successfully
 *       500:
 *         description: Internal Server Error
 */

router.post('/deleteLand/:id', async (req, res) => {
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
 
  
/**
 * @swagger
 * /wishlistHouse:
 *   post:
 *     summary: Add house to wishlist
 *     description: Add a house to the user's wishlist.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               houseId:
 *                 type: string
 *             required:
 *               - userId
 *               - houseId
 *     responses:
 *       201:
 *         description: WishlistHouse created successfully
 *       500:
 *         description: Internal Server Error
 */

router.post('/wishlistHouse', async (req, res) => {
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

/**
 * @swagger
 * /wishlistHouses:
 *   get:
 *     summary: Get all wishlist houses
 *     description: Retrieve a list of all houses in the wishlist.
 *     responses:
 *       200:
 *         description: A list of houses in the wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WishlistHouse'
 *       500:
 *         description: Internal server error
 */

router.get('/wishlistHouses',async(req,res)=>{
    const houses = await WishlistHouse.find();
    return res.status(200).json(houses);
})

/**
 * @swagger
 * /wishlistLand:
 *   post:
 *     summary: Add land to wishlist
 *     description: Add a land to the user's wishlist.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               landId:
 *                 type: string
 *             required:
 *               - userId
 *               - landId
 *     responses:
 *       201:
 *         description: WishlistLand created successfully
 *       500:
 *         description: Internal Server Error
 */

router.post('/wishlistLand', async (req, res) => {
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

/**
 * @swagger
 * /wishlistLands:
 *   get:
 *     summary: Get all wishlist lands
 *     description: Retrieve a list of all lands in the wishlist.
 *     responses:
 *       200:
 *         description: A list of lands in the wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WishlistLand'
 *       500:
 *         description: Internal server error
 */

router.get('/wishlistLands',async(req,res)=>{
    const lands = await WishlistLand.find();
    return res.status(200).json(lands);
})

module.exports = router;
