import inquirer from "inquirer";
import chalk from "chalk";
import importWizard from "./importWizard.js";
import { getSetDataById, getSets } from "./store/store.js";
import { exit } from "process";

const openSet = async () => {
  const sets = getSets();

  if (sets.length == 0) {
    console.log(
      chalk.cyanBright(
        "You don't have any set created. Let's get started by importing the first set."
      )
    );
    return await importWizard();
  }

  // generate choices - existing sets + option to create one
  let choices = [
    ...sets.map((element) => {
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

  const setIdPrompt = await inquirer.prompt({
    name: "set",
    message: "Which set would you like to learn?",
    type: "list",
    choices: choices,
  });

  if (setIdPrompt.set) {
    try {
      const set = getSetDataById(setIdPrompt.set);
      return {
        id: setIdPrompt.set,
        set: set,
      };
    } catch {
      console.log(
        chalk.red("There was an error! We couldn't open this set :(")
      );
      exit(1);
    }
  } else {
    return await importWizard();
  }
};

export default openSet;
