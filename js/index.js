let options = ["Currency", "Data", "Lenght", "Temperature", "Weight", "Volume", "Area", "Time"];
let innHtml = `<h1>Coverter of Candido and Fornari</h1>\n
					<select name="Types" id="type">\n`;
options.forEach(element => (innHtml += `<option value="${element}">${element}</option>\n`));
innHtml += `</select>\n	
				<div>\n
					<ul>\n
						<li><label class="inp" for="importo">Importo</label></li>\n
						<li><input type="text" name="importo" class="inp"></li>\n
					</ul>\n
					<ul>\n
						<li><label class="inp" for="da">Da</label></li>\n
						<li><input type="text" name="da" class="inp"></li>\n
					</ul>\n
					<img src="img/exchange.png" alt="">
					<ul>\n
						<li><label class="inp" for="a">A</label></li>\n
						<li><input type="text" name="a" class="inp"></li>\n	
					</ul>\n
					<ul>\n
						<li><label class="inp" for="importo">Importo</label></li>\n
						<li><input type="text" name="importo" class="inp"></li>\n
					</ul>\n
				</div>\n`;
document.getElementById("body").innerHTML = innHtml;
