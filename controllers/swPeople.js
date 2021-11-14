const express = require('express')
const router = express.Router()
const axios = require('axios')

// INDEX ROUTE
// router.get('/', (req, res) => {
//     let swapi = 'https://swapi.dev/api/people'
//     // Use request to call the API
//     axios.get(swapi).then(apiResponse => {
//       let swPeople = apiResponse.data.results;
//       res.render('people.ejs', { swPeople })
//     })
//   });

let one = "https://swapi.dev/api/people"
let two = "https://swapi.dev/api/people/?page=2"
let three = "https://swapi.dev/api/people/?page=3"

const requestOne = axios.get(one);
const requestTwo = axios.get(two);
const requestThree = axios.get(three);

router.get('/', (req, res) => {
    axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        const responseThree = responses[2]
        // use/access the results 
        let swPeople = responseOne.data.results
        let swPeople2 = responseTwo.data.results
        let swPeople3 = responseThree.data.results
        res.render('people.ejs', { swPeople, swPeople2, swPeople3 })
      })).catch(errors => {
        // react on errors.
      })
})

module.exports = router