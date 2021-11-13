const express = require('express')
const router = express.Router()
const axios = require('axios')

// INDEX ROUTE
router.get('/', (req, res) => {
    let swapi = 'https://swapi.dev/api/people';
    // Use request to call the API
    axios.get(swapi).then(apiResponse => {
      let swPeople = apiResponse.data.results;
      console.log("these are the people: ", swPeople)
      res.render('people.ejs', { swPeople })
    })
  });

module.exports = router