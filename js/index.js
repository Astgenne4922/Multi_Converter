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
	document.getElementById("body").style.display = "block"
	document.getElementById("Help").style.display = "none";
	document.getElementById("Support").style.display = "none"
	document.querySelector("#Type").innerText = event.path[0].innerHTML;
	[...document.querySelectorAll("input[type='text']")].forEach(e => (e.value = "0"));

	let selects = [...document.querySelectorAll("select")];

	let sel = [...event.path[1].children].findIndex(e => e.isSameNode(event.path[0]));
	let opsValues = ops[sel]; // insieme dei valori in base al tipo di conversione
	selects.forEach(element => { // aggiunta options ai Select
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

function Author(cognome, nome, imgPath){
	let div =   `<div class="author">\n
    <img src="${imgPath}" class="element">\n
	<label class="element">${cognome}</label>\n
	<label class="element">${nome}</label>\n
</div>`
	return div;
}
let fornari = Author("Fornari", "Simone", "../img/FornariImage.jpg");
let candido = Author("Candido", "Daniele", "../img/CandidoImage.jpg");
document.getElementById("Support").innerHTML = fornari + candido;
document.getElementById("Support").style.display = "none";
document.getElementById("Help").style.display = "none";

function Insert(e){
	document.getElementById("body").style.display = "none";
	document.querySelector("#ham-menu").checked = false;
	if(e.innerText === "Contact Us"){
		document.getElementById("Help").style.display = "none"
		document.getElementById("Support").style.display = "table";
		return
	}
	document.getElementById("Help").style.display = "block"
	document.getElementById("Support").style.display = "none";
}
