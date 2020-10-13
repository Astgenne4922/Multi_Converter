let options = [ "Values", "Data"  , "Lenght", "Temperature", 
                "Weight", "Volume", "Area"  , "Time"];
let createDiv = () => {
    options.forEach(element => {
        document.body.innerHTML(
            `<div id="${element}">
            <h2>${element}</h2>
            </div>`
        )
    });
}