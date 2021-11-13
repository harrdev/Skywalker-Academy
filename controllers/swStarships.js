const express = require('express')
const router = express.Router()
const axios = require('axios')

// INDEX ROUTE
router.get('/', (req, res) => {
    let swapi = 'https://swapi.dev/api/starships';
    // Use request to call the API
    axios.get(swapi).then(apiResponse => {
      let swStarships = apiResponse.data.results;
      console.log("these are the starships: ", swStarships)
      res.render('starships.ejs')
    })
  });

module.exports = router