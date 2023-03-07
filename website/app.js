//buikding the API
const apiKey = '38ed14482fbfd74ea680ff002e8a97d8';
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let restBaseURL=',us&appid='

const Fahrenheit ='&units=imperial'  // to convert from kelvin to fahrenheit

// creating the Api ex. =>
//     https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
// console.log(newDate)


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    // console.log("inside the listener callback")
    const newZip = document.getElementById("zip").value
    
    const userResponse= document.getElementById("feelings").value
    

    getAtmoData(baseURL,restBaseURL,newZip, apiKey,Fahrenheit)
    .then(function(data){
        //this is the data comes from the server
        // console.log(data)
        postData('/addData', 
        {
            temperature:data.main.temp,
            date:newDate,
            userResponse:userResponse,

            desc:data.weather[0].main,
            city:data.name,
            country:data.sys.country
        })
        .then(updateUI())
    })
    
    


}


const getAtmoData = async (baseURL,restBaseURL, zip, key,Fahrenheit)=>{
       //this if im really getting the data from webapi
    const res = await fetch(baseURL+zip+restBaseURL+key+Fahrenheit)

    try {
        const data = await res.json();
        console.log(data)
        return data

    }  catch(error) {
        console.log("error", error);
        
    }
}

//async post
const postData = async ( url = '', data = {})=>{
    console.log(data);

    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
     // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), //to turn the data into string again?   
    });
    
    try {

        //this throws an error becouse the response is an empty object which cant be parsed to json
        const newData = await response.json();
        // console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
}


const updateUI = async()=>{
    //to get all the data saved in the server side
    const request = await fetch('/getData')
    
    try{
        //converting the data into json
        const allData = await request.json();
        console.log(allData)
        //updating the ui
        document.getElementById('date').innerHTML = "Today's Date: "+allData.key.date;
        document.getElementById('temp').innerHTML = 'Temp: '+allData.key.temperature +' &#8457';

        document.getElementById('content').innerHTML = allData.key.userResponse;

        document.getElementById('desc').innerHTML ='Weather: '+allData.key.desc;
        document.getElementById('city').innerHTML ='City: '+ allData.key.city;
        document.getElementById('country').innerHTML ='Country: '+ allData.key.country;

    }catch(error){
        console.log("error", error);
    }
}
