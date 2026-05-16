"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// index.ts
var fs = __toESM(require("fs"));
var os = __toESM(require("os"));
var path = __toESM(require("path"));
var args = process.argv;
var myArgs = args.slice(2);
var words = myArgs.filter((arg) => !arg.startsWith("-"));
function createFile(words2) {
  const title = words2.join(" ");
  let slug = title.toLowerCase().replaceAll(" ", "-");
  [":", ";", ".", ",", "?", "!"].forEach((char) => {
    slug = slug.replaceAll(char, "");
  });
  const file = slug + ".md";
  const now = new Date(Date.now());
  const date = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}.${now.getFullYear()}`;
  const outputDir = path.join(os.homedir(), "Documents/GitHub/pro-portfolio/static/thoughts");
  const outputFilePath = path.join(outputDir, file);
  fs.writeFile(outputFilePath, "# " + title, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("Markdown file written successfully!");
  });
  const dataFilePath = path.join(process.cwd(), "src/lib/data.ts");
  const dataFile = fs.readFileSync(dataFilePath, "utf8");
  const newThoughtEntry = `	{
		href: '${slug}',
		date: '${date}',
		content: '${file}'
	}`;
  const updatedDataFile = dataFile.replace(
    /(export const thoughts: thoughtType\[\] = \[[\s\S]*?)(\n\];)/,
    `$1,
${newThoughtEntry}$2`
  );
  fs.writeFile(dataFilePath, updatedDataFile, "utf8", (err) => {
    if (err) {
      console.error("Error writing data file:", err);
      return;
    }
    console.log("Thought added to src/lib/data.ts");
  });
}
if (words.length > 0) {
  createFile(words);
} else {
  console.log("type the name of the thought");
}
