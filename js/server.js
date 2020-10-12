const http = require("http")
let fs = require("fs");
const path = require('path');

function requestHandler(req, res){
    let filePath = '.' + req.url;

    //case home
    if(filePath === './') {
        filePath = './index.html'
    }
    const extname = path.extname(filePath);
    let extnameNoPoint = extname.split("").splice(1).join("")
    let contentType;
    switch (extname) {
//#region 'text/...'
        case '.html':
        case '.htm':
        case '.css':
            contentType = `text/${extnameNoPoint}`
            break;
//#endregion
//#region 'image/...'
        case '.jpeg' :
        case '.jfif':
        case '.png':
        case '.jpg':
            contentType = `image/${extnameNoPoint}`
            break;
//#endregion
        case '.js':
            contentType = "text/javascript"
            break;
        case '.json':
            contentType = "application/json"
            break;
    }
    fs.readFile(filePath, function (error, data) {
        if (error) {
            res.writeHead(404);
        }
        else {
            res.writeHead(200, { "content-Type": contentType });
            res.write(data, "utf8");
        }
        res.end();
    });
}
const server = http.createServer(requestHandler);
server.listen(3000);



