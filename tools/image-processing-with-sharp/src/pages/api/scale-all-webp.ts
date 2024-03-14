// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import StatusCodes from "http-status-codes";
import IScaleFactor from "@/types/i-scale-factor";
import IConvertAllApiResult from "@/types/i-convert-all-result";
import { getImagesDirInPublic, getScaledImagesDirInPublic } from "@/utils/server/utils";
import { scaleWebPImagesFilesRecursively } from "@/utils/server/sharp-helper-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IConvertAllApiResult>
) {
  const { scaleFactor } = req.body as IScaleFactor;

  const sourceRootDirectory = getImagesDirInPublic();
  const targetRootDirectory = getScaledImagesDirInPublic();

  const convertResult = await scaleWebPImagesFilesRecursively(
    sourceRootDirectory,
    targetRootDirectory,
    scaleFactor
  );

  res.status(StatusCodes.CREATED).send({
    targetRootDirectory,
    sourceRootDirectory,
    convertResult,
  });
}


