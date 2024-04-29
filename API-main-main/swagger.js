/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         mobile:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - mobile
 *         - password
 *     NewAgent:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         mobile:
 *           type: string
 *         password:
 *           type: string
 *         profession:
 *           type: string
 *         experience:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - mobile
 *         - password
 *         - profession
 *         - experience
 *     Agent:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         mobile:
 *           type: string
 *         password:
 *           type: string
 *         profession:
 *           type: string
 *         experience:
 *           type: string
 *     House:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         title:
 *           type: string
 *         location:
 *           type: string
 *         price:
 *           type: number
 *         bedrooms:
 *           type: number
 *         bathrooms:
 *           type: number
 *         squareFootage:
 *           type: number
 *         yearBuilt:
 *           type: number
 *         description:
 *           type: string
 *         contactInfo:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *     Land:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         title:
 *           type: string
 *         location:
 *           type: string
 *         price:
 *           type: number
 *         area:
 *           type: number
 *         description:
 *           type: string
 *         contactInfo:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *     WishlistHouse:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         houseId:
 *           type: string
 *     WishlistLand:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         landId:
 *           type: string
 *     Contact:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         subject:
 *           type: string
 *         message:
 *           type: string
 *     ContactRequest:
 *       type: object
 *       properties:
 *         sender:
 *           type: string
 *         recipientType:
 *           type: string
 *         recipient:
 *           type: string
 *         message:
 *           type: string
 *         status:
 *           type: string
 *     Payment:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         cardNumber:
 *           type: string
 *         expirationMonth:
 *           type: string
 *         expirationYear:
 *           type: string
 *         securityCode:
 *           type: string
 */

/**
 * @swagger
 * /api-docs:
 *   get:
 *     summary: Get Swagger documentation
 *     description: Retrieve Swagger documentation for the API.
 *     responses:
 *       200:
 *         description: Swagger documentation
 * 
 * /api-docs/{fileName}:
 *   get:
 *     summary: Get specific file from uploads folder
 *     description: Retrieve a specific file from the uploads folder.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the file to retrieve.
 *     responses:
 *       200:
 *         description: The file from the uploads folder
 *       404:
 *         description: File not found
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 * 
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists with this email or mobile number
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /agents:
 *   get:
 *     summary: Get all agents
 *     description: Retrieve a list of all agents.
 *     responses:
 *       200:
 *         description: A list of agents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agent'
 *       500:
 *         description: Internal server error
 * 
 *   post:
 *     summary: Create a new agent
 *     description: Create a new agent with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewAgent'
 *     responses:
 *       201:
 *         description: Agent created successfully
 *       400:
 *         description: Agent already exists with this email or mobile number
 *       500:
 *         description: Internal Server Error
 * 
 * /agents/profile/{userId}:
 *   put:
 *     summary: Update agent profile
 *     description: Update the profile of an agent.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the agent's profile to update.
 *         schema:
 *           type: string
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
 *               mobile:
 *                 type: string
 *               password:
 *                 type: string
 *               profession:
 *                 type: string
 *               experience:
 *                 type: string
 *     responses:
 *       200:
 *         description: Agent profile updated successfully
 *       404:
 *         description: Agent profile not found
 *       500:
 *         description: Internal server error
 * 
 * /agents/{id}:
 *   put:
 *     summary: Update agent status
 *     description: Update the status of an agent.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the agent to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_verified:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Agent updated successfully
 *       500:
 *         description: Internal Server Error
 */

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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
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
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       500:
 *         description: Internal Server Error
 * 
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
 * 
 *   post:
 *     summary: Create a new contact request
 *     description: Create a new contact request with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactRequest'
 *     responses:
 *       201:
 *         description: Contact request created successfully
 *       500:
 *         description: Internal Server Error
 * 
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
 *     responses:
 *       200:
 *         description: Contact request status updated successfully
 *       404:
 *         description: Contact request not found
 *       500:
 *         description: Internal server error
 * 
 * /get-payments:
 *   get:
 *     summary: Get all payments
 *     description: Retrieve a list of all payments.
 *     responses:
 *       200:
 *         description: A list of payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Internal server error
 * 
 * /process-payment:
 *   post:
 *     summary: Process payment
 *     description: Process payment with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Payment failed. Please try again later.
 */

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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/House'
 *     responses:
 *       201:
 *         description: House posted successfully
 *       500:
 *         description: Internal Server Error
 * 
 * /deleteHouse/{id}:
 *   post:
 *     summary: Delete a house
 *     description: Delete a house based on the provided ID.
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
 * 
 * /wishlistHouse:
 *   post:
 *     summary: Add house to wishlist
 *     description: Add a house to the user's wishlist.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WishlistHouse'
 *     responses:
 *       201:
 *         description: WishlistHouse created successfully
 *       500:
 *         description: Internal server error
 * 
 * /wishlistHouses:
 *   get:
 *     summary: Get wishlist houses
 *     description: Retrieve a list of all wishlist houses.
 *     responses:
 *       200:
 *         description: A list of wishlist houses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WishlistHouse'
 *       500:
 *         description: Internal server error
 */

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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Land'
 *     responses:
 *       201:
 *         description: Land posted successfully
 *       500:
 *         description: Internal Server Error
 * 
 * /deleteLand/{id}:
 *   post:
 *     summary: Delete a land
 *     description: Delete a land based on the provided ID.
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
 * 
 * /wishlistLand:
 *   post:
 *     summary: Add land to wishlist
 *     description: Add a land to the user's wishlist.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WishlistLand'
 *     responses:
 *       201:
 *         description: WishlistLand created successfully
 *       500:
 *         description: Internal server error
 * 
 * /wishlistLands:
 *   get:
 *     summary: Get wishlist lands
 *     description: Retrieve a list of all wishlist lands.
 *     responses:
 *       200:
 *         description: A list of wishlist lands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WishlistLand'
 *       500:
 *         description: Internal server error
 */
