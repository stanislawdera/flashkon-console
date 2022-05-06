import { DATA_DIRECTORY_NAME, CONTENTS_FILE_NAME } from "./constants.js";
import fs from "fs";
import { join } from "path";
import { v4 as uuid } from "uuid";

export const getSets = () => {
  return JSON.parse(fs.readFileSync(CONTENTS_FILE_NAME));
};

export const getSetDataById = (id) => {
  const setPath = join(DATA_DIRECTORY_NAME, "sets", `${id}.json`);
  return JSON.parse(fs.readFileSync(setPath));
};

export const createSet = (name, setData) => {
  const newSetId = uuid();

  fs.writeFileSync(
    join(DATA_DIRECTORY_NAME, "sets", `${newSetId}.json`),
    JSON.stringify(setData)
  );

  fs.writeFileSync(
    CONTENTS_FILE_NAME,
    JSON.stringify([
      {
        name: name,
        id: newSetId,
      },
      ...getSets(),
    ])
  );

  return newSetId;
};
