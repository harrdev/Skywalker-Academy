const express = require('express')
const router = express.Router()
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn')

let one = "https://swapi.py4e.com/api/species"
let two = "https://swapi.py4e.com/api/species/?page=2"
let three = "https://swapi.py4e.com/api/species/?page=3"
let four = "https://swapi.py4e.com/api/species/?page=4"

const requestOne = axios.get(one)
const requestTwo = axios.get(two)
const requestThree = axios.get(three)
const requestFour = axios.get(four)

router.get('/', isLoggedIn, (req, res) => {
  axios.all([requestOne, requestTwo, requestThree, requestFour]).then(axios.spread((...responses) => {
    const responseOne = responses[0]
    const responseTwo = responses[1]
    const responseThree = responses[2]
    const responseFour = responses[3]
    let swSpecies1 = responseOne.data.results
    let swSpecies2 = responseTwo.data.results
    let swSpecies3 = responseThree.data.results
    let swSpecies4 = responseFour.data.results
    // use/access the results 
    res.render('species.ejs', { swSpecies1, swSpecies2, swSpecies3, swSpecies4 })
  })).catch(errors => {
    console.error
  })
})

module.exports = router