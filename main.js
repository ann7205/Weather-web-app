// console.log('this page')
const input = document.querySelector('#search')
const submitBtn = document.querySelector('#submit-btn')
const modalContent = document.querySelector('.modal-content')
const body = document.querySelector('body')

function weatherTemplate(data) {
    let htmlContents = `
    <!-- modal header  -->
    <div class="modal-header">
        <h5 class="modal-title" id="name">${data.name}<span class="country text-dark">AU</span></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span class="text-white" aria-hidden="true">&times;</span>
        </button>
    </div>
    <!-- modal body  -->
    <div class="modal-body row">
        <div class="weather-info col-6 pr-4">
            <div class="temp-wraped d-flex">
                <p class="min-temp">${Math.trunc(data.main.temp_min)}<span><i class="fas fa-temperature-low font-weight-light"></i></span></p>
                <p class="max-temp">${Math.trunc(data.main.temp_max)}<span><i class="fas fa-temperature-high font-weight-light"></i></span></p>
            </div>
            <h1 class="current-temp">${Math.trunc(data.main.temp)}<span>&#8451</span></h1>
            <p class="feel-temp text-right">Feels like<span>${Math.trunc(data.main.feels_like)}</span><span>&deg</span></p>
        </div>
        <div class="weather-pic col-6 pl-4">
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="150px">
            <p class="mb-4">${data.weather[0].main}</p>
            <p>Humidity <span>${data.main.humidity}</span>%</p>
        </div>
    </div>
    `
    modalContent.innerHTML = htmlContents
}

// submit search 
function submit(e) {
    e.preventDefault()
    let inputVal = input.value.toLowerCase().trim()
    let weatherKey = 'fff6e69154c2d52c13a3665c50cd9b3d'
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal},au&units=metric&appid=${weatherKey}`

    const picKey = 'JK54PJiHyzTwKKMSj7m6As7GZuT_7Wll3kpR1ris6Ls'
    const photoUrl = `https://api.unsplash.com/search/photos?client_id=${picKey}&page=1&query=${inputVal}`
    // connect weather api
    fetch(weatherUrl)
        .then(resp => resp.json())
        .then(data => {
            // console.log(inputVal)
            // console.log(data.name)
            // console.log(data.name.toLowerCase().indexOf(inputVal) !== -1)
            input.classList.remove('is-invalid')
            if (data.cod === 200 && data.name.toLowerCase().indexOf(inputVal) !== -1) {
                weatherTemplate(data)
                input.value = ''
            } else {
                e.stopPropagation()
                input.classList.add('is-invalid')
                input.value = ''
            }
        })
        .catch(error => console.log(error))

        // connect unsplash api      
    fetch(photoUrl)
        .then(resp => resp.json())
        .then(data => {
            let randomNum = Math.floor((Math.random() * 10))
            let navPhoto = data.results[randomNum].urls.regular
            body.style.backgroundImage = `url(${navPhoto})`
            // console.log(typeof (navPhoto))
        })
        .catch(error => console.log(error))

}

submitBtn.addEventListener('click', submit)