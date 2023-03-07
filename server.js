// Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors used to make the browser and server talk to each other wihout any security interruption
app.use(cors());

//here is one line code to conect the serverside code (the code in the server.js file) with the clientside folder(website)
app.use(express.static('website'));

const port=8000;
//the express server is created using the listen method which talks 2 arg; the post and an call back function to excute
const server = app.listen(port, listening)

function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

////and this how we got ourselves a local server

// Setup empty JS object to act as endpoint for all routes
projectData = {};

app.get('/getData',(req,res)=>{
    console.log("inside the getdata")
    res.send(projectData)
    console.log(projectData)
})

app.post('/addData',(req,res)=>{
    console.log(req.body)

    newEntery={
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse,

        desc: req.body.desc,
        city: req.body.city,
        country: req.body.country
        
    }

    projectData["key"]= newEntery
    // projectData.push(newEntery)   ////this can be used if the projectData is an array
    console.log(projectData)
    console.log("in the end of add data route")
    res.send(projectData)
})


