
const request = require("request");


// define a weather module to request weather data from darksky api with the latitude and longitude info
// that has passed into from geocode module. 
const weather = (latitude, longitude, location,  callback) => {
 
  // define Darksky api url to request data with 'request' package
  const weatherURL = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${latitude},${longitude}?units=si`;

  // makig HTTP request to the defined url and set the request to respond with JSON
  request({
    url: weatherURL,
    json: true
  }, (error, { body } = {} ) => {
    // request callback function which receive 2 arguments: error, res, and body. By destructuring "res" and removing
    // body as it's optional, it is simplified from (error, res, body) to (error, { body = {}})

    if (error) {
      callback('Unable to connect to the weather application', undefined)
      // checking for any errors coming from the request. it can be anything that cause the request
      // to be failed like "user is not connecting to internet" or "Darksky servers are not responding"
      // As there is an error, we sent the data as undefined 
    } else if (body.error) {
      callback(`OOPS!!! it seems something went wrong. ${body.error}`, undefined)
      // if request goes through but location wasn't found, we are going to show this error to user. As 
      // there is an error, we sent the data undefined
    } else {
      callback(undefined, {
        location,
        summary: body.currently.summary,
        temperature: body.currently.temperature,
        chanceOfRain: body.currently.precipProbability,
        icon: body.currently.icon
      })
      // if there is no error, we send error as undefined and data as string      
    }
  })
}


module.exports = weather
