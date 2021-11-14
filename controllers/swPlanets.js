const express = require('express')
const router = express.Router()
const axios = require('axios')

let one = "https://swapi.dev/api/planets"
let two = "https://swapi.dev/api/planets/?page=2"
let three = "https://swapi.dev/api/planets/?page=3"
let four = "https://swapi.dev/api/planets/?page=4"
let five = "https://swapi.dev/api/planets/?page=5"
let six = "https://swapi.dev/api/planets/?page=6"

const requestOne = axios.get(one);
const requestTwo = axios.get(two);
const requestThree = axios.get(three);
const requestFour = axios.get(four);
const requestFive = axios.get(five);
const requestSix = axios.get(six)
router.get('/', (req, res) => {
    axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive, requestSix]).then(axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        const responseThree = responses[2]
        const responseFour = responses[3]
        const responseFive = responses[4]
        const responseSix = responses[5]
        let swPlanets1 = responseOne.data.results
        let swPlanets2 = responseTwo.data.results
        let swPlanets3 = responseThree.data.results
        let swPlanets4 = responseFour.data.results
        let swPlanets5 = responseFive.data.results
        let swPlanets6 = responseSix.data.results
        // use/access the results 
        res.render('planets', { swPlanets1, swPlanets2, swPlanets3, swPlanets4, swPlanets5, swPlanets6 })
    })).catch(errors => {
        console.error
    })
})

module.exports = router