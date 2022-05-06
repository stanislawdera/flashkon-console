import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
import { exit } from "process";
import importWizard from "./importWizard.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIRECTORY_NAME = join(__dirname, "..", "data");
const CONTENTS_FILE_NAME = join(DATA_DIRECTORY_NAME, "contents.json");

const getContents = () => {
  return JSON.parse(fs.readFileSync(CONTENTS_FILE_NAME));
};

const getSetById = (id) => {
  const setPath = join(DATA_DIRECTORY_NAME, "sets", `${id}.json`);

  try {
    return JSON.parse(fs.readFileSync(setPath));
  } catch {
    console.log(chalk.red("There was an error! We couldn't open this set :("));
    exit(1);
  }
};

const openSet = async () => {
  const contents = getContents();

  let choices = [
    ...contents.map((element) => {
      return {
        name: element.name,
        value: element.id,
      };
    }),
    {
      name: "Create a new set (import from tab-separated values)",
      value: false,
    },
  ];

  if (contents.length > 0) {
    const setIdPrompt = await inquirer.prompt({
      name: "set",
      message: "Which set would you like to learn?",
      type: "list",
      choices: choices,
    });

    if (setIdPrompt.set) {
      const set = getSetById(setIdPrompt.set);
      console.log(set);
    } else {
      importWizard();
    }
  } else {
    console.log(
      chalk.cyanBright(
        "You don't have any set created. Let's get started by importing the first set."
      )
    );
    importWizard();
  }
};

export default openSet;
