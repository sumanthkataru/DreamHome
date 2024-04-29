const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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

// Import routers
const userRouter = require('./userRouter');
const agentRouter = require('./agentRouter');
const propertyRouter = require('./propertyRouter');
const contactRouter = require('./contactRouter');

// Swagger Options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Real Estate API",
      version: "1.0.0",
      description: "API documentation for the Real Estate application",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
  },
  apis: ["./index.js", "./userRouter.js", "./agentRouter.js", "./propertyRouter.js", "./contactRouter.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use routers
app.use('/', userRouter);
app.use('/', agentRouter);
app.use('/', propertyRouter);
app.use('/', contactRouter);

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

app.listen(5000, function () {
    console.log("server is running.....");
});
