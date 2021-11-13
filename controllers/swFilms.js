const express = require('express')
const router = express.Router()
const axios = require('axios')

// INDEX ROUTE
router.get('/', (req, res) => {
    let swapi = 'https://swapi.dev/api/films';
    // Use request to call the API
    axios.get(swapi).then(apiResponse => {
      let swFilms = apiResponse.data.results;
      let title = apiResponse.data.results[0].title;
      //console.log("these are the titles: ", swFilms)
      console.log("title: ", title)
      res.render('films.ejs', { swFilms, title })
    })
  });

module.exports = router