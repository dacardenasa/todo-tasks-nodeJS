const fs = require("fs");

const pathFile = "./db/data.json";

function saveFile(data) {
  fs.writeFileSync(pathFile, JSON.stringify(data));
}

function readFile() {
  if (!fs.existsSync(pathFile)) {
    return null;
  }
  const info = fs.readFileSync(pathFile, { encoding: "utf-8" });
  const data = JSON.parse(info);
  return data;
}

module.exports = {
  saveFile,
  readFile
};
