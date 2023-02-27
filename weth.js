
// All Variables
const app = document.getElementById("app");

const pMoreBtn = document.getElementById("MoreInfoP");

const selectBoxLang = document.getElementById("lang-select");

const input = document.getElementById("search");
const searchBtn = document.getElementById("btn-search");

const cardMap = document.querySelector(".card_weather .part_map");
const parent_card = document.querySelector(".card_weather .parent_card");

let tempBtns = '';



// options variables
const apiKey = "c5b938c99e40b31dd1f5ae5aad327606";

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu',
'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let apiLang = 'en', valueInput = '', tempC = 'f';

// Initialize The Map Of Content
var map = L.map('map');
map.setView([35.192, 141.768], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	boxZoom: true,
	trackResize: true,
	worldCopyJump: true,
}).addTo(map);




// All Changes To Show Weather Result On Page
// When Click On search button
searchBtn.addEventListener("click", ()=> {
	valueInput = input.value.toLowerCase();
	if(valueInput !== ''){
		show(getapi(valueInput, apiLang));
	}
});

// When Click On [ Enter ] in Keyboard From Input Search
input.addEventListener("keyup", (event)=> {
    if(event.key == "Enter" || event.key == "enter") {
		valueInput = input.value.toLowerCase();
        if(valueInput !== ''){
			show(getapi(valueInput, apiLang));
		}
    }
})

// When Change The Language From Select Box
selectBoxLang.onchange = () => {
	apiLang = selectBoxLang.value;
	if(valueInput !== ''){
		show(getapi(valueInput, apiLang));
	}
}



// To Open And Close Modal
pMoreBtn.onclick = ()=> {
	let ModalDiv = document.querySelector('.'+pMoreBtn.dataset.class);
	ModalDiv.classList.add("show");
	ModalDiv.addEventListener("click", (e)=> {
		if(e.target == ModalDiv){
			ModalDiv.classList.remove("show");
		}
	})
}


// Defining async function
async function getapi(value, lang = 'en') {
	var data = [];

    // Storing response
    const response1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}&lang=${lang}`);
	const response2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${apiKey}&lang=${lang}`);

    // Storing data in form of JSON
    data.push(await response1.json());
	data.push(await response2.json());

    return data;
}

