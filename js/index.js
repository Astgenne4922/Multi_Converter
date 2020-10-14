let options = [ "Values", "Data"  , "Lenght", "Temperature", 
                "Weight", "Volume", "Area"  , "Time"];

let innHtml = `<h1>Coverter of Candido and Fornari</h1>\n`;
options.forEach(element => {
        innHtml += `<div id="${element}">\n
        <h2>${element}</h2>\n
        </div>\n`
});
document.getElementById("body").innerHTML = innHtml;