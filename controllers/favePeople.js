const express = require('express')
const router = express.Router()
const db = require('../models')


// we need an index route that will show all faves
router.get('/', (req, res) => {
    db.favorite.findAll()
        .then(faves => {
            res.render('indexFaves', {results: faves})
        })
        .catch(error => {
            console.error
        })
})
// SAVE ROUTE
router.post('/addFave', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    //console.log("This is the data: ", data)
    db.favorite.create({
        name: data.name
    })
    .then(createdFave => {
        console.log("DB instance created: \n", createdFave)
        res.redirect(`/people/${createdFave.name}`)
    })
    .catch(error => {
        console.error
    })
})

// SHOW ROUTE
router.get('/:id', (req, res) => {
    console.log('this is the fave id\n', req.params.id)
    db.favorite.findOne({
       where: { id: req.params.id } 
    })
    .then(foundFave => {
        res.render('faveDetail', { name: foundFave.name, id: foundFave.id})
    })
    .catch(error => {
        console.error
    })
})
// DELETE ROUTE
router.delete('/:id', (req, res) => {
    console.log('this is the id: ', req.params.id)
    db.favorite.destroy({ 
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