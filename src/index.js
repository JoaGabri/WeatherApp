/* método para fazer efeito inicial do site */

window.addEventListener('load', function () {
    const container = document.getElementById('Container');
    container.classList.add('scale-0', 'opacity-0');
    setTimeout(() => {
      container.classList.remove('scale-0', 'opacity-0');
      container.classList.add('scale-100', 'opacity-100');
    }, 500);
  });

/* api*/
const container = document.querySelector('#Container');
const search = document.querySelector('#search-box');
const button = document.querySelector("#button")
const weatherBox = document.querySelector('#weather-box');
const weatherDetails = document.querySelector('#weather-details');
const error404 = document.querySelector('#not-found');
const body = document.querySelector('body')
const toggle = document.getElementById('toggle');



button.addEventListener('click', () => {
    const APIKey = 'b222a159ab8a77bbeffa957d273a5867';
    const city = document.querySelector('#search-box input').value;

    if(city === "")
        return;
        
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
          .then(response => response.json())
          .then(json => {

            if(json.cod === '404'){
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                body.classList.remove('bg-clear', 'bg-rain', 'bg-snow', 'bg-clouds', 'bg-haze');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');


          const image = document.querySelector('#weather-box img');
          const temperature = document.querySelector('#weather-box #temperature');
          const description = document.querySelector('#weather-box #description');
          const humidity = document.querySelector('#weather-details #humidity span');
          const wind = document.querySelector('#weather-details #wind span')

          switch(json.weather[0].main){
            case 'Clear':
                image.src = '../images/sun.png';
                body.classList.remove('bg-rain', 'bg-snow', 'bg-clouds', 'bg-haze');
                body.classList.add('bg-clear');
                break;

            case 'Rain':
                image.src = '../images/rainy.png';
                body.classList.remove('bg-clear', 'bg-snow', 'bg-clouds', 'bg-haze');
                body.classList.add('bg-rain');
                break;

            case 'Snow':
                image.src ='../images/snowy.png';
                body.classList.remove('bg-clear', 'bg-rain', 'bg-clouds', 'bg-haze');
                body.classList.add('bg-snow');
                break;
            
            case 'Clouds':
                image.src = '../images/cloudy.png';
                body.classList.remove('bg-clear', 'bg-rain', 'bg-snow', 'bg-haze');
                body.classList.add('bg-clouds');
                break;
          

            case 'Haze':
                image.src = '../images/mist.png';
                body.classList.remove('bg-clear', 'bg-rain', 'bg-snow', 'bg-clouds');
        body.classList.add('bg-haze');
                break;

            default:
                image.src = '';
                body.classList.remove('bg-clear', 'bg-rain', 'bg-snow', 'bg-clouds', 'bg-haze');
        }

        
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}<span>Km/h</span>`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '430px';

        var celsius = parseInt(json.main.temp)

        function celsiusParaFahrenheit(celsius) {
            var fahrenheit = (celsius * 9/5) + 32;
            return `${parseInt(fahrenheit)}<span>°F</span>`;
          }
        
        toggle.checked ?  temperature.innerHTML = celsiusParaFahrenheit(celsius)  : temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;


          toggle.addEventListener('change', function() {

            toggle.checked ?  temperature.innerHTML = celsiusParaFahrenheit(celsius)  : temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        
        });
        
    });

});










