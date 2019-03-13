const path = require('path')
const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');

/*******************************************************************
 ***************** home route **************************************
 *******************************************************************/
const publicDirectoryPath = path.join(__dirname, '../public')
console.log(publicDirectoryPath)
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Mo Hemati'
  })
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
  res.send('<h1>Help</h1>')
});


/*******************************************************************
 ***************** listener ****************************************
 *******************************************************************/
app.listen(3000, () => {
  console.log('server is running on port 3000')
});