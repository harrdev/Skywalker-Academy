const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')

// INDEX ROUTE for people
router.get('/', isLoggedIn, (req, res) => {
    req.user.getFavepeople()
        .then(faves => {
            res.render('people/indexPeople', { results: faves })
        })
        .catch(error => {
            console.error
        })
})

// NEW ROUTE
router.get('/new', (req, res) => {
    console.log("You hit the new route")
    res.render('people/newPerson.ejs')
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
            console.log("This is the name: ", foundPerson.name)
            res.render('people/editPeople', { personId: req.params.idx, name: foundPerson.name, height: foundPerson.height, eyes: foundPerson.eyes, hair: foundPerson.hair, homeworld: foundPerson.homeworld, birthYear: foundPerson.birthYear })
        })
        .catch(error => {
            console.error
        })
})

// // UPDATE ROUTE
router.put('/:id', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    console.log("Data variable: ", data)
    console.log("Data to edit: ", data.name)
    db.favepeople.update({
        name: data.name,
        homeworld: data.homeworld,
        birthYear: data.birthYear,
        eyes: data.eyes,
        hair: data.hair,
        height: data.height
    }, {
        where: { name: data.name }
    })
    .then(editedItem => {
        console.log("This was edited: ", editedItem)
        res.redirect('/people')
    })
    .catch(error => {
        console.error
    })
  });

// SHOW ROUTE
router.get('/:id', isLoggedIn, (req, res) => {
    console.log('this is the fave id\n', req.params.id)
    //console.log(req.user)
    db.favepeople.findOne({
        where: { name: req.params.id }
    })
        .then(foundFave => {
            console.log("Height: ", foundFave.height)
            res.render('people/showPeople', { name: foundFave.name, homeworld: foundFave.homeworld, birthYear: foundFave.birthYear, height: foundFave.height, eyes: foundFave.eyes, hair: foundFave.hair, id: foundFave.id})
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
            res.redirect('people/favePeople')
        })
        .catch(error => {
            console.error
        })
})

module.exports = router