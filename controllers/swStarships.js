const express = require('express')
const router = express.Router()
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn')

let one = "https://swapi.dev/api/starships"
let two = "https://swapi.dev/api/starships?page=2"
let three = "https://swapi.dev/api/starships/?page=3"
let four = "https://swapi.dev/api/starships/?page=4"

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
        let swStarships1 = responseOne.data.results
        let swStarships2 = responseTwo.data.results
        let swStarships3 = responseThree.data.results
        let swStarships4 = responseFour.data.results
        // use/access the results 
        res.render('starships.ejs', { swStarships1, swStarships2, swStarships3, swStarships4 })
    })).catch(errors => {
        // react on errors.
    })
})

module.exports = router