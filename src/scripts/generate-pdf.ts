import { createCanvas, loadImage } from "canvas";
import { unlinkSync, existsSync, writeFileSync } from "fs";

// Functions
import { getSortedDirectory } from "../functions/getSortedDirectory";
import { getOutputDirectory } from "../functions/getOutputDirectory";
import { getBaseDirectory } from "../functions/getBaseDirectory";

// Config
import config from "../config";

const run = async (fileName?: string) => {
  const canvas = createCanvas(
    config.pdf.sizes.width,
    config.pdf.sizes.height,
    "pdf"
  );
  const ctx = canvas.getContext("2d");

  const outputDirectory = getOutputDirectory();
  const directory = getSortedDirectory();

  if (directory.length < 1) {
    process.exit(1);
  }

  const baseDirectory = getBaseDirectory();
  const positions = config.pdf.positions;

  const fName = fileName ?? "All Files";
  const filePath = `${baseDirectory}/${fName}.pdf`;

  let positionIndex = 0;
  let index = 0;

  for (const file of directory) {
    const image = await loadImage(`${outputDirectory}/${file}`);

    ctx.drawImage(image, 0, positions[positionIndex]);

    positionIndex++;
    if (positionIndex === 4) {
      ctx.addPage();
      positionIndex = 0;
    }

    if (directory.length === index + 1) {
      if (existsSync(filePath)) unlinkSync(filePath);
      writeFileSync(filePath, canvas.toBuffer());
    }

    index++;
  }

  return true;
};

export default {
  run,
};
