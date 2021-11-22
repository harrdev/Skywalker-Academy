const express = require('express')
const router = express.Router()
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn')

let one = "https://swapi.py4e.com/api/planets"
let two = "https://swapi.py4e.com/api/planets/?page=2"
let three = "https://swapi.py4e.com/api/planets/?page=3"
let four = "https://swapi.py4e.com/api/planets/?page=4"
let five = "https://swapi.py4e.com/api/planets/?page=5"
let six = "https://swapi.py4e.com/api/planets/?page=6"

const requestOne = axios.get(one)
const requestTwo = axios.get(two)
const requestThree = axios.get(three)
const requestFour = axios.get(four)
const requestFive = axios.get(five)
const requestSix = axios.get(six)

router.get('/', isLoggedIn, (req, res) => {
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
        res.render('planets/planets', { swPlanets1, swPlanets2, swPlanets3, swPlanets4, swPlanets5, swPlanets6 })
    })).catch(errors => {
        console.error
    })
})

router.get('/:planet', function (req, res) {
    let planet = req.params.planet
    console.log(planet)
    axios.get(`https://swapi.py4e.com/api/planets/?search=${planet}`)
        .then(apiRes => {
            let name = apiRes.data.results[0].name
            let population = apiRes.data.results[0].population
            let gravity = apiRes.data.results[0].gravity
            let terrain = apiRes.data.results[0].terrain
            let diameter = apiRes.data.results[0].diameter
            res.render('planets/academyPlanet', { name, population, gravity, terrain, diameter })
        })
        .catch(error => {
            console.error
        })
})
module.exports = router