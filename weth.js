
// All Variables
const selectBoxLang = document.getElementById("lang-select");
let input = document.getElementById("search");


// option variables
const apiKey = "c5b938c99e40b31dd1f5ae5aad327606";
let apiLang;

selectBoxLang.onchange = () => {
	const res = getapi('cairo', selectBoxLang.value).then(data =>  {
		console.log(data);
		return data;
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

/* Function Multiple fetches data from ( openweather ) website v1.2
*/


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

// Calling that async function
const res = getapi('cairo', 'ar').then(data =>  {
	console.log(data);
	return data;
})

// Function to define innerHTML for HTML table
function show(data) {
//     let tab =
//         `<tr>
//           <th>Name</th>
//           <th>Office</th>
//           <th>Position</th>
//           <th>Salary</th>
//          </tr>`;

//     // Loop to access all rows
//     for (let r of data.list) {
//         tab += `<tr>
//     <td>${r.name} </td>
//     <td>${r.office}</td>
//     <td>${r.position}</td>
//     <td>${r.salary}</td>
// </tr>`;
//     }
//     // Setting innerHTML as tab variable
//     document.getElementById("employees").innerHTML = tab;
}




/* Function Return C celsius | Or | F fahrenheit degree of ( °C ) or ( °F ) v2.0
** K = the origin degree [Example, 281.49]
** degF = accept string value { 'c' | 'f' } else will not work the function
** Real Example >>> console.log(Ktoc(290.05, 'f')) >> 61 °F
*/
async function Ktoc(K, degF = 'c'){
	if(degF === 'c') {
		return Math.floor(K - 273.15);
	} else if(degF === 'f'){
		let celsiusTemp = Math.floor(K - 273.15);
		return  Math.ceil((celsiusTemp * 1.8) + 32);
	} else { return; }
}



// Dragging The Hourly Forecast --------------------------

const tabsBox = document.querySelector(".hourly_forecast .scroll_content_forecs"),
allTabs = document.querySelectorAll(".hourly_forecast .scroll_content_forecs .fore");
// arrowIcons = document.querySelectorAll("header .icon span");

let isDragging = false;

// const handleIcons = ()=> {
//     let scrollVal = Math.round(tabsBox.scrollLeft);
//     let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
//     arrowIcons[0].parentElement.style.display = scrollVal > 0 ? 'flex': 'none';
//     arrowIcons[1].parentElement.style.display = maxScrollableWidth > scrollVal ? 'flex': 'none';
// }

// arrowIcons.forEach(icon => {
//     icon.addEventListener('click', ()=> {
//         // if clicked Icon is left, reduce 350 from tabsBox scrollLeft else add
//         tabsBox.scrollLeft += icon.id === 'left'? -350: 350;
//         setTimeout(()=> handleIcons(), 50); // calling handleIcons after 50 milliseconds
//     })
// })

// allTabs.forEach(tab => {
//     tab.addEventListener('click', ()=> {
//         // removing active class from the previous tab & adding to current clicked tab
//         document.querySelector(".tabs_box .active").classList.remove("active");
//         tab.classList.add("active");

//         let eleShowClass = document.querySelector("#app .big_content.show");
//         let eleTabClass = document.querySelector(`#app .big_content.${tab.dataset.class}`);
//         if(eleShowClass !== null && eleTabClass !== null){
//             eleShowClass.classList.remove("show");
//         }
//         if(eleTabClass !== null){
//             setTimeout(()=> eleTabClass.classList.add("show"), 500);
//         }

//         // change the Page Title With Another Form
//         if(tab.dataset.class == 'games') document.title = 'Join Our( W.D )World';
//         if(tab.dataset.class == 'bootst') document.title = 'World Faster With Bootstrap';
//     })
// })

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
