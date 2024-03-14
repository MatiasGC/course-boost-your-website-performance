import sharp, { OutputInfo } from "sharp";
import { WEBP_EXTENSION } from "../constants";
import {
  appendWidthWHeightWToFileName,
  appendWidthWToFileName,
  ensureDirectoryExists,
  getAllFilesRecursively,
  replaceFileExtension,
} from "./gen-file-utils";
import { dirname, join, relative } from "path";
import IConvertAllResult from "./i-convert-all-result";
import IErrorFile from "./i-error-file";
import IFileOptions from "@/types/i-file-options";
import { existsSync, mkdirSync } from "fs";
import IExtendedOutputInfo from "@/types/i-extended-output-info";

/**
 * Go recuresively but skip existing webp files
 * Create directories on target if needed
 * @param sourceRootDirectory
 * @param targetRootDirectory
 */
export async function convertImagesFilesRecursivelyToWebP(
  sourceRootDirectory: string,
  targetRootDirectory: string
): Promise<IConvertAllResult> {
  const options: IFileOptions = {
    type: "ignored",
    extension: WEBP_EXTENSION,
  };
  const allFiles = getAllFilesRecursively(sourceRootDirectory, options);
  const res: IConvertAllResult = {
    numAllFile: allFiles.length,
    errorFiles: [],
    numFileConvertions: 0,
    sourceFilesFullPath: [],
    targetFilesFullPath: [],
  };

  for (const sourceFileFullPath of allFiles) {
    const relativePath = relative(sourceRootDirectory, sourceFileFullPath);
    const targetFileFullPath = join(
      targetRootDirectory,
      replaceFileExtension(relativePath, WEBP_EXTENSION)
    );

    ensureDirectoryExists(dirname(targetFileFullPath)); // Ensure the parent directory exists

    try {
      await convertToWebP(sourceFileFullPath, targetFileFullPath);
      res.sourceFilesFullPath.push(sourceFileFullPath);
      res.targetFilesFullPath.push(targetFileFullPath);
      res.numFileConvertions++;
    } catch (err) {
      const errorFile: IErrorFile = {
        fileNameSource: sourceFileFullPath,
        err,
      };
      res.errorFiles.push(errorFile);
    }
  }

  return res;
}

/**
 * scale all webp files in sourceRootDirectory recuresively
 * keep the directory tree
 * @param sourceRootDirectory
 * @param targetRootDirectory
 * @param scaleFactor
 * @returns
 */
export async function scaleWebPImagesFilesRecursively(
  sourceRootDirectory: string,
  targetRootDirectory: string,
  scaleFactor: number
): Promise<IConvertAllResult> {
  const options: IFileOptions = {
    type: "include",
    extension: WEBP_EXTENSION,
  };
  const allFiles = getAllFilesRecursively(sourceRootDirectory, options);
  const res: IConvertAllResult = {
    numAllFile: allFiles.length,
    errorFiles: [],
    numFileConvertions: 0,
    sourceFilesFullPath: [],
    targetFilesFullPath: [],
  };

  for (const sourceFileFullPath of allFiles) {
    try {
      const relativePath = relative(sourceRootDirectory, sourceFileFullPath);
      const targetFileFullPathBeforeFileChange = join(
        targetRootDirectory,
        relativePath
      );
      const targetDir = dirname(targetFileFullPathBeforeFileChange);

      if (!existsSync(targetDir)) {
        mkdirSync(targetDir, { recursive: true });
      }

      const { targetImageFullPath } = await scaleOneWithTargetName(
        sourceFileFullPath,
        scaleFactor,
        targetFileFullPathBeforeFileChange
      );

      res.sourceFilesFullPath.push(sourceFileFullPath);
      res.targetFilesFullPath.push(targetImageFullPath);

      res.numFileConvertions++;
    } catch (err) {
      const errorFile: IErrorFile = {
        fileNameSource: sourceFileFullPath,
        err,
      };
      res.errorFiles.push(errorFile);
    }
  }

  return res;
}

async function convertToWebP(
  inputImagePath: string,
  outputImagePath: string
): Promise<OutputInfo> {
  return sharp(inputImagePath).webp().toFile(outputImagePath);
}

export async function cropOneWithTargetName(
  sourceFileFullPath: string,
  newWidthPx: number,
  newHeightPx: number,
  targetFileFullPathBeforeNameChange: string
): Promise<IExtendedOutputInfo> {
  const targetImageFullPath = appendWidthWHeightWToFileName(
    targetFileFullPathBeforeNameChange,
    newWidthPx,
    newHeightPx
  );
  const outputInfo = await cropOne(
    sourceFileFullPath,
    newWidthPx,
    newHeightPx,
    targetImageFullPath
  );

  return { outputInfo, targetImageFullPath };
}

export async function cropOne(
  sourceFileFullPath: string,
  newWidthPx: number,
  newHeightPx: number,
  targetImageFullPath: string
): Promise<OutputInfo> {
  // Load the image, resize it, and save the cropped image
  return sharp(sourceFileFullPath)
    .resize(newWidthPx, newHeightPx, {
      fit: sharp.fit.cover,
      position: sharp.strategy.attention,
    })
    .toFile(targetImageFullPath);
}

export async function scaleOneWithTargetName(
  sourceFileFullPath: string,
  scaleFactor: number,
  targetFileFullPathBeforeNameChange: string
): Promise<IExtendedOutputInfo> {
  const { width } = await sharp(sourceFileFullPath).metadata();
  const newWidthPx = Math.round(width! * scaleFactor);
  const targetImageFullPath = appendWidthWToFileName(
    targetFileFullPathBeforeNameChange,
    newWidthPx
  );
  const outputInfo = await scaleOne(
    newWidthPx,
    sourceFileFullPath,
    targetImageFullPath
  );
  return { outputInfo, targetImageFullPath };
}

export async function scaleOne(
  newWidthPx: number,
  sourceImageFullPath: string,
  targetImageFullPath: string
): Promise<OutputInfo> {
  // Resize the image using sharp and await for the operation to finish
  return sharp(sourceImageFullPath)
    .resize({ width: Math.round(newWidthPx) })
    .toFile(targetImageFullPath);
}
