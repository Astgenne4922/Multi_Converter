let mySwiper = new Swiper(".swiper-container", {
	speed: 400,
	spaceBetween: 100,
});

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
//#endregion

//#region String template
let select = "<select class='ConvertionKeys' onchange='selectChange()'>\n</select>\n";
let textbox = "<input type='text' class='textbox' value='0'>";

let createHtml = `<h2 id="Type">Currency</h2>\n
					${select}
					${textbox}
					<img src="../img/exchange.png">\n
					${textbox}
					${select}`;
document.querySelector("#body").innerHTML = createHtml;
//#endregion

setInputFilter();
//#region aggiunge gli option al select
function setOptions(event) {
	document.getElementById("body").style.display = "block";
	document.getElementById("Help").style.display = "none";
	document.getElementById("ContactUs").style.display = "none"

	document.querySelector("#Type").innerText = event.path[0].innerHTML; // Cambia il testo dell'h2
	[...document.querySelectorAll("input[type='text']")].forEach(e => (e.value = "0")); //setta il valore iniziale della textbox a 0

	let selects = [...document.querySelectorAll("select")]; //prende tutti i select e li trasforma in array

	// path[1] = primo parente dell'elemento, 
	// findIndex = 1° elemento nell' array che soddisfa la funzione fornita,
	// isSameNode => controlla se e è lo stesso elemento di event.path[0]
	let sel = [...event.path[1].children].findIndex(e => e.isSameNode(event.path[0]));
	// insieme dei valori in base al tipo di conversione
	let opsValues = ops[sel];

	//#region aggiunta options ai Select
	selects.forEach(element => {
		element.innerHTML = "";
		opsValues.forEach(el => {
			let inSelect = document.createElement("option");
			inSelect.setAttribute("value", el[0]);
			inSelect.innerText = el[1];
			element.appendChild(inSelect);
		});
	});
	//#endregion

	selects[1].selectedIndex = 1; // inizializza il secondo select al secondo valore disponibile

	document.querySelector("#ham-menu").checked = false; // chiude l'hamburger menu
}
//#endregion

//#region creazione dei primi elementi dell'hamburger
let liTags = [];
titles.forEach(e => {
	let li = document.createElement("li");
	li.innerText = e;
	li.addEventListener("click", setOptions);
	liTags.push(li);
});
//#endregion

// inserisce tutti gli elementi di liTags prima del primo elemento dell'ul 
document.querySelector("ul").prepend(...liTags); 

// inizializza il primo elemento
document.querySelector("li").click(); 

//#region change value of Select
function exchange() {
	let selectsss = [...document.querySelectorAll("select")];
	let selectValue = [selectsss[0].selectedIndex, selectsss[1].selectedIndex];
	selectsss[0].selectedIndex = selectValue[1];
	selectsss[1].selectedIndex = selectValue[0];

	let texts = [...document.querySelectorAll("input[type='text']")];
	let textsVal = texts.map(i => i.value);
	texts[0].value = textsVal[1];
	texts[1].value = textsVal[0];
}
document.querySelector("img").addEventListener("click", exchange);
//#endregion

//#region creazione degli autori
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
document.getElementById("ContactUs").innerHTML = fornari + candido;
document.getElementById("ContactUs").style.display = "none";
document.getElementById("Help").style.display = "none";
//#endregion

//#region mostra l'help o il 
function Insert(e){
	document.getElementById("body").style.display = "none";
	document.querySelector("#ham-menu").checked = false;
	if(e.innerText === "Contact Us"){
		document.getElementById("Help").style.display = "none"
		document.getElementById("ContactUs").style.display = "table";
		return
	}
	document.getElementById("Help").style.display = "block"
	document.getElementById("ContactUs").style.display = "none";
}
//#endregion