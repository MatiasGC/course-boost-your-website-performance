// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import IConvertAllApiResult from "@/types/i-convert-all-result";
import { convertImagesFilesRecursivelyToWebP } from "@/utils/server/sharp-helper-utils";
import { getImagesDirInPublic } from "@/utils/server/utils";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IConvertAllApiResult>
) {
  const sourceRootDirectory = getImagesDirInPublic();
  const targetRootDirectory = getImagesDirInPublic();

  const convertResult = await convertImagesFilesRecursivelyToWebP(
    sourceRootDirectory,
    targetRootDirectory
  );

  res.status(StatusCodes.CREATED).send({
    targetRootDirectory,
    sourceRootDirectory,
    convertResult,
  });
}
