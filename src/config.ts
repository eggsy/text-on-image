type WidthHeight = { width: number; height: number };

interface Config {
  outputDirectory: string;
  image: {
    path: string;
    fileName: string;
    amount: number;
    sizes: WidthHeight;
  };
  text: {
    position: {
      x: number;
      y: number;
    };
  };
  pdf: {
    sizes: WidthHeight;
    positions: number[];
  };
}

export default {
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
} as Config;
