import type { Config } from "./types/config";

const config: Config = {
  outputDirectory: "./output",

  image: {
    path: "./image.png",
    fileName: "Ticket A{1}.png",
    amount: 400,
    sizes: {
      // sizes of the actual image
      width: 595,
      height: 210.5,
    },
  },

  text: {
    prefix: "A",
    align: "right",
    color: "white",
    position: {
      x: 235,
      y: 392,
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
