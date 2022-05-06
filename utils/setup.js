import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync, writeFileSync, mkdirSync } from "fs";
import chalk from "chalk";
import { exit } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIRECTORY_NAME = join(__dirname, "..", "data");
const SETS_DIRECTORY_NAME = join(DATA_DIRECTORY_NAME, "sets");
const CONTENTS_FILE_NAME = join(DATA_DIRECTORY_NAME, "contents.json");

// This function ensures that all needed directories and files exist
const setup = () => {
  try {
    // ensure that data and data/sets directories exist
    if (!existsSync(SETS_DIRECTORY_NAME)) {
      mkdirSync(SETS_DIRECTORY_NAME, { recursive: true });
    }

    // create contents.json if it doesn't exist
    if (!existsSync(CONTENTS_FILE_NAME)) {
      writeFileSync(CONTENTS_FILE_NAME, JSON.stringify([]));
    }
  } catch {
    console.log(chalk.red("There was an error!"));
    exit(1);
  }
};

export default setup;
