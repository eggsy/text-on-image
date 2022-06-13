type WidthHeight = { width: number; height: number };

export interface Config {
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
