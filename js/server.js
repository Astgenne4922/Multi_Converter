const http = require("http");
let fs = require("fs");
const path = require("path");

function requestHandler(req, res) {
	let filePath = "." + req.url;

	//case home
	if (filePath === "./") {
		filePath = "./index.html";
    }
    
	const extname = path.extname(filePath);
	let extnameNoPoint = extname.split("").splice(1).join("");
    
    /*  Same as a switch statement but shorter

        var =                               |   switch(check){
            {                               |       case key:
                key : value,                |           var = value;
                ...                         |           break;
            }[check] || defaultValue;       |       ...
                                            |       default:
                                            |           var = defaultValue;
                                            |           break;
                                            |   }
    */
    let contentType =
		{
			".html": `text/${extnameNoPoint}`,
			".htm": `text/${extnameNoPoint}`,
			".css": `text/${extnameNoPoint}`,
			".jpeg": `image/${extnameNoPoint}`,
			".jfif": `image/${extnameNoPoint}`,
			".png": `image/${extnameNoPoint}`,
			".jpg": `image/${extnameNoPoint}`,
			".js": "text/javascript",
			".json": "application/json",
		}[extname] || "text/plain";

	fs.readFile(filePath, function (error, data) {
		if (error) {
			res.writeHead(404);
		} else {
			res.writeHead(200, { "content-Type": contentType });
			res.write(data, "utf8");
		}
		res.end();
	});
}

const server = http.createServer(requestHandler);
server.listen(3000);
