import { rmSync, mkdirSync } from "fs";
import { getBaseDirectory } from "./getBaseDirectory";

export const removeDirectory = (
  directoryName: string,
  recreate: boolean = false
) => {
  const targetDirectory = getBaseDirectory(directoryName);

  try {
    rmSync(targetDirectory, { recursive: true, force: true });
    if (recreate === true) mkdirSync(targetDirectory);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
