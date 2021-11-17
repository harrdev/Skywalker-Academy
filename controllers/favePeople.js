const express = require('express')
const router = express.Router()
const db = require('../models')

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
router.get('/:name', (req, res) => {
    console.log('this is the fave name\n', req.params.name)
    db.favorite.findOne({
       where: { name: req.params.name } 
    })
    .then(foundFave => {
        res.render('faveDetail', { name: foundFave.name, date: foundFave.createdAt })
    })
    .catch(error => {
        console.error
    })
})
// DELETE ROUTE
router.delete('/:id', (req, res) => {
    //console.log('this is the id: ', req.params.id)
    db.favorite.destroy({ 
        where: { id: req.params.name }
    })
    .then(deletedItem => {
        //console.log('you deleted: ', deletedItem)
        res.redirect('/faves')
    })
    .catch(error => {
        console.error
    })
})

module.exports = router