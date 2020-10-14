let options = [ "Values", "Data"  , "Lenght", "Temperature", 
                "Weight", "Volume", "Area"  , "Time"];
let innHtml = `<h1>Coverter of Candido and Fornari</h1>\n`;
options.forEach(element => {
	innHtml += `<div id="${element}">\n
		<h2>${element}</h2>\n
		
		<div>\n
			<label class="inp" for="${element}">Importo</label>\n
			<input type="text" name="" class="inp" id="${element}">\n
		</div>\n
		<div>\n
			<label class="inp" for="${element}">Da</label>\n
			<input type="text" name="" class="inp" id="${element}">\n
		</div>\n
		<div>\n
			<label class="inp" for="${element}">A</label>\n
			<input type="text" name="" class="inp" id="${element}">\n
		</div>\n
	</div>\n`
});
document.getElementById("body").innerHTML = innHtml;