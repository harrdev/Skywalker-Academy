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
router.get('/new', isLoggedIn, (req, res) => {
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
            res.redirect('/favePeople')
        })
        .catch(error => {
            console.error
        })
})

// GET UPDATE FORM
router.get('/edit/:idx', isLoggedIn, (req, res) => {
    db.favepeople.findOne({
        where: { id: req.params.idx }
    })
        .then(foundPerson => {
            res.render('people/editPeople', { personId: req.params.idx, name: foundPerson.name, height: foundPerson.height, eyes: foundPerson.eyes, hair: foundPerson.hair, homeworld: foundPerson.homeworld, birthYear: foundPerson.birthYear })
        })
        .catch(error => {
            console.error
        })
})

// // UPDATE ROUTE
router.put('/:id', isLoggedIn, (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
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
            res.redirect('/favePeople')
        })
        .catch(error => {
            console.error
        })
});

// SHOW ROUTE
router.get('/:id', isLoggedIn, (req, res) => {
    db.favepeople.findOne({
        where: { name: req.params.id }
    })
        .then(foundFave => {
            res.render('people/showPeople', { name: foundFave.name, homeworld: foundFave.homeworld, birthYear: foundFave.birthYear, height: foundFave.height, eyes: foundFave.eyes, hair: foundFave.hair, id: foundFave.id })
        })
        .catch(error => {
            console.error
        })
})

// DELETE ROUTE
router.delete('/:id', isLoggedIn, (req, res) => {
    db.favepeople.destroy({
        where: { name: req.params.id }
    })
        .then(deletedItem => {
            res.redirect('/favePeople')
        })
        .catch(error => {
            console.error
        })
})

module.exports = router