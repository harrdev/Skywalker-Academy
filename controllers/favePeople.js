const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')

// we need an index route that will show all faves
router.get('/', isLoggedIn, (req, res) => {
    // db.favorite.findAll()
    req.user.getFavorites()
        .then(faves => {
            res.render('indexFaves', { results: faves })
        })
        .catch(error => {
            console.error
        })
})
// SAVE ROUTE
router.post('/addFave', isLoggedIn, (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    //console.log("This is the data: ", data)
    db.favorite.findOrCreate({
        where: { name: data.name }
    })
        .then(([createdFave, wasCreated]) => {
            req.user.addFavorites(createdFave)
            console.log("DB instance created: \n", createdFave)
                .then(relationInfo => {
                    console.log("relation info: ", relationInfo)
                    res.redirect(`/people/${createdFave.name}`)
                })
        })
        .catch(error => {
            console.error
        })
})

// SHOW ROUTE
router.get('/:id', isLoggedIn, (req, res) => {
    console.log('this is the fave id\n', req.params.id)
    console.log(req.user)
    db.favorite.findOne({
        where: { id: req.params.id }
    })
        .then(foundFave => {
            res.render('faveDetail', { name: foundFave.name, id: foundFave.id })
        })
        .catch(error => {
            console.error
        })
})
// GET UPDATE FORM
router.get('/edit/:id', isLoggedIn, (req, res) => {
    console.log("Edit route hit: ", req.params.id)
    let favorite = db.favorite.findAll()
    res.render('edit.ejs', { personId: req.params.id, name: favorite.name[req.params.id] })
})

// // UPDATE ROUTE
// router.put('/:id', (req, res)=>{
//     console.log("We're in the router.put route")
//     // let creature = fs.readFileSync('./prehistoric_creatures.json')
//     // let creatureData = JSON.parse(creature)
//     creatureData[req.params.id].type = req.body.type

//     // save the editted creatures to the json file
//     // fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
//     res.redirect('/favePeople')
// })

// DELETE ROUTE
router.delete('/:id', isLoggedIn, (req, res) => {
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