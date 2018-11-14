const express = require('express')
// View engine
const hbs = require('hbs')

const fs = require('fs')

const port = process.env.PORT || 3000; 


var app = express()


hbs.registerPartials(__dirname +'/views/partials')

// Views is default directory used by HBS
app.set('view engine', 'hbs')


// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname+ '/public'));

app.use((req, res, next) => {
 var now = new Date().toString()
 var log = `${now}: ${req.method} ${req.url}`
 console.log(`${now}: ${req.method} ${req.url}`)
 fs.appendFile('server.log', log +'\n', (err) => {
     if(err) {
         console.log('Unable to append to server log')
     }
 })

 next()
})

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

// Register a handler for HTTP get request
// req stores all the information of the request coming in
// res you can send data back 
app.get('/', (req, res) => {
    // res.send(
    //     {name:"Tanima", 
    // like: ['coding', 'cooking']})
    res.render('home.hbs', {
        pageTitle:"Home",
        name:"Tanima"
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle:"About"
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage:'Cannot show'
    })
})


app.listen(port, () => {
    console.log(`server is up on port ${port}`)
});