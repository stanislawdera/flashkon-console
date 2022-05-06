import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const DATA_DIRECTORY_NAME = join(__dirname, "..", "..", "data");
export const SETS_DIRECTORY_NAME = join(DATA_DIRECTORY_NAME, "sets");
export const CONTENTS_FILE_NAME = join(DATA_DIRECTORY_NAME, "contents.json");
