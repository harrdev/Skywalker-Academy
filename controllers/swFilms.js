const express = require('express')
const router = express.Router()
const axios = require('axios')

// INDEX ROUTE
router.get('/', (req, res) => {
    let swapi = 'https://swapi.dev/api/films';
    // Use request to call the API
    axios.get(swapi).then(apiResponse => {
      let swFilms = apiResponse.data.results;
      console.log("these are the titles: ", swFilms)
      res.render('films.ejs', { swFilms })
    })
  });

module.exports = router