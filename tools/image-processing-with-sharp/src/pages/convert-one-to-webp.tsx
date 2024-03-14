import InternalApi from "@/types/e-internal-api";
import { IImageFile } from "@/types/i-image-file";
import IMageFileOperationResult from "@/types/i-image-file-operation-result";
import { KITES_DIR, KITE_1002W } from "@/utils/constants";
import axios from "axios";
import { FC, useRef, useState } from "react";
import { Button } from "@mui/material";

const ConvertOneToWebp: FC = () => {
  const [data, setData] = useState<IMageFileOperationResult>();
  const inputElement = useRef<HTMLInputElement>(null);
  async function clickHandler() {
    const url = InternalApi.ConvertOneToWebp;
    setData({ sourceImageFullPath: "", targetImageFullPath: "" });

    const body: IImageFile = {
      filePathRelative: inputElement.current?.value ?? "",
    };
    try {
      setData((await axios.post(url, body)).data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <label>Insert relative image path under images directory</label>
      <br />
      <input
        ref={inputElement}
        defaultValue={`${KITES_DIR}/${KITE_1002W}.jpg`}
      />
      <br />
      <br />
      <Button variant="contained" onClick={clickHandler}>
        Convert to webp
      </Button>
      <br />
      <br />
      <p>source full path : {data?.sourceImageFullPath} </p>
      <p>target full path : {data?.targetImageFullPath} </p>
    </>
  );
};
export default ConvertOneToWebp;
