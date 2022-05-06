import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
import { exit } from "process";
import Papa from "papaparse";
import { createSet } from "./store/store.js";

const getFileContent = (path) => {
  try {
    const data = fs.readFileSync(path, "utf8");
    return data;
  } catch (e) {
    console.log(
      chalk.red("\nThere was an error. Make sure file exists and try again\n")
    );
    exit(1);
  }
};

async function importWizard() {
  console.log(
    chalk.cyanBright(
      "\nPrepare a file in which terms and definitions are separated by tabs (TSV)\n"
    )
  );

  const newSetPrompt = await inquirer.prompt([
    {
      name: "path",
      message: "TSV file location (full path)",
      type: "input",
    },
    {
      name: "name",
      message: "New set name",
      type: "input",
    },
  ]);

  // process data
  const fileData = getFileContent(newSetPrompt.path);
  const parsedFileData = Papa.parse(`term\tdefinition\n${fileData}`, {
    header: true,
    delimiter: "\t",
    skipEmptyLines: true,
  }).data;

  const setData = parsedFileData.map((element) => {
    return {
      ...element,
      score: 0,
      sumOfWeights: 0,
      lastShownInSession: false,
      streak: 0,
    };
  });

  const setId = createSet(newSetPrompt.name, setData);

  return {
    id: setId,
    data: setData,
  };
}

export default importWizard;
