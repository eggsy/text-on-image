interface Config {
  outputDirectory: string;
  image: {
    path: string;
    fileName: string;
    amount: number;
  };
  text: {
    position: {
      x: number;
      y: number;
    };
  };
  pdf: {
    positions: number[];
  };
}

export default {
  outputDirectory: "./output",

  image: {
    path: "./image.png",
    fileName: "Bilet {1}.png",
    amount: 400,
  },

  text: {
    position: {
      x: 116,
      y: 203,
    },
  },

  pdf: {
    positions: [0, 210.5, 421, 631.5],
  },
} as Config;
