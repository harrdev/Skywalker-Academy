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
router.get('/new', (req, res) => {
    console.log("You hit the new route")
    res.render('planets/newPlanet.ejs')
})

// SAVE ROUTE
router.post('/addFave', isLoggedIn, (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    db.faveplanet.findOrCreate({
        where: { name: data.name },
        defaults: { gravity: data.gravity, population: data.population, terrain: data.terrain, diameter: data.diameter}
    })
        .then(([createdFave, wasCreated]) => {
            req.user.addFaveplanets(createdFave)
            console.log("DB instance created: \n", createdFave)
            res.redirect('planets/planets/')
        })
        .catch(error => {
            console.error
        })
})
// GET UPDATE FORM
router.get('/edit/:idx', isLoggedIn, (req, res) => {
    console.log("Edit route hit: ", req.params.idx)
    db.faveplanet.findOne({
        where: { id: req.params.idx }
    })
        .then(foundPlanet => {
            console.log("This is the planet to edit: ", foundPlanet)
            console.log("This is the planetId: ", req.params.idx)
            console.log("This is the planet name to be passed: ", foundPlanet.name)
            res.render('planets/editPlanet', { planetId: req.params.idx, name: foundPlanet.name, population: foundPlanet.population, diameter: foundPlanet.diameter, terrain: foundPlanet.terrain, gravity: foundPlanet.gravity })
        })
        .catch(error => {
            console.error
        })
})

// // UPDATE ROUTE
router.put('/:id', (req, res) => {
    console.log("Data: ", req.params.id)
    db.faveplanet
      .findByPk(req.params.id)
      .then((planet) => {
        planet.update({
          name: req.body.name
        });
        res.redirect('planets/favePlanets');
      })
      .catch((error) => {
        console.error(error.message);
      });
  });
// SHOW ROUTE
router.get('/:id', isLoggedIn, (req, res) => {
    console.log('this is the fave id\n', req.params.id)
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
router.delete('/:id', (req, res) => {
    console.log('this is the id: ', req.params.id)
    db.faveplanet.destroy({ 
        where: { name: req.params.id }
    })
    .then(deletedItem => {
        console.log('you deleted: ', deletedItem)
        res.redirect('planets/favePlanets')
    })
    .catch(error => {
        console.error
    })
})

module.exports = router