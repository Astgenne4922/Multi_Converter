"use strict";

let options = ["Currency", "Data", "Lenght", "Temperature", "Weight", "Volume", "Area", "Time"];
let ops = {
	Currency: [Object.values(currency), Object.keys(currency)],
	Data: [Object.values(data), Object.keys(data)],
	Lenght: [Object.values(length), Object.keys(length)],
	Temperature: [Object.values(temperature), Object.keys(temperature)],
	Weight: [Object.values(weight), Object.keys(weight)],
	Volume: [Object.values(volume), Object.keys(volume)],
	Area: [Object.values(area), Object.keys(area)],
	Time: [Object.values(time), Object.keys(time)],
};

let select = `<select class="ConvertionKeys">\n</select>\n`
let textbox = `<input type="text" class="textbox" value="0">`

let createHtml = `<h2 id="Type">Currencies</h2>\n
	${select}
	${textbox}
	<img src="../img/exchange.png">\n
	${textbox}
	${select}`
document.getElementById("body").innerHTML = createHtml

let inputs = [...document.getElementsByTagName("input")]
inputs.forEach(element => {
	setInputFilter(element, v => /^\d*\.?\d*$/.test(v));
});

let img = [...document.getElementsByTagName("img")][0]
img.addEventListener("click", exchange)

let setOptions = (event) => {
	document.getElementById("Type").innerText = event.path[0].innerHTML;

	let selects = [...document.getElementsByTagName("select")]

	let sel = parseInt(e.path[0].id);
	let opsValues = Object.entries(ops)[sel][1][0]; // insieme dei valori in base al tipo di conversione
	let opsKey = Object.entries(ops)[sel][1][1]; // insieme delle chiavi in base al tipo di conversione
	selects.forEach(element => {
		element.innerHTML = ""
		opsValues.forEach((el, idx) => {
			let inSelect = document.createElement("option");
			inSelect.setAttribute("value", opsKey[idx]);
			inSelect.innerText = el;
			element.appendChild(inSelect);
		});
	});
}
/*
function createTextbox() {
	let el = document.createElement("input");
	el.type = "text";
	el.value = "0";
	el.classList.add("textbox")
	setInputFilter(el, v => /^\d*\.?\d*$/.test(v));
	document.getElementById("body").appendChild(el);
}
//#region create select for type
function createSelect(e) {
	document.getElementById("Type").innerText = e.path[0].innerHTML;
	console.log(document.getElementsByClassName("ConvertionKeys"));
	let selectss = [...document.getElementsByClassName("ConvertionKeys")];
	selectss.length > 0 ? selectss.map(value => value.remove()) : "";
	let textss = [...document.getElementsByClassName("textbox")];
	textss.length > 0 ? textss.map(value => value.remove()) : "";
	document.getElementById("Container")?.remove()
	for (let i = 0; i < 2; i++) {
		let innHtml = document.createElement("select");
		innHtml.classList.add("ConvertionKeys");
		let sel = parseInt(e.path[0].id); // per Switch
		let inSelect;
		let opsKey = Object.entries(ops)[sel][1][1]; // insieme delle chiavi in base al tipo di conversione

		opsValues.forEach((element, idx) => {
			inSelect = document.createElement("option");
			inSelect.setAttribute("value", opsKey[idx]);
			inSelect.innerText = element;
			innHtml.appendChild(inSelect);
		});
		if (i === 1) createTextbox();
		document.getElementById("body").appendChild(innHtml);
		if (i === 0) {
			createTextbox();
			let img = document.createElement("img");
			img.src = "../img/exchange.png"
			img.addEventListener("click", exchange)
			let cont = document.createElement("div");
			cont.id = "Container"
			cont.appendChild(img)
			document.getElementById("body").appendChild(cont);
		}
	}
}*/
//#endregion
let liTags = [...document.getElementsByTagName("li")];
liTags.map(value => value.addEventListener("click", setOptions));
liTags[liTags.length - 1].removeEventListener("click", setOptions);
liTags[liTags.length - 2].removeEventListener("click", setOptions);

//#region Hamburger

function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("body").style.marginLeft = "250px";
	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("body").style.marginLeft = "0";
	document.body.style.backgroundColor = "white";
}

// #endregion
document.querySelector("li").click();

function exchange(e) {
	let selectsss = [...document.getElementsByTagName("select")]
	console.log(selectsss)
	let selectValue = [selectsss[0].selectedIndex, selectsss[1].selectedIndex ]
	selectsss[0].selectedIndex = selectValue[1]
	selectsss[1].selectedIndex = selectValue[0]

}
