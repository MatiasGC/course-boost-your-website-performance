// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getImageFullPathInImagesDir } from "@/utils/server/utils";
import { existsSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import StatusCodes from "http-status-codes";
import IMageFileOperationResult from "@/types/i-image-file-operation-result";
import { ICropImageFile } from "@/types/i-crop-image-file";
import { cropOneWithTargetName } from "@/utils/server/sharp-helper-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IMageFileOperationResult>
) {
  const { newWidthPx, newHeightPx, filePathRelative } =
    req.body as unknown as ICropImageFile;

  const sourceImageFullPath = getImageFullPathInImagesDir(filePathRelative);

  if (!existsSync(sourceImageFullPath))
    return res.status(StatusCodes.NOT_FOUND).end();

  const { targetImageFullPath } = await cropOneWithTargetName(
    sourceImageFullPath,
    newWidthPx,
    newHeightPx,
    sourceImageFullPath
  );

  res
    .status(StatusCodes.CREATED)
    .send({ sourceImageFullPath, targetImageFullPath });
}
