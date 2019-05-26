const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const summary_display = document.querySelector('#summary-display');
const top_left_display_icon = document.querySelector('.top-left-display-icon')
const top_left_display_weather = document.querySelector('.top-left-display-weather')
const top_left_display_city = document.querySelector('.top-left-display-city')
const top_left_display_temp = document.querySelector('.top-left-display-temp')
const sub_condition_icon1 = document.querySelector('.sub-condition-icon1')
const sub_condition_icon2 = document.querySelector('.sub-condition-icon2')
const sub_condition_icon3 = document.querySelector('.sub-condition-icon3')
const sub_condition_icon4 = document.querySelector('.sub-condition-icon4')
const sub_condition_value1 = document.querySelector('.sub-condition-value1')
const sub_condition_value2 = document.querySelector('.sub-condition-value2')
const sub_condition_value3 = document.querySelector('.sub-condition-value3')
const sub_condition_value4 = document.querySelector('.sub-condition-value4')

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
        top_left_display_icon.style.background = `url(../assets/${body.currently.icon}.svg) no-repeat top left`
        top_left_display_icon.style.backgroundSize = `contain`
        top_left_display_weather.textContent = body.currently.summary
        top_left_display_city.textContent = location
        top_left_display_temp.textContent = `${body.currently.temperature}°C`
        
      }
    })
})