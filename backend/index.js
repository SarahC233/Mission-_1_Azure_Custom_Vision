require("dotenv").config(); //loads the environment variables from a .env file into process.env

const express = require("express"); // Imports express.js library (web framework for Node.js to build web apps and APIs)
const multer = require("multer"); // Imports multer library for handling file uploads
const fs = require("fs"); // Imports the built-in Node.js file system module

const {
  PredictionAPIClient,
} = require("@azure/cognitiveservices-customvision-prediction"); // Imports the PredictionAPIClient class from the Azure Custom Vision SDK (software development kit)
const { ApiKeyCredentials } = require("@azure/ms-rest-js"); //imports the ApiKeyCredentials class from the Azure REST SDK
const bodyParser = require("body-parser"); // Imports the body-parser library for parsing incoming HTTP request bodies
const cors = require("cors"); //Imports Cross-Origin Resource Sharing (CORS) middleware to enable CORs

const app = express(); // Creates an Express application
app.use(cors());
const port = process.env.PORT || 3000;

const predictionKey = process.env.VISION_PREDICTION_KEY;
const predictionEndpoint = process.env.VISION_PREDICTION_ENDPOINT;
const projectId = process.env.PROJECT_ID;
const publishIterationName = process.env.PUBLISH_ITERATION_NAME;

const upload = multer({ dest: "uploads/" }); //Initialises multer and sets the destination folder for uploaded files

const predictorCredentials = new ApiKeyCredentials({
  inHeader: { "Prediction-key": predictionKey },
}); //creates an instance of the ApiKeyCredentials class with the prediction key

const predictor = new PredictionAPIClient(
  predictorCredentials,
  predictionEndpoint
);

//Health check endpoint
app.get("/health", (req, res) => {
  res.send("Server is running");
});

//Prediction endpoint
app.post("/predict", upload.single("image"), async (req, res) => {
  //Sets up a POST route at the /predict endpoint that uses
  //the Multer middleware to accept a single file upload with the field name "image".
  //The route is an asynchronous function that uses the Custom Vision SDK to classify the uploaded image,
  //then sends response with the prediction results
  console.log(req.file); //log the file received
  console.log(req.body);

  const imageFilePath = req.file.path;
  console.log(req.file);

  try {
    //this block wraps code that might throw an exception, if that happens can be caught and handled in catch block
    const results = await predictor.classifyImage(
      //Calling classifyImage method of predictor object (which is an instance of PredictionAPIClient from Azure Custom Prediction SDK).
      //This method sends an image to the Custom Vision Service and receives a prediciton back
      projectId,
      publishIterationName, //Deets of the project and iteration to use
      fs.readFileSync(imageFilePath)
    ); //Reads the image file from the file system synchronously (blocks execution of further code till file is read,
    //resulting data sent as image to classify)
    fs.unlinkSync(imageFilePath); // Delete the file after use

    const predictions = results.predictions //now processing the predictions returned by Custom Vision. results.predictions is an array returned of prediction objects.
      .filter((prediction) => prediction.probability > 0.5) //Filters out predictions with probability less than 0.5, removing predictions less confident than 50%
      .map((prediction) => ({
        tagName: prediction.tagName,
        probability: prediction.probability,
      })); //transforms the predictions into a new array of objects with only the tagName and probability properties

    const highestPrediction = predictions.reduce((prev, current) => {
      return prev.probability > current.probability ? prev : current;
    }, {}); //uses the reduce method to find the prediction with the highest probability.
    //Reduce method takes a callback function that compares the probabilities of two predictions (prev and current) and returns the one with the higher probability

    if (!highestPrediction.tagName) {
      throw new Error("No predictions with sufficient probability found.");
    } //Checks if highest prediction has a tagName property. If not it means no predictions with probability greater than 0.5 were found, so an error is thrown

    const vehicleType = highestPrediction.tagName; //tagName represents the predicted vehicle type
    const confidence = highestPrediction.probability; //these extract vehicle type and confidence score from the highest prediction and assigns to the variables

    // Defining premiums object - a dictionary that maps vehicle types to arbitrary annual insurance premiums
    const premiums = {
      utility: "The annual premium for this type of vehicle is $1000.",
      SUV: "The annual premium for this type of vehicle is $1200.",
      sedan: "The annual premium for this type of vehicle is $800.",
      hatchback: "The annual premium for this type of vehicle is $600.",
    };

    const premiumEstimate =
      premiums[vehicleType] || "Premium not available for this vehicle type.";

    res.status(200).send({ vehicleType, confidence, premiumEstimate }); //Executed when prediction is successful. Sends response with HTTP status code 200 (OK) and JSON
    //object containing the predicted vehicle type, confidence score, and premium estimate
  } catch (error) {
    //this block will be executed if there's an error during prediction
    console.error("Prediction Error:", error);
    res.status(500).send({ error: "Error predicting car type" });
  }
});

app.use(bodyParser.json()); // Parses incoming request bodies in JSON format

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


