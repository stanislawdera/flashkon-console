#! /usr/bin/env node

import openSet from "./utils/openSet.js";
import setup from "./utils/store/setup.js";

// Say hello
console.clear();
console.log("Welcome to Flashkon!");

// Ensure that all needed directories and files exist
setup();

// Ask a user for the set they want to learn
console.log(await openSet());
