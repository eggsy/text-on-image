import { join } from "path";

export const getBaseDirectory = (path?: string) => {
  return join(process.cwd(), path || "");
};
