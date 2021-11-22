const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')

// INDEX ROUTE to list favorites
router.get('/', isLoggedIn, (req, res) => {
    req.user.getFaveplanets()
        .then(faves => {
            res.render('planets/indexPlanets', { results: faves })
        })
        .catch(error => {
            console.error
        })
})

// NEW ROUTE
router.get('/new', isLoggedIn, (req, res) => {
    res.render('planets/newPlanet.ejs')
})

// SAVE ROUTE
router.post('/addFave', isLoggedIn, (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    db.faveplanet.findOrCreate({
        where: { name: data.name },
        defaults: { gravity: data.gravity, population: data.population, terrain: data.terrain, diameter: data.diameter }
    })
        .then(([createdFave, wasCreated]) => {
            req.user.addFaveplanets(createdFave)
            res.redirect('/favePlanets')
        })
        .catch(error => {
            console.error
        })
})

// GET UPDATE FORM
router.get('/edit/:idx', isLoggedIn, (req, res) => {
    db.faveplanet.findOne({
        where: { id: req.params.idx }
    })
        .then(foundPlanet => {
            res.render('planets/editPlanet', { planetId: req.params.idx, name: foundPlanet.name, population: foundPlanet.population, diameter: foundPlanet.diameter, terrain: foundPlanet.terrain, gravity: foundPlanet.gravity })
        })
        .catch(error => {
            console.error
        })
})

// // UPDATE ROUTE
router.put('/:id', isLoggedIn, (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    db.faveplanet.update({
        name: data.name,
        gravity: data.gravity,
        population: data.population,
        terrain: data.terrain,
        diameter: data.diameter
    }, {
        where: { name: data.name }
    })
        .then(editedItem => {
            res.redirect('/favePlanets')
        })
        .catch(error => {
            console.error
        })
});

// SHOW ROUTE
router.get('/:id', isLoggedIn, (req, res) => {
    db.faveplanet.findOne({
        where: { name: req.params.id }
    })
        .then(foundFave => {
            res.render('planets/showPlanet', { name: foundFave.name, gravity: foundFave.gravity, population: foundFave.population, terrain: foundFave.terrain, diameter: foundFave.diameter, id: foundFave.id })
        })
        .catch(error => {
            console.error
        })
})

// DELETE ROUTE
router.delete('/:id', isLoggedIn, (req, res) => {
    db.faveplanet.destroy({
        where: { name: req.params.id }
    })
        .then(deletedItem => {
            res.redirect('/favePlanets')
        })
        .catch(error => {
            console.error
        })
})

module.exports = router