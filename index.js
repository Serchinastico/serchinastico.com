import ejs from "ejs";
import YAML from "yaml";
import fs from "fs";

const toMap = (list, keyFn, contentFn) =>
  list.reduce(function (acc, item) {
    if (acc[keyFn(item)] === undefined) {
      acc[keyFn(item)] = contentFn(item);
    }
    return acc;
  }, {});

const styleFileNames = fs.readdirSync("static/style");
const styleFiles = styleFileNames.map((fileName) => `static/style/${fileName}`);

const scriptFileNames = fs.readdirSync("static/js");
const scriptFiles = scriptFileNames.map((fileName) => `static/js/${fileName}`);

const dataFileNames = fs.readdirSync("data");
const dataArray = dataFileNames
  .map((fileName) => `data/${fileName}`)
  .map((fileName) => ({
    key: fileName.replace("data/", "").replace(".yaml", ""),
    content: YAML.parse(fs.readFileSync(fileName, "utf-8")),
  }));

const data = toMap(
  dataArray,
  (item) => item.key,
  (item) => item.content
);

const template = fs.readFileSync("template.ejs.html", "utf-8");
const contents = ejs.render(template, { styleFiles, scriptFiles, data });
fs.writeFileSync("index.html", contents);
