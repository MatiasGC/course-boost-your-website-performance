import axios from "axios";
import { IMAGES_DIR } from "@/utils/constants";
import { FC, useEffect, useState } from "react";
import { IImageFile } from "@/types/i-image-file";
import { IResFileSize } from "@/types/i-res-file-size";
import InternalApi from "@/types/e-internal-api";

interface IProps {
  filePathRelative: string; // under public/images
}

const ImageWithSize: FC<IProps> = ({ filePathRelative }) => {
  const [fileSizeKb, setFileSizeKb] = useState<number>();
  useEffect(getFileSizeKb, [filePathRelative]);

  function getFileSizeKb() {
    const url = InternalApi.FileSize;
    const params: IImageFile = {
      filePathRelative,
    };
    axios
      .get(url, { params })
      .then(function (response) {
        const data = response.data as IResFileSize;
        setFileSizeKb(parseInt(`${data.fileSizeKb}`));
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>
        {filePathRelative} [{fileSizeKb} kb]
      </p>
      <img
        src={`${IMAGES_DIR}/${filePathRelative}`}
        alt={`${filePathRelative} is missing`}
      />
    </div>
  );
};

export default ImageWithSize;
