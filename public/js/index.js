console.log('this is from index.js');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message_1 = document.querySelector('#message-1');
const message_2 = document.querySelector('#message-2');
const message_3 = document.querySelector('#message-3')
const icon = document.querySelector('#weather_icon');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  message_1.textContent = ''
  message_2.textContent = 'Loading ......'
  message_3.textContent = ''
  fetch(`/weather?address=${location}`)
    .then((res) => res.json())
    .then(data => {
      // check for any error that comes from our API and if there is nothing then present received data 
      // on our front end to user
      if (data.error) {
        message_1.textContent = `${data.error}`
        message_2.textContent = ''
      }else {
        icon.setAttribute('src', `/assets/${data.weatherData.icon}.png`);
        message_1.textContent = data.weatherData.location
        message_2.textContent = `Right now it's ${data.weatherData.temperature}°C and 
                                ${data.weatherData.summary} with ${data.weatherData.chanceOfRain}% 
                                chance of Rain`
        message_3.textContent = `Feels like: ${data.weatherData.feelsLike}°C`
      }
    });
})


