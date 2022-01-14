
// Setup empty JS object to act as endpoint for all routes

projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser=require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors =require('cors');
app.use(cors());
console.log("all packges installed");

// parse application/json
app.use(bodyParser.json());



// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port=4000;
const server =app.listen(port,listening);
// Function to test the server
function listening()
{
    console.log(`Server is running on localhost :${port}`);
}


// GET Route
app.get('/getReq',function(req,res)
{
    console.log("The data was fetched from openweathermap is : ");
    console.log(projectData);
    res.send (projectData);
});
   


// POST Route
app.post('/postReq',function(req,res)
{
 console.log("The data was posted on the server is : ");

 projectData=req.body;
 console.log(projectData);
 res.send(projectData);
});
 

