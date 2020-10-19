"use strict";

let ops = [
	Object.entries(currency),
	Object.entries(data),
	Object.entries(length),
	Object.entries(temperature),
	Object.entries(mass),
	Object.entries(volume),
	Object.entries(area),
	Object.entries(time),
];

let select = "<select class='ConvertionKeys' onchange='selectChange()'>\n</select>\n";
let textbox = "<input type='text' class='textbox' value='0'>";

let createHtml = `<h2 id="Type">Currency</h2>\n
	${select}
	${textbox}
	<img src="../img/exchange.png">\n
	${textbox}
	${select}`;
document.querySelector("#body").innerHTML = createHtml;

setInputFilter();

document.querySelector("img").addEventListener("click", exchange);

function setOptions(event) {
	document.querySelector("#Type").innerText = event.path[0].innerHTML;
	[...document.querySelectorAll("input[type='text']")].forEach(e => (e.value = "0"));

	let selects = [...document.querySelectorAll("select")];

	let sel = [...event.path[1].children].findIndex(e => e.isSameNode(event.path[0]));
	let opsValues = ops[sel]; // insieme dei valori in base al tipo di conversione
	selects.forEach(element => {
		element.innerHTML = "";
		opsValues.forEach(el => {
			let inSelect = document.createElement("option");
			inSelect.setAttribute("value", el[0]);
			inSelect.innerText = el[1];
			element.appendChild(inSelect);
		});
	});

	selects[1].selectedIndex = 1;

	document.querySelector("#ham-menu").checked = false;
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

let liTags = [];

titles.forEach(e => {
	let li = document.createElement("li");
	li.innerText = e;
	li.addEventListener("click", setOptions);
	liTags.push(li);
});

document.querySelector("ul").prepend(...liTags);

document.querySelector("li").click();

function exchange() {
	let selectsss = [...document.querySelectorAll("select")];
	console.log(selectsss);
	let selectValue = [selectsss[0].selectedIndex, selectsss[1].selectedIndex];
	selectsss[0].selectedIndex = selectValue[1];
	selectsss[1].selectedIndex = selectValue[0];

	let texts = [...document.querySelectorAll("input[type='text']")];
	let textsVal = texts.map(i => i.value);
	texts[0].value = textsVal[1];
	texts[1].value = textsVal[0];
}
