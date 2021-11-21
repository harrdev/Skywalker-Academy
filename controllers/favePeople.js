const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')

// INDEX ROUTE for people
router.get('/', isLoggedIn, (req, res) => {
    req.user.getFavepeople()
        .then(faves => {
            res.render('indexPeople', { results: faves })
        })
        .catch(error => {
            console.error
        })
})
// SAVE ROUTE
router.post('/addFave', isLoggedIn, (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    db.favepeople.findOrCreate({
        where: { name: data.name },
        defaults: { birthYear: data.birthYear, height: data.height, hair: data.hair, eyes: data.eyes, homeworld: data.homeworld }
    })
        .then(([createdFave, wasCreated]) => {
            req.user.addFavepeople(createdFave)
            console.log("DB instance created: \n", createdFave)
            res.redirect('/people/')
                // .then(relationInfo => {
                //     console.log("relation info: ", relationInfo)
                //     res.redirect(`/people/${createdFave.name}`)
                // })
        })
        .catch(error => {
            console.error
        })
})

// GET UPDATE FORM
router.get('/edit/:idx', isLoggedIn, (req, res) => {
    console.log("Edit route hit: ", req.params.idx)
    db.favepeople.findOne({
        where: { id: req.params.idx }
    })
        .then(foundPerson => {
            console.log("This is the person: ", foundPerson)
            res.render('edit', { personId: req.params.idx, name: foundPerson.favepeople.name })
        })
        .catch(error => {
            console.error
        })
})

// // UPDATE ROUTE
router.put('/:id', (req, res)=>{
    console.log("We're in the router put route")
    // let creature = fs.readFileSync('./prehistoric_creatures.json')
    // let creatureData = JSON.parse(creature)
    db.favepeople.findOne({
        where: { id: req.params.idx }
    })

    personData[req.params.id].type = req.body.type

    // save the editted creatures to the json file
    // fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/favePeople')
})

// SHOW ROUTE
router.get('/:id', isLoggedIn, (req, res) => {
    console.log('this is the fave id\n', req.params.id)
    //console.log(req.user)
    db.favepeople.findOne({
        where: { name: req.params.id }
    })
        .then(foundFave => {
            console.log("Height: ", foundFave.height)
            res.render('showPeople', { name: foundFave.name, homeworld: foundFave.homeworld, birthYear: foundFave.birthYear, height: foundFave.height, eyes: foundFave.eyes, hair: foundFave.hair})
        })
        .catch(error => {
            console.error
        })
})

// DELETE ROUTE
router.delete('/:id', isLoggedIn, (req, res) => {
    console.log('this is the id: ', req.params.id)
    db.favepeople.destroy({
        where: { name: req.params.id }
    })
        .then(deletedItem => {
            console.log('you deleted: ', deletedItem)
            res.redirect('/favePeople')
        })
        .catch(error => {
            console.error
        })
})

module.exports = router