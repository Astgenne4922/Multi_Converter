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
	for (let i = 0; i < 2; i++) {
		let innHtml = document.createElement("select");
		innHtml.classList.add("ConvertionKeys");
		let sel = parseInt(e.path[0].id); // per Switch
		let inSelect;
		let opsValues = Object.entries(ops)[sel][1][0]; // insieme dei valori in base al tipo di conversione
		let opsKey = Object.entries(ops)[sel][1][1]; // insieme delle chiavi in base al tipo di conversione

		opsValues.forEach((element, idx) => {
			inSelect = document.createElement("option");
			inSelect.setAttribute("value", opsKey[idx]);
			inSelect.innerText = element;
			innHtml.appendChild(inSelect);
		});
		if (i === 1) createTextbox();
		document.getElementById("body").appendChild(innHtml);
		if (i === 0) createTextbox();
	}
}
//#endregion
let liTags = [...document.getElementsByTagName("li")];
liTags.map(value => value.addEventListener("click", createSelect));
liTags[liTags.length - 1].removeEventListener("click", createSelect);
liTags[liTags.length - 2].removeEventListener("click", createSelect);

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
