const PORT =8000;
const axios = require("axios");
const express = require('express');
require('dotenv').config()
const cors = require('cors')


const app =express().use(cors())

app.get("/word", (req,res)=>{
 const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        params: {count: '5', wordLength: '5'},
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
          res.json(response.data[0]);
      }).catch(function (error) {
          console.error(error)
      })
    // const options = {
    //     method: 'GET',
    //     url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    //     params: {count: '5', wordLength: '5'},
    //     headers: {
    //       'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    //       'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
    //     }
    //   };
      
    //   axios.request(options).then(function (response) {
    //       console.log(response.data);
    //       res.json(response.data[0]);
    //   }).catch(function (error) {
    //       console.error(error)
    //   })
})

app.get('/check', (req, res)=>{
    console.log(req);
    
   
    
    const options = {
        method: 'GET',
        url: 'https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary',
        params: {word: 'bright'},
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        //   console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      });
      
})


app.listen(PORT, ()=> console.log('Server running on port '+ PORT))

// https://dictionaryapi.com/api/v3/references/learners/json/test?key=44d86eb9-ff0b-499f-855f-d513b172da69