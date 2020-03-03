const functions = require('firebase-functions');
const express = require('express')
const path = require('path')
const app = express()

exports.httpReq = functions.https.onRequest(app)

app.use(express.urlencoded({extended: false}))
app.use('/public', express.static(path.join(__dirname, '/static')))

//set template engine
app.set('view engine', 'ejs')
//location of ejs files
app.set('views', './ejsviews')

//frontend programming
function frontendHandler(req,res) {
    res.sendFile(__dirname + '/prodadmin/prodadmin.html')
}

app.get('/login', frontendHandler)
app.get('/home', frontendHandler)
app.get('/add', frontendHandler)
app.get('/show', frontendHandler)

//backend programming

const firebase = require('firebase')
 
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWZuvYiRQJ0khyQu6FFbn0zOVXz4ZUtrE",
    authDomain: "tings-wsp20.firebaseapp.com",
    databaseURL: "https://tings-wsp20.firebaseio.com",
    projectId: "tings-wsp20",
    storageBucket: "tings-wsp20.appspot.com",
    messagingSenderId: "530359548450",
    appId: "1:530359548450:web:01a9fb1ba4bec24220687b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const Constants = require('./myconstants.js')

app.get('/', auth, async (req,res) => {
    const coll = firebase.firestore().collection(Constants.COLL_PRODUCTS)
    try {
        let products = []
        const snapshot = await coll.orderBy("name").get()
        snapshot.forEach(doc => {
            products.push({id: doc.id, data: doc.data()})
        })
        res.render('storefront.ejs', {error: false, products, user: req.user})
    }
    catch(e) {
        res.render('storefront.ejs', {error: e, user: req.user})
    }
})

app.get('/b/about', auth, (req,res) => {
    res.render('about.ejs', {user: req.user})
})

app.get('/b/contact', auth, (req,res) => {
    res.render('contact.ejs', {user: req.user})
})

app.get('/b/signin', (req,res) => {
    res.render('signin.ejs', {error: false, user: req.user})
})

app.post('/b/signin', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const auth = firebase.auth()
    try {
        const user = await auth.signInWithEmailAndPassword(email, password)
        res.redirect('/')
    }
    catch(e) {
        res.render('signin', {error: e, user: req.user})
    }
})

app.get('/b/signout', async (req,res) => {
    try {
        await firebase.auth().signOut()
        res.redirect('/')
    }   
    catch(e) {
        res.send('Error: Sign Out')
    }
})

app.get('/b/profile', auth, (req,res) => {
    if(!req.user) {
        res.redirect('/b/signin')
    }
    else {
        res.render('profile', {user: req.user})
    }
})

//middleware

function auth(req,res,next) {
    req.user = firebase.auth().currentUser
    next()
}

//test code

app.get('/testlogin', (req,res) => {
    res.sendFile(path.join(__dirname, '/static/html/login.html'))
})

app.post('/testsignIn', (req,res) => {
    const email = req.body.email
    const password = req.body.pass
    // let page = `
    // (POST) You entered: ${email} and ${password}
    // `;
    // res.send(page)
    const obj = {
        a: email,
        b: password,
        c: '<h1>login success</h1>',
        d: '<h1>login success</h1>',
        start: 1,
        end: 10,
    }
    res.render('home', obj)
})

app.get('/testsignIn', (req,res) => {
    const email = req.query.email
    const password = req.query.pass
    let page = `
        You entered: ${email} and ${password}
    `;
    res.send(page)
})

app.get('/test', (req,res) => {
    const time = new Date().toString()
    let page = `
        <h1>Current Time At Server: ${time}</h1>
    `;
    res.header('refresh', 1)
    res.send(page)
})

app.get('/test2', (req,res) => {
    res.redirect('http://www.uco.edu')
})