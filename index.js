import ejs from "ejs";
import fs from "fs";

const styleFileNames = fs.readdirSync("static/style");
const styleFiles = styleFileNames.map((fileName) => `static/style/${fileName}`);

const scriptFileNames = fs.readdirSync("static/js");
const scriptFiles = scriptFileNames.map((fileName) => `static/js/${fileName}`);

const template = fs.readFileSync("template.ejs.html", "utf-8");
const contents = ejs.render(template, { styleFiles, scriptFiles });
fs.writeFileSync("index.html", contents);
