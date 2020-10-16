"use strict";

let options = ["Currency", "Data", "Lenght", "Temperature", 
				"Weight", "Volume", "Area"  , "Time"];
let ops = {
	Currency         : [Object.values(currency), Object.keys(currency)],
    Data        	 : [Object.values(data),Object.keys(data)],
	Lenght      	 : [Object.values(length), Object.keys(length)],
	Temperature 	 : [Object.values(temperature), Object.keys(temperature)],
	Weight           : [Object.values(weight), Object.keys(weight)],
	Volume           : [Object.values(volume), Object.keys(volume)],
	Area             : [Object.values(area), Object.keys(area)],
	Time             : [Object.values(time), Object.keys(time)],
}

// #region select for type of conversion TO HAMBURGER
let innHtml = `<select id = "TypeConversion" oninput="createSelect()">\n`;
options.forEach((element, idx) => {
	innHtml += `	<option id="${idx}" value="${element}">${element}</option>\n`;
});
innHtml += `</select>\n`
document.getElementById("body").innerHTML = innHtml
// #endregion

//#region create select for type 
function createSelect(){
	document.getElementById("ConvertionKeys")?.remove();	

	let innHtml = document.createElement("select");
	innHtml.id = "ConvertionKeys";
	let select = document.getElementById("TypeConversion")
	let sel = parseInt(select.options[select.selectedIndex].id) // per Switch
	let inSelect;
	let opsValues = Object.entries(ops)[sel][1][0]; // insieme dei valori in base al tipo di conversione
	let opsKey = Object.entries(ops)[sel][1][1];    // insieme delle chiavi in base al tipo di conversione

	opsValues.forEach((element, idx) => {
		inSelect = document.createElement("option")
		inSelect.setAttribute("value", opsKey[idx]);
		inSelect.innerText = element;
		innHtml.appendChild(inSelect)
	})
	document.getElementById("body").appendChild(innHtml);
}
//#endregion