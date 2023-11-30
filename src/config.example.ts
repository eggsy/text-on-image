import type { Config } from "./types/config";

const config: Config = {
  outputDirectory: "./output",

  image: {
    path: "./image.png",
    fileName: "Ticket {1}.png",
    amount: 400,
    sizes: {
      // sizes of the actual image
      width: 595,
      height: 210.5,
    },
  },

  text: {
    align: "left",
    position: {
      x: 116,
      y: 203,
    },
  },

  pdf: {
    sizes: {
      // sizes of an A4 paper
      width: 595,
      height: 842,
    },
    positions: [0, 210.5, 421, 631.5],
  },
};

export default config;