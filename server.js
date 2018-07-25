const express = require('express');
const hbs = require('hbs');//handlebars
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

//MIDDLEWARES

//log and timestamps
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('Unable to append to server.log');
        }
    });
    next();//
});
//maintenance view
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
//public directory
app.use(express.static(__dirname + '/public'));

//helpers, functions to be called in mustache partials or view.
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
});

app.get('/',(req, res) => {
   // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',{
       pageTitle:'Home Page',
       welcomeMessage: 'Welcome to my WebSite'
    });
});

app.get('/about',(req, res) => {
   res.render('about.hbs',{
       pageTitle: 'About Page',
   });
});

app.get('/bad',(req, res) => {
   res.send({
       errorMessage: 'Unable to handle request'
   });
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});