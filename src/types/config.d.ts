import type { CanvasGradient, CanvasPattern } from "canvas";

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
    align: "left" | "center" | "right";
    prefix?: string;
    suffix?: string;
    size?: number;
    color?: string | CanvasGradient | CanvasPattern;
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