// Function to define innerHTML for HTML Result Container
function show(data) {
	let content;
	data.then(res =>  {
		const CurrentDate = new Date(res[0].dt * 1000),
		 sunriseDate = new Date(res[0].sys.sunrise * 1000),
		 sunsetDate = new Date(res[0].sys.sunset * 1000);
		let fore = '';

		setLocationMap(res[0].coord.lat, res[0].coord.lon);

		if(res[0].weather[0].main.toLowerCase() === 'clouds') {
			backStyle(app, 'url(./assets/imgs/clouds-weather.webp)');
		} else if(res[0].weather[0].main.toLowerCase() === 'clear' && CurrentDate.getHours() >= sunriseDate.getHours() && CurrentDate.getHours() < sunsetDate.getHours()){
			backStyle(app, 'url(./assets/imgs/light-day.webp)');
		} else if(res[0].weather[0].main.toLowerCase() === 'clear'){
			if (CurrentDate.getHours() >= sunsetDate.getHours() || CurrentDate.getHours() < sunriseDate.getHours()) {
				backStyle(app, 'url(./assets/imgs/clear-night.jpg)');
			}
		} else if(res[0].weather[0].main.toLowerCase() === 'haze'){
			backStyle(app, 'url(./assets/imgs/haze-weather.jpg)');
		} else {
			backStyle(app, 'url(./assets/imgs/defo.jpg)');
		}


		for(let i = 0; i < res[1].list.length; i++){
			let dateForecast = new Date(res[1].list[i].dt * 1000);

			fore+= `<div class="fore">
						<div class="row icon_num_fore">
							<div class="icon-fore col-md-4 col-4 col-sm-12">
								<img src="https://openweathermap.org/img/wn/${res[1].list[i].weather[0].icon}@2x.png" />
							</div>
							<div class="num-fore col-md-8 col-8 col-sm-12">
								<p>${getTemp(res[1].list[i].main.temp, tempC)}°</p>
							</div>
						</div>
						<div class="date-fore">
							<span>${days[dateForecast.getDay()]}, ${months[dateForecast.getMonth()]}${dateForecast.getDate()}: ${formatAMPM(dateForecast)}</span>
							<span>${res[1].list[i].weather[0].description}</span>
						</div>
						<div class="row collection-info-fore">
							<div class="col-6 col-md-6">
								<p>Feels Like <span>${getTemp(res[1].list[i].main.feels_like, tempC)}</span>°</p>
								<p>Sea Level <span class="material-symbols-outlined">waves</span><span>${res[1].list[i].main.sea_level}</span> in</p>
								<p>Humidity <span>${res[1].list[i].main.humidity}</span>%</p>
							</div>
							<div class="col-6 col-md-6">
								<p>Wind <span class="material-symbols-outlined">air</span><span>${res[1].list[i].wind.speed}</span>m/s N</p>
								<p>Visibility <span>${res[1].list[i].visibility.toLocaleString().substr(0, 4).replace(",", ".")}</span>km</p>
								<p>Pressure <span>${res[1].list[i].main.pressure}</span>hPa</p>
							</div>
						</div>
					</div>`;
		}

		content = `<div class="row big_info_content">
						<div class="name-deg">
							<span>${months[CurrentDate.getMonth()]} ${CurrentDate.getDate().toLocaleString(hour12=true)}, ${formatAMPM(CurrentDate)}</span>
							<h1>${res[0].name}, ${res[0].sys.country}</h1>
							<div class="content-info">
								<span>SUNRISE: ${formatAMPM(sunriseDate)} <span class="material-symbols-outlined">sunny_snowing</span></span>
								<span>SUNSET: ${formatAMPM(sunsetDate)} <span class="material-symbols-outlined">wb_twilight</span></span>
							</div>
						</div>
						<div class="icon-deg col-md-4 col-4 col-sm-12">
							<img src="https://openweathermap.org/img/wn/${res[0].weather[0].icon}@2x.png" />
						</div>
						<div class="num-deg col-md-8 col-8 col-sm-12">
							<p>${getTemp(res[0].main.temp, tempC)}</p>
							<div class="ch_deg">
								<span class="tempBtn" data-temp="f">°F</span>
								<hr>
								<span class="tempBtn" data-temp="c">°C</span>
							</div>
						</div>
					</div>

					<div class="row text-stat">
						<h3>${res[0].weather[0].main}, ${res[0].weather[0].description}</h3>
					</div>

					<div class="row collection-info">
						<div class="col-6 col-md-6">
							<p>Feels Like <span>${getTemp(res[0].main.feels_like, tempC)}</span>°</p>
							<p>Humidity <span>${res[0].main.humidity}</span>%</p>
						</div>
						<div class="col-6 col-md-6">
							<p>Wind <span class="material-symbols-outlined">air</span><span>${res[0].wind.speed}</span>m/s NNE</p>
							<p>Visibility <span>${res[0].visibility.toLocaleString().substr(0, 4).replace(",", ".")}</span>km</p>
						</div>
					</div>

					<hr>

					<div class="row hourly_forecast">
						<p class="fore-title">Hourly Forecast</p>
						<div class="scroll_content_forecs">
							${fore}
						</div>
					</div>`;

		document.querySelector(".card_weather .part_info .container_result_info").innerHTML = content;

		draggingShow();
		const tempBtns = document.querySelectorAll(".num-deg .ch_deg .tempBtn");
		tempBtns.forEach(btn => {
			if(btn.dataset.temp === tempC){
				btn.classList.add("active");
			}

			btn.addEventListener("click", ()=> {
				if(btn.dataset.temp === 'c') {
					tempC = 'c';
				} else if(btn.dataset.temp === 'f'){
					tempC = 'f';
				}
				show(getapi(valueInput, apiLang));
			})
		})

		cardMap.classList.add("show");
		parent_card.classList.add("show");
	}).catch(err => {
		backStyle(app, 'url(./assets/imgs/defo.jpg)');
		content = `<div class="empty_result">
						<div class="empty-img">
							<img src="./assets/imgs/not-found.png" alt="Weather Empty" />
						</div>
						<div class="empty-info">
							<p class="text-center">There's Is A Problem, or Not Found Country, City</p>
						</div>
					</div>`;

		console.log(err);
		cardMap.classList.remove("show");
		document.querySelector(".card_weather .part_info .container_result_info").innerHTML = content;
	});
}




// Function Return C celsius | Or | F fahrenheit degree of ( °C ) or ( °F ) v2.0
function getTemp(K, state = 'f'){
	if(state === 'c') {
		return Math.floor(K - 273.15);
	} else if(state === 'f'){
		let celsiusTemp = Math.floor(K - 273.15);
		return Math.ceil((celsiusTemp * 1.8) + 32);
	} else{ return; }
}

// Function To Put The Format of Time From Any Date With ( Hours | Minutes ) With pm or am
function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}

// Function Dragging The Hourly Forecast
function draggingShow(){
	const tabsBox = document.querySelector(".hourly_forecast .scroll_content_forecs"),
	allTabs = document.querySelectorAll(".hourly_forecast .scroll_content_forecs .fore");

	let isDragging = false;

	const dragging = (e)=> {
		if(!isDragging)return;
		tabsBox.classList.add("dragging");
		tabsBox.scrollLeft -= e.movementX;
		// handleIcons();
	}

	const dragStop = ()=> {
		isDragging = false;
		tabsBox.classList.remove("dragging");
	}

	tabsBox.addEventListener('mousedown', ()=> isDragging = true);
	tabsBox.addEventListener('mousemove', dragging);
	document.addEventListener('mouseup', dragStop);
}


// Function To Add The Background Styles
function backStyle(varia, value) {
	varia.style.background = value;
	varia.style.backgroundRepeat = 'no-repeat';
	varia.style.backgroundSize = 'cover';
}


// Function To Change Location In Map With ( Latitude, Longitude ) OF City
function setLocationMap(lat, lon) {

	var marker = L.marker([lat, lon]).addTo(map);
	var popup = L.popup()
    .setLatLng([lat, lon])
    .setContent(`Latitude: ${lat}, Longitude: ${lon}`)
    .openOn(map);

}