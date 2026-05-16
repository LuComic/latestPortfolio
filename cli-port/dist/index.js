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

// ../src/lib/data.ts
var thoughts = [
  {
    href: "peptides-and-sams-warning",
    date: "10.03.2026",
    content: "peptides.md"
  },
  {
    href: "best-series",
    date: "11.03.2026",
    content: "series.md"
  },
  {
    href: "running_and_dissociation",
    date: "11.03.2026",
    content: "dissociation.md"
  },
  {
    href: "frontend-unproductivity",
    date: "14.03.2026",
    content: "frontend-unproductivity.md"
  },
  {
    href: "why-i-like-twin-peaks-so-much",
    date: "19.03.2026",
    content: "why-i-like-twin-peaks-so-much.md"
  },
  {
    href: "taking-rare-chances",
    date: "20.03.2026",
    content: "taking-rare-chances.md"
  },
  {
    href: "explaining-as-an-idea",
    date: "22.03.2026",
    content: "explaining-as-a-pitch.md"
  },
  {
    href: "creating-and-testing-my-project",
    date: "10.05.2026",
    content: "creating-and-testing-my-project.md"
  }
];

// index.ts
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
  fs.writeFile(outputFilePath, "#" + title, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("File written successfully!");
  });
  const newThought = {
    href: slug,
    date,
    content: file
  };
  thoughts.push(newThought);
}
if (words.length > 0) {
  createFile(words);
} else {
  console.log("type the name of the thought");
}
