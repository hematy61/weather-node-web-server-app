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
 ***************** weather route ***********************************
 *******************************************************************/
app.get('/weather', (req, res) => {
  res.send('<h1>Local Weather</h1>')
});

/*******************************************************************
 ***************** help route **************************************
 *******************************************************************/
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'this is a test message'
  })
});


/*******************************************************************
 ***************** listener ****************************************
 *******************************************************************/
app.listen(3000, () => {
  console.log('server is running on port 3000')
});