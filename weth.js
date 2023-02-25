
// All Variables
const pMoreBtn = document.querySelector(".langContent p");

const selectBoxLang = document.getElementById("lang-select");

const input = document.getElementById("search");
const searchBtn = document.getElementById("btn-search");

const cardMap = document.querySelector(".card_weather .part_map");

let tempBtns = '';


// option variables
const apiKey = "c5b938c99e40b31dd1f5ae5aad327606";
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let apiLang = 'en', valueInput = '', tempC = 'f';

// All Changes To Show Weather Result On Page
// When Click On search button
searchBtn.addEventListener("click", ()=> {
	valueInput = input.value.toLowerCase();
	console.log(valueInput);
	show(getapi(valueInput, apiLang))
});

// When Click On [ Enter ] in Keyboard From Input Search
input.addEventListener("keyup", (event)=> {
    if(event.key == "Enter" || event.key == "enter") {
		valueInput = input.value.toLowerCase();
		console.log(valueInput);
        show(getapi(valueInput, apiLang));
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

// btn.onclick = () => {
//     fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&appid=${apiKey}`)
// 	.then(response => response.json())
// 	.then(data => {
// 		console.log(data);
// 		const temp = Ktoc(data.main.temp);
// 		out.innerHTML = `
// 		<h3>the weather of ${input.value}</h3>
// 		<h4><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" style="height: 3em" /> ${temp}°C</h4>
// 		<h4><img src="./assets/wind.png" style="width: 4.3em; height: 2.2em" /> ${data.wind.speed}km/h</h4>
// 		<h5>${data.weather[0].main}</h5>
// 		`;
// 		fetch("./sample.json").then(res => res.json())
// 		.then(imgsData => {
// 			const inputVa = document.getElementById("input").value;


// 			Object.keys(imgsData[0]).forEach((ind) => {
// 				if (ind === inputVa) {

// 					document.querySelector(".contain-weather").style.backgroundImage = `url(${imgsData[0][ind]})`;
// 					// document.querySelector(".contain-weather").style.borderRadius = "50%";
// 					document.querySelector(".input-choice label").style.display = "none";
// 					document.querySelector(".contain-weather").style.padding = `35px`;
// 					// document.querySelector(".contain-weather").style.height = `40%`;
// 					document.querySelector(".input-choice .btn").style.background = "transparent";
// 				} else {
// 					return false;
// 				}
// 			})
// 		})
// 		.catch(err => console.log(err))

// 	})
// 	.catch(err => {
// 		console.error(err);
// 		out.innerHTML =  `<p class="text-center"><q>this is not found</q></p>`
// 	});
// }



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
		console.log(res[1]);
		let fore = '';

		for(let i = 0; i < res[1].list.length; i++){
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
							<span>Sun, Feb26</span>
							<span>${res[1].list[i].weather[0].main}, ${res[1].list[i].weather[0].description}</span>
						</div>
						<div class="row collection-info-fore">
							<div class="col-6 col-md-6">
								<p>Feels Like <span>${getTemp(res[1].list[i].main.feels_like, tempC)}</span>°</p>
								<p>Sea Level <span class="material-symbols-outlined">waves</span><span>${res[1].list[i].main.sea_level}</span> in</p>
								<p>Humidity <span>${res[1].list[i].main.humidity}</span>%</p>
							</div>
							<div class="col-6 col-md-6">
								<p>Wind <span class="material-symbols-outlined">air</span><span>${res[1].list[i].wind.speed}</span>m/s N</p>
								<p>Visibility <span>${res[1].list[i].visibility.toLocaleString().substr(0, 4).replace(",", ".")}}</span>km</p>
								<p>Pressure <span>${res[1].list[i].main.pressure}</span>°</p>
							</div>
						</div>
					</div>`;
		}

		content = `<div class="row big_info_content">
						<div class="name-deg">
							<span>Feb 25, 06:18am</span>
							<h1>${res[0].name}, ${res[0].sys.country}</h1>
							<div class="content-info">
								<span>SUNRISE: 06:27am <span class="material-symbols-outlined">sunny_snowing</span></span>
								<span>SUNSET: 05:49pm <span class="material-symbols-outlined">wb_twilight</span></span>
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
	}).catch(err => {
		content = `<div class="empty_result">
						<div class="empty-img">
							<img src="https://static.thenounproject.com/png/4147389-200.png" alt="Weather Empty" />
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




/* Function Return C celsius | Or | F fahrenheit degree of ( °C ) or ( °F ) v2.0
** K = the origin degree [Example, 281.49]
** degF = accept string value { 'c' | 'f' } else will not work the function
** Real Example >>> console.log(Ktoc(290.05, 'f')) >> 61 °F
*/
function getTemp(K, state = 'f'){
	if(state === 'c') {
		return Math.floor(K - 273.15);
	} else if(state === 'f'){
		let celsiusTemp = Math.floor(K - 273.15);
		return Math.ceil((celsiusTemp * 1.8) + 32);
	} else{ return; }
}



// Dragging The Hourly Forecast --------------------------

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
