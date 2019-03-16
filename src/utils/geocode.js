const request = require('request');

const keys = require('../keys.json');


// making HTTP request to Mapbox API to get the latitude and longitude of the requested location.
const geocode = (address, callback) => {
  // preventing app crash when user not sending any location
  if (address.length === 0){
    address = 'Shiraz'
  }
  // define Mapbox api url to request data with 'request' package
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${keys.mapbox}&limit=1`

  // makig HTTP request to the defined url and set it to respond with JSON
  request({
    url: geocodeUrl,
    json: true
  }, (error, { body = {} }) => {
    // request callback function which receive 3 arguments: error, res, and body. By destructuring "res" and removing
    // body as it's optional, it is simplified from (error, res, body) to (error, { body = {}})

    if(error){
      // checking for any errors coming from the request. it can be anything that cause the request
      // to be failed like "user is not connecting to internet" or "Mabbox servers are not responding"
      // As there is an error, we sent the data as undefined
      callback('Unable to connect to the location service', undefined)
    } else if (body.features.length === 0) {
      // if request goes through but location wasn't found, we are going to show this error to user. As 
      // there is an error, we sent the data undefined
      callback('Address Not Found', undefined)
    } else {
      // if there is no error, we send error as undefined and data as an object to callback function
      return callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })


}


module.exports = geocode