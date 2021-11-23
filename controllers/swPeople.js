const express = require('express')
const router = express.Router()
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn')
const db = require('../models')

let one = "https://swapi.py4e.com/api/people"
let two = "https://swapi.py4e.com/api/people/?page=2"
let three = "https://swapi.py4e.com/api/people/?page=3"
let four = "https://swapi.py4e.com/api/people/?page=4"
let five = "https://swapi.py4e.com/api/people/?page=5"
let six = "https://swapi.py4e.com/api/people/?page=6"
let seven = "https://swapi.py4e.com/api/people/?page=7"
let eight = "https://swapi.py4e.com/api/people/?page=8"
let nine = "https://swapi.py4e.com/api/people/?page=9"

const requestOne = axios.get(one)
const requestTwo = axios.get(two)
const requestThree = axios.get(three)
const requestFour = axios.get(four)
const requestFive = axios.get(five)
const requestSix = axios.get(six)
const requestSeven = axios.get(seven)
const requestEight = axios.get(eight)
const requestNine = axios.get(nine)

router.get('/', isLoggedIn, (req, res) => {
    axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive, requestSix, requestSeven, requestEight, requestNine]).then(axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        const responseThree = responses[2]
        const responseFour = responses[3]
        const responseFive = responses[4]
        const responseSix = responses[5]
        const responseSeven = responses[6]
        const responseEight = responses[7]
        const responseNine = responses[8]
        // use/access the results 
        let swPeople1 = responseOne.data.results
        let swPeople2 = responseTwo.data.results
        let swPeople3 = responseThree.data.results
        let swPeople4 = responseFour.data.results
        let swPeople5 = responseFive.data.results
        let swPeople6 = responseSix.data.results
        let swPeople7 = responseSeven.data.results
        let swPeople8 = responseEight.data.results
        let swPeople9 = responseNine.data.results
        res.render('people/people.ejs', { swPeople1, swPeople2, swPeople3, swPeople4, swPeople5, swPeople6, swPeople7, swPeople8, swPeople9 })
    })).catch(errors => {
        console.error
    })
})

router.get('/:person', function (req, res) {
    let person = req.params.person
    axios.get(`https://swapi.py4e.com/api/people/?search=${person}`)
        .then(apiRes => {
            let homeworld = apiRes.data.results[0].homeworld
            return apiRes.data.results[0]
        })
        .then(result => {
            axios.get(result.homeworld)
                .then(respond => {
                    let name = result.name
                    let homeworld = respond.data.name
                    let birthYear = result.birth_year
                    let height = result.height
                    let hair = result.hair_color
                    let eyes = result.eye_color
                    res.render('people/academyPeople', { name, birthYear, height, hair, eyes, homeworld })
                })
                .catch(error => {
                    console.error
                })
        })
        .catch(error => {
            console.error
        })
})

module.exports = router