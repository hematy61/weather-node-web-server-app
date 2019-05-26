const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const summary_display = document.querySelector('#summary-display');

const top_left_display_icon = document.querySelector('.top-left-display-icon')
const top_left_display_weather = document.querySelector('.top-left-display-weather')
const top_left_display_city = document.querySelector('.top-left-display-city')
const top_left_display_temp = document.querySelector('.top-left-display-temp')

const sub_condition_value1 = document.querySelector('#sub-condition-value1')
const sub_condition_value2 = document.querySelector('#sub-condition-value2')
const sub_condition_value3 = document.querySelector('#sub-condition-value3')
const sub_condition_value4 = document.querySelector('#sub-condition-value4')

const days_display_left_arrow = document.querySelector('.days-display-left-arrow')
const days_display_right_arrow = document.querySelector('.days-display-right-arrow')
const days_display_next_day = document.querySelector('.days-display-next-day')

const data = {}
const weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

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
        const {
          location,
          body
        } = data.weatherData
        data = {location, body}
        console.log(data)
        updateScreen(data)
        days_display_right_arrow.style.display = `unset`
        days_display_next_day.style.display = `unset`
        const tomorrow = new Date(body.daily.data[0].time * 1000).getDay()
        days_display_next_day.textContent = `${weekdays[tomorrow]}`
      }
    })
})


 days_display_left_arrow.addEventListener('click', (e) => {
   const newData = 
   updateScreen()
 })
 days_display_right_arrow.addEventListener('click', (e) => {
   updateScreen()
 })

 const updateScreen = (data) => {
  top_left_display_icon.style.background = `url(../assets/${data.body.currently.icon}.svg) no-repeat top left`
  top_left_display_icon.style.backgroundSize = `contain`
  top_left_display_weather.textContent = data.body.currently.summary
  top_left_display_city.textContent = data.location
  top_left_display_temp.textContent = `${data.body.currently.temperature}°C`

  summary_display.textContent = `${data.body.daily.summary}`

  sub_condition_value1.textContent = `${data.body.currently.humidity * 100} %`
  sub_condition_value2.textContent = `${data.body.currently.precipProbability * 100} %`
  sub_condition_value3.textContent = `${(data.body.currently.windSpeed * 1.609).toFixed(2)} km/h`
  sub_condition_value4.textContent = `${data.body.currently.pressure} PS`
 }

 const get_date = (today) => {}