
import * as path from "path";

export function stripExtension(filepath: string) {
  const basename = path.basename(filepath);
  const i = basename.indexOf('.');
  if (i === -1) {
    return basename;
  }
  if (i === 1) {
    return basename.substring(1);
  }
  return basename.substring(0, i);
}

