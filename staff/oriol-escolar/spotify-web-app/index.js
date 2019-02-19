require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
// const FileStore = require('session-file-store')(session)
const logicFactory = require('./src/logic-factory')

const { env: { PORT }, argv: [, , port = PORT || 8080] } = process

const app = express()

app.use(session({
    secret: 'a secret phrase',
    resave: true,
    saveUninitialized: true,
    // store: new FileStore({
    //     path: './.sessions'
    // })
}))

app.use(express.static('public'))

app.set('view engine', 'pug')
app.set('views', './src/components')

const formBodyParser = bodyParser.urlencoded({ extended: false })

function pullFeedback(req) {
    const { session: { feedback } } = req

    req.session.feedback = null

    return feedback
}

function renderPage(content) {
    return `<html>
<head>
    <title>Spotifury!</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body class="main">
main class='app'>
<header class="header">
    <h1>Spotifury</h1>
</header>
    ${content}
</body>
</html>`
}

app.get('/', (req, res) => {
    const feedback = pullFeedback(req)

    res.render('login', { feedback })
})

app.get('/register', (req, res) => {
    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) {
        res.redirect('/home')
    } else {
        const feedback = pullFeedback(req)

        res.render('register', { feedback })
    }
})

app.post('/register', formBodyParser, (req, res) => {
    const { body: { name, surname, email, password, passwordConfirm } } = req

    const logic = logicFactory.create(req)

    try {
        logic.registerUser(name, surname, email, password, passwordConfirm)
            .then(() => res.send(renderPage(`<section class="register">
        <h2>Registration confirmation</h2>
        Ok, user <strong>${email}</strong> successfully registered, please proceed to <a href="/login">login</a>.
        </form>
    </section>`)))
            .catch(({ message }) => {
                req.session.feedback = message

                res.redirect('/register')
            })
    } catch ({ message }) {
        req.session.feedback = message

        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {
    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) {
        res.redirect('/home')
    } else {
        const feedback = pullFeedback(req)

        res.render('login', { feedback })
    }
})

app.post('/login', formBodyParser, (req, res) => {
    const { body: { email, password } } = req

    const logic = logicFactory.create(req)

    try {
        logic.logInUser(email, password)
            .then(() => res.redirect('/home'))
            .catch(({ message }) => {
                req.session.feedback = message

                res.redirect('/login')
            })
    } catch ({ message }) {
        req.session.feedback = message

        res.redirect('/login')
    }
})

app.get('/home', (req, res) => {
    try {
        const { session: { feedback } } = req

        const logic = logicFactory.create(req)

        if (logic.isUserLoggedIn)
            logic.retrieveUser()
                .then(user => {
                    req.session.name = user.name
                    return res.render('home', { feedback, name: user.name })
                })
                .catch(({ message }) => {
                    req.session.feedback = message

                    res.redirect('/home')
                })
        else res.redirect('/login')
    } catch ({ message }) {
        req.session.feedback = message

        res.redirect('/home')
    }
})

app.post('/logout', (req, res) => {
    const logic = logicFactory.create(req)

    logic.logOutUser()

    res.redirect('/')
})

app.post('/searchArtist', formBodyParser, (req, res) => {
    const { body: { artist } } = req

    req.session.artist = artist;


    res.redirect(`/artists/${artist}`)

})

app.get('/artists/:artist', formBodyParser, (req, res) => {


    try {
        const feedback = pullFeedback(req)
        const logic = logicFactory.create(req)
        const { params: { artist } } = req
        logic.searchArtists(artist)
        .then(artistList => res.render('home', { feedback, name: req.session.name, artistList }))


    } catch (error) {

        console.log(error)
    }



})


app.get('/albums/:artistId', formBodyParser, (req, res) => {


    try {
        const feedback = pullFeedback(req)
        const logic = logicFactory.create(req)
        const { params: { artistId } } = req
        logic.retrieveAlbums(artistId)
        .then(albums => res.render('home', { feedback, name: req.session.name, albums }))


    } catch (error) {

        console.log(error)
    }



})

app.get('/trackList/:albumId', formBodyParser, (req, res) => {


    try {
        const feedback = pullFeedback(req)
        const logic = logicFactory.create(req)
        const { params: { albumId } } = req
        logic.retrieveTracks(albumId)
        .then(trackList => res.render('home', { feedback, name: req.session.name, trackList }))


    } catch (error) {

        console.log(error)
    }



})





app.get('*', (req, res) => res.status(404).render('404'))



app.listen(port, () => console.log(`server running on port ${port}`))