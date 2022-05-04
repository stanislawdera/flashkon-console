import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONTENTS_FILE_NAME = join(__dirname, "..", "data", "contents.json");

const checkIfContentsFileExists = () => {
  try {
    if (fs.existsSync(CONTENTS_FILE_NAME)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const getContents = () => {
  let contents = [];
  if (checkIfContentsFileExists())
    contents = JSON.parse(fs.readFileSync(CONTENTS_FILE_NAME));
  return contents;
};

const openSet = () => {
  const contents = getContents();
  console.log(JSON.stringify(contents));
};

export default openSet;
