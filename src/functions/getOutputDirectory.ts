import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import config from "../config";

export const getOutputDirectory = () => {
  const path = config.outputDirectory;
  const outputDirectory = join(process.cwd(), path);

  if (!existsSync(outputDirectory)) mkdirSync(outputDirectory);

  return outputDirectory;
};
