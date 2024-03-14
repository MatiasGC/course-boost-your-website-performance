// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IImageFile } from "@/types/i-image-file";
import { IResFileSize } from "@/types/i-res-file-size";
import { getFileSizeKb } from "@/utils/server/gen-file-utils";
import { getImageFullPathInImagesDir } from "@/utils/server/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResFileSize>
) {
  const {filePathRelative} = req.query as unknown as IImageFile;

  const fullPath = getImageFullPathInImagesDir(filePathRelative);
  const responseInfo: IResFileSize = {
    fileSizeKb: getFileSizeKb(fullPath),
  };

  res.send(responseInfo);
}
