// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getImageFullPathInImagesDir } from "@/utils/server/utils";
import { existsSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import StatusCodes from "http-status-codes";
import { IScaleImageFile } from "@/types/i-scale-image-file";
import IMageFileOperationResult from "@/types/i-image-file-operation-result";
import { scaleOneWithTargetName } from "@/utils/server/sharp-helper-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IMageFileOperationResult>
) {
  const { scaleFactor, filePathRelative } =
    req.body as unknown as IScaleImageFile;

  const sourceImageFullPath = getImageFullPathInImagesDir(filePathRelative);

  if (!existsSync(sourceImageFullPath))
    return res.status(StatusCodes.NOT_FOUND).end();

  const { targetImageFullPath } = await scaleOneWithTargetName(
    sourceImageFullPath,
    scaleFactor,
    sourceImageFullPath
  );

  res
    .status(StatusCodes.CREATED)
    .send({ sourceImageFullPath, targetImageFullPath });
}
