const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const summary_display = document.querySelector('#summary-display');

const top_left_display_icon = document.querySelector('.top-left-display-icon')
const top_left_display_date = document.querySelector('.top-left-display-date')
const top_left_display_city = document.querySelector('.top-left-display-city')
const top_left_display_temp = document.querySelector('.top-left-display-temp')

const sub_condition_value1 = document.querySelector('#sub-condition-value1')
const sub_condition_value2 = document.querySelector('#sub-condition-value2')
const sub_condition_value3 = document.querySelector('#sub-condition-value3')
const sub_condition_value4 = document.querySelector('#sub-condition-value4')

const top_right_display = document.querySelector('.top-right-display')

const days_display_left_arrow = document.querySelector('.days-display-left-arrow')
const days_display_right_arrow = document.querySelector('.days-display-right-arrow')
const days_display_next_day = document.querySelector('.days-display-next-day')
const days_display_previous_day = document.querySelector('.days-display-previous-day')



const hours_display = document.querySelector('.hours-display')
const hours_display_arrows = hours_display.children[0].querySelectorAll('a')
const hourly_tile_hour_display = hours_display.children[1].querySelectorAll('.hour')
const hourly_tile_temp_display = hours_display.children[1].querySelectorAll('.hourly-tile-temp')
const hourly_tile_feelsLike_display = hours_display.children[1].querySelectorAll('.hourly-tile-feels-like')
console.log(hourly_tile_temp_display)


let receivedData = {}
let todayInDigit = 0
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// -------------------------------------------------- Fetching data from our NodeJS Restful API
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  fetch(`weather?address=${location}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        // check for any error that comes from our API and if there is nothing then present received data 
        // on our front end to user
        summary_display.textContent = `${data.error}`
      } else {
        receivedData = data.weatherData
        console.log(receivedData.body.hourly)
        updateScreen(receivedData.location, receivedData.body.daily.data[0])
        days_display_right_arrow.style.display = `unset`
        days_display_next_day.style.display = `unset`
        days_display_next_day.textContent = `${weekdays[todayInDigit + 1]}`

        top_right_display.style.display = 'flex'

        updateHourlyDisplay(receivedData.body.hourly.data.slice(undefined, 8))

      }
    })
})

// -------------------------------------------------- Update Screen on left arrow clicks
 days_display_left_arrow.addEventListener('click', (e) => {
   if ( (todayInDigit - 1) > 0) {
     todayInDigit--
     updateScreen(receivedData.location, receivedData.body.daily.data[todayInDigit])
     days_display_next_day.textContent = `${weekdays[todayInDigit + 1]}`
     days_display_previous_day.textContent = `${weekdays[todayInDigit - 1]}`
   } else if ( (todayInDigit -1) === 0 ) {
     todayInDigit--
     days_display_previous_day.textContent = ''
     days_display_left_arrow.style.display = ``

   }
 })
// -------------------------------------------------- Update Screen on right arrow clicks
 days_display_right_arrow.addEventListener('click', (e) => {
  if ( (todayInDigit + 1) < (receivedData.body.daily.data.length - 2) ) {
    todayInDigit++
    console.log('todayInDigit: ',todayInDigit)
    updateScreen(receivedData.location, receivedData.body.daily.data[todayInDigit])
    days_display_next_day.textContent = `${weekdays[todayInDigit + 1]}`
    days_display_left_arrow.style.display = `unset`
    days_display_previous_day.textContent = `${weekdays[todayInDigit - 1]}`
  }
 })

// --------------------------------------------------  Hourly screen update
const updateHourlyDisplay = (hourlyData) => {
  console.log('hourlyData: ', hourlyData)
  hourlyData.forEach((eachHourData, index) => {
    hourly_tile_hour_display[index].textContent = `${get_hours(eachHourData.time)}`
    hourly_tile_temp_display[index].textContent = `${eachHourData.temperature.toFixed(1)} °C`
    hourly_tile_feelsLike_display[index].innerHTML = `
      <p>Feels Like</p>
      <p>${eachHourData.apparentTemperature.toFixed(1)} °C</p>
      `
  })
}

// -------------------------------------------------- Common functions
 const updateScreen = (location, data) => {
   console.log(location, data)
  top_left_display_icon.style.background = `url(../assets/${data.icon}.svg) no-repeat top left`
  top_left_display_icon.style.backgroundSize = `contain`
  top_left_display_date.textContent = `${weekdays[todayInDigit]}`
  top_left_display_city.textContent = location
  top_left_display_temp.innerHTML = `
  <p>Min: ${data.temperatureLow}°C</p>
  <p>Max: ${data.temperatureHigh}°C</p>
  `
  summary_display.textContent = `${data.summary}`

  sub_condition_value1.textContent = `${Math.round(data.humidity * 100)} %`
  sub_condition_value2.textContent = `${data.precipProbability * 100} %`
  sub_condition_value3.textContent = `${(data.windSpeed * 1.609).toFixed(2)} km/h`
  sub_condition_value4.textContent = `${data.pressure} PS`
 }

 const get_hours = (timeStamp) => {
     let hour = undefined
     let hourString = undefined
     hour = new Date(timeStamp * 1000).getHours()
     if (hour === 0) {
       hourString = `12 A.M.`
     } else if (0 < hour && hour < 12) {
       hourString = `${hour} A.M.`
     } else if (hour === 12) {
       hourString = `12 P.M`
     } else if (12 < hour && hour < 24) {
       hourString = `${hour - 12} P.M`
     }
     console.log('hourString: ', hourString)
   return hourString
 }