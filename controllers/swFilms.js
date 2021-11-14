const express = require('express')
const router = express.Router()
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn')

// INDEX ROUTE
router.get('/', isLoggedIn, (req, res) => {
    let swapi = 'https://swapi.dev/api/films'
    // Use request to call the API
    axios.get(swapi).then(apiResponse => {
      let swFilms = apiResponse.data.results
      res.render('films.ejs', { swFilms })
    })
  })

module.exports = router