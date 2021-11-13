const express = require('express')
const router = express.Router()
const axios = require('axios')

// INDEX ROUTE
router.get('/', (req, res) => {
    let swapi = 'https://swapi.dev/api/planets';
    // Use request to call the API
    axios.get(swapi).then(apiResponse => {
      let swPlanets = apiResponse.data.results;
      res.render('planets.ejs', { swPlanets })
    })
  });

module.exports = router