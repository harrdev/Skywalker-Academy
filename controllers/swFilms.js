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

  router.get('/:title', function(req, res) {
    let title = req.params.title
    console.log("this is the title: ", title)
    const searchUrl = `https://swapi.dev/api/films/?search=${title}`
    console.log("this is search URL: ", searchUrl)
    axios.get(`https://swapi.dev/api/films/?search=${title}`)
    .then(apiRes => {
        let url = apiRes.data.results[0].url
        console.log("data captured: ", url)
        res.render('academy.ejs', { title, url })
    })
})
module.exports = router