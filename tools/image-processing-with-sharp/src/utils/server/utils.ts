import path from "path";
import { IMAGES_DIR, LIONS_DIR, OUTPUT_DIR, SCALED_DIR } from "../constants";
import { existsSync, mkdirSync } from "fs";

export function getImageFullPathInImagesDir(filePathRelative: string): string {
  return path.join(getImagesDirInPublic(), filePathRelative);
}

export function getImagesDirInPublic(): string {
  return path.join(process.cwd(), "public", IMAGES_DIR);
}

export function getScaledImagesDirInPublic(): string {
  return path.join(process.cwd(), "public", IMAGES_DIR, SCALED_DIR);
}

export function getImagePathInLionsDir(imageFileNmae: string): string {
  return path.join(
    process.cwd(),
    "public",
    IMAGES_DIR,
    LIONS_DIR,
    imageFileNmae
  );
}

export function getExistingOutputDir(): string {
  const dir = path.join(process.cwd(), OUTPUT_DIR);

  // Create the directory if it doesn't exist
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  return dir;
}

export function getImagePathInOutputDir(imageFileNmae: string): string {
  return path.join(getExistingOutputDir(), imageFileNmae);
}
