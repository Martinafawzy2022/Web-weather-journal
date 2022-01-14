/* Global Variables */

// Personal API key for openweatherMap API && metric for getting celesious
const apiKey=',us&units=metric&appid=ea58ec5d69d0d2105c74029e962b8268';
console.log(apiKey);

//Variable for the url of Openweathermap
const baseURL='https://api.openweathermap.org/data/2.5/weather?zip=';

// The part URL of the  postdata function
const partURL = "http://localhost:4000";

//Variable for getting  generate button element
const generateButton=document.getElementById("generate")


/* End Global Variables */



// Excute the  performAction function when the button clicked
 generateButton.addEventListener('click',generateAction);

 // callback function of generate button
 function generateAction (e)
 {
  const zipValue=document.getElementById('zip').value;
  
  fetchData(zipValue);
 }



 // Async GET Function for fetching data from Openweathermap

  async  function fetchData(zipCode)
 {
    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate =( d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

    console.log(newDate);

     console.log('data started to come');
     // Fetch data from API
     const res =await fetch(baseURL+zipCode+apiKey);
    
     try{
       const data=await res.json();
       console.log(data);

        // Save data we want in  an object 
         const fetchedData={
             city:data.name,
             date:newDate,
             temp:data.main.temp , 
             Content:document.getElementById('feelings').value
            


             };

      // Calling postdata  fucntion to save data in the server      
       postFetchedData(partURL+'/postReq',fetchedData).then((data)=>{updateUI();});
  
       return data;

   } 
      // Handle the error and alert the user
      catch (error) {
        console.log(error);
        alert('ERROR : '+error);
      }    
      
     
 }


// Async POST function for posting data on the server

 async function postFetchedData  ( url = '', data = {})
 {
       console.log(data);
       const res = await fetch(url, {
       method: 'POST', 
       credentials: 'same-origin',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(data),
     });
 
     try 
      {
         const data = await res.json();
         console.log("The data posted in server is : "+data);
         return data;
       }
 
     catch(error) 
       {
       console.log("error", error);
       }
 } 
 
 
 // Function for updating User Interface by fetched data

 async function updateUI ()  
 {

   const res = await fetch(partURL+ "/getReq");
   try {
     const da = await res.json();
     // Convert temp to integer 
     const Temp=Math.round(da.temp);
    // Print data to user 
     document.getElementById("city").innerHTML =`<pre><u>CITY</u>     :          ${da.city}</pre>`;
     document.getElementById("temp").innerHTML = `<pre><u>TEMP</u>     :          ${Temp} &degC</pre>`;
     document.getElementById("date").innerHTML = `<pre><u>DATE</u>     :          ${da.date}</pre>`;
     document.getElementById("content").innerHTML=`<pre><u>FEELINGS</u> :          ${da.Content}</pre>`;
    }
     catch (error) {
     console.log(error);

   }
 }
 
 
  