//#region Imports
import express from "express";
import favicon from "serve-favicon";
import { createWriteStream } from "fs";
import morgan from "morgan";
import helmet from "helmet";
import { join, resolve } from "path";
//#endregion Imports

//#region Constants
const __dirname = resolve();
const app = express();
//#endregion Constants

//#region App settings
app.set("port", process.env.PORT || 3000)
	.set("appName", "Multi Converter")
	//#endregion App settings
	//#region Middleware settings
	.use(morgan("common", { stream: createWriteStream(join(__dirname, "access.log"), { flags: "a" }) }))
	.use(helmet())
	.use(favicon(join(__dirname, "/public/favicon.ico")))
	.use(express.static(join(__dirname, "public")))
	//#endregion Middleware settings
	//#region Rounting settings
	.get("/", (_req, res) => res.sendFile(join(__dirname, "/public/index.html")))
	.use("*", (_req, res, _next) => res.status(404).send("Page not Found"));
//#endregion Rounting settings

app.listen(app.get("port"), () => console.log("Starting Server..."));
