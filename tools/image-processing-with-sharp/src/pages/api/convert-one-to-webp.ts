// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { IImageFile } from "@/types/i-image-file";
import { getImageFullPathInImagesDir } from "@/utils/server/utils";
import { existsSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import StatusCodes from "http-status-codes";
import { replaceFileExtension } from "@/utils/server/gen-file-utils";
import { WEBP_EXTENSION } from "@/utils/constants";
import sharp from "sharp";
import IMageFileOperationResult from "@/types/i-image-file-operation-result";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IMageFileOperationResult>
) {
  const { filePathRelative } = req.body as unknown as IImageFile;
  const sourceImageFullPath = getImageFullPathInImagesDir(filePathRelative);

  if (!existsSync(sourceImageFullPath))
    return res.status(StatusCodes.NOT_FOUND).end();

  const targetImageFullPath = replaceFileExtension(
    sourceImageFullPath,
    WEBP_EXTENSION
  );
  await sharp(sourceImageFullPath).webp().toFile(targetImageFullPath);

  res
    .status(StatusCodes.CREATED)
    .send({ sourceImageFullPath, targetImageFullPath });
}
