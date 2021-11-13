const express = require('express')
const router = express.Router()
const axios = require('axios')

// INDEX ROUTE
router.get('/', (req, res) => {
    let swapi = 'https://swapi.dev/api/vehicles';
    // Use request to call the API
    axios.get(swapi).then(apiResponse => {
      let swVehicles = apiResponse.data.results;
      console.log("these are the vehicles: ", swVehicles)
      res.render('vehicles.ejs')
    })
  });

module.exports = router