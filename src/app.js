const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

/*******************************************************************
 ***************** home route **************************************
 *******************************************************************/
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Mo Hemati'
  })
})

/*******************************************************************
 ***************** About route *************************************
 *******************************************************************/
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Mo Hemati'
  });
})


/*******************************************************************
 ***************** help route **************************************
 *******************************************************************/
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'this is a test message',
    name: 'Mo Hemati'
  })
});

app.get('/help/*', (req,res) => {
  res.render('404', {
    message: "This help page doesn't exist.",
    returnMessage: "Return to Help"
  })
})

/*******************************************************************
 ***************** 404 route **************************************
 *******************************************************************/
app.get('*', (req, res) => {
  res.render('404', {
    error: '404 error',
    message: 'Page not found',
    returnMessage: "Return to Home"
  })
})


/*******************************************************************
 ***************** listener ****************************************
 *******************************************************************/
app.listen(3000, () => {
  console.log('server is running on port 3000')
});