require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const axios = require('axios')
const methodOverride = require('method-override')

// views (ejs and layouts) set up
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use('/static', express.static('public'))
// body parser middelware
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

// session middleware
app.use(session({
    secret: process.env.SUPER_SECRET_SECRET,
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middleware (must go AFTER session middleware)
app.use(flash())

// custom middleware
app.use((req, res, next) => {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next()
})

// controllers middleware 
app.use('/auth', require('./controllers/auth'))
app.use('/people', require('./controllers/swPeople.js'))
app.use('/planets', require('./controllers/swPlanets.js'))
app.use('/species', require('./controllers/swSpecies.js'))
app.use('/films', require('./controllers/swFilms.js'))
app.use('/starships', require('./controllers/swStarships.js'))
app.use('/favePeople', require('./controllers/favePeople.js'))
app.use('/favePlanets', require('./controllers/favePlanets.js'))

// home route
app.get('/', (req, res)=>{
    res.render('home')
})

// profile route
app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})

app.get('/*', isLoggedIn, (req, res) => {
    res.render('404')
})

app.listen(process.env.PORT || 3000, ()=>{
    // console.log(`process.env.SUPER_SECRET_SECRET ${process.env.SUPER_SECRET_SECRET}`)
    console.log("Listening to port 3000")
})