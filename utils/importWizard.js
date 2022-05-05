import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
import { exit } from "process";
import Papa from "papaparse";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFileContent = (path) => {
  try {
    const data = fs.readFileSync(path, "utf8");
    return data;
  } catch (e) {
    console.log(chalk.red("\nThere was an error reading file\n"));
    console.error(e);
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
  });

  // TODO: Save as JSON to data directory and update contents file
}

export default importWizard;
