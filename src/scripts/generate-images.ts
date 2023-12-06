import { createCanvas, loadImage } from "canvas";
import { yellow } from "ansi-colors";
import { writeFileSync } from "fs";
import { Listr } from "listr2";
import { ListrEnquirerPromptAdapter } from "@listr2/prompt-adapter-enquirer";

// Scripts
import GeneratePdf from "./generate-pdf";

// Functions
import { removeDirectory } from "../functions/removeDirectory";
import { getOutputDirectory } from "../functions/getOutputDirectory";
import { getBaseDirectory } from "../functions/getBaseDirectory";

// Config
import config from "../config";

// Types
import type { Canvas, Image, CanvasRenderingContext2D } from "canvas";

interface Ctx {
  canvas: {
    self: Canvas;
    ctx: CanvasRenderingContext2D;
  };
  outputDirectory: string;
  image: Image;
  skip: boolean;
}

let pdfSaved = false;

// Tasks
const tasks = new Listr<Ctx>([
  {
    title: "Clear and create output directory",
    task: (_, task) => {
      removeDirectory(config.outputDirectory, true);
      task.title = "Recreated output directory";
    },
  },
  {
    title: "Starting image manipulation...",
    task: (context, t) => {
      return t.newListr([
        {
          title: "Creating canvas...",
          task: async (_, task) => {
            const canvas = createCanvas(
              config.image.sizes.width,
              config.image.sizes.height
            );
            const ctx = canvas.getContext("2d");

            /* Get the absolute path of output directory and image */
            const outputDirectory = getOutputDirectory();
            const imageFile = getBaseDirectory(config.image.path);

            /* Load target image and start generating images */
            const image = await loadImage(imageFile);

            /* Apply values to Listr context */
            context.canvas = {
              self: canvas,
              ctx,
            };

            context.outputDirectory = outputDirectory;
            context.image = image;

            task.title = "Created canvas";
          },
        },
        {
          title: "Generating images...",
          task: (_, task) => {
            const amount = config?.image?.amount || 0;

            for (let i = 1; i < amount + 1; i++) {
              /* Get values from Listr context */
              const { ctx, self: canvas } = context.canvas;
              const { image, outputDirectory } = context;

              const coloredText = yellow(`${i + 1}/${amount}`);
              task.title = `Generating images (${coloredText})...`;

              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

              if (typeof config.text.position === "object") {
                ctx.font = `${config.text.size || "24"}px Inter black`;
                ctx.fillStyle = config.text?.color ?? "white";
                ctx.textAlign = config.text?.align ?? "left";

                ctx.fillText(
                  `${config.text?.prefix ?? ""}${i}${
                    config.text?.suffix ?? ""
                  }`,
                  config.text.position.x,
                  config.text.position.y
                );
              }

              writeFileSync(
                `${outputDirectory}/${config.image.fileName.replace(
                  "{1}",
                  String(i)
                )}`,
                canvas.toBuffer()
              );

              ctx.clearRect(
                canvas.height,
                canvas.width,
                canvas.width,
                canvas.height
              );
            }

            task.title = `Created and saved ${amount} images`;
            t.title = "Finished image manipulation";
          },
        },
      ]);
    },
  },
  {
    title: "Finishing...",
    task: async (_, t) => {
      return t.newListr([
        {
          title: "Save to PDF?...",
          task: async (__, task) => {
            const prompt = task.prompt(ListrEnquirerPromptAdapter);

            const savePdf = await prompt.run<boolean>({
              type: "Confirm",
              message: "Save to PDF?",
            });

            pdfSaved = savePdf;

            if (savePdf === true) {
              await GeneratePdf.run();
              task.title = "Saved PDF file";
            }
          },
        },
        {
          title: "Delete output directory?",
          task: async (__, task) => {
            if (!pdfSaved) {
              task.skip();
              return;
            }

            const prompt = task.prompt(ListrEnquirerPromptAdapter);

            const removeOutput = await prompt.run<boolean>({
              type: "Confirm",
              message: "Delete output directory?",
            });

            if (removeOutput) {
              removeDirectory(config.outputDirectory);
              task.title = "Deleted output directory";

              t.title = "Finished all tasks";
            }
          },
        },
      ]);
    },
  },
]);

const run = async () => {
  try {
    await tasks.run();
  } catch (e) {
    console.error(e);
  }
};

export default {
  run,
};
