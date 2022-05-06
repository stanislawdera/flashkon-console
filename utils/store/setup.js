import { CONTENTS_FILE_NAME, SETS_DIRECTORY_NAME } from "./constants.js";
import { existsSync, writeFileSync, mkdirSync } from "fs";
import chalk from "chalk";
import { exit } from "process";

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
