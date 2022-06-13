import { readdirSync } from "fs";
import { getOutputDirectory } from "./getOutputDirectory";

export const getSortedDirectory = () => {
  const outputDirectory = getOutputDirectory();
  const files = readdirSync(outputDirectory);

  return files.sort((a, b) => {
    const [aExtension] = a.match(/\..*/g) || [a];
    const [bExtension] = b.match(/\..*/g) || [b];

    const [[aMatch], [bMatch]] = [
      a.replace(aExtension, "").match(/\d+$/g) || [a],
      b.replace(bExtension, "").match(/\d+$/g) || [b],
    ];

    const aNumber = parseInt(aMatch);
    const bNumber = parseInt(bMatch);

    return aNumber - bNumber;
  });
};

export default getSortedDirectory;
