import InternalApi from "@/types/e-internal-api";
import { ICropImageFile } from "@/types/i-crop-image-file";
import IMageFileOperationResult from "@/types/i-image-file-operation-result";
import { LIONS_DIR, LION_1280W } from "@/utils/constants";
import { Button } from "@mui/material";
import axios from "axios";
import { FC, useRef, useState } from "react";

const CropOneImageFile: FC = () => {
  const [data, setData] = useState<IMageFileOperationResult>();
  const inputElemFilePathRelative = useRef<HTMLInputElement>(null);
  const inputElemNewWidthPx = useRef<HTMLInputElement>(null);
  const inputElemNewHeightPx = useRef<HTMLInputElement>(null);

  async function clickHandler() {
    const url = InternalApi.CropOne;
    setData({ sourceImageFullPath: "", targetImageFullPath: "" });

    const body: ICropImageFile = {
      filePathRelative: inputElemFilePathRelative.current?.value ?? "",
      newWidthPx: Number(inputElemNewWidthPx.current?.value),
      newHeightPx: Number(inputElemNewHeightPx.current?.value),
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
        ref={inputElemFilePathRelative}
        defaultValue={`${LIONS_DIR}/${LION_1280W}.jpg`}
      />
      <br /> <br />
      <label>
        Insert new width [px]{" "}
        <span style={{ color: "orange" }}>&lt; old width</span>
      </label>
      <br />
      <input ref={inputElemNewWidthPx} type="number" defaultValue="300" />
      <br />
      <br />
      <label>Insert new height [px] <span style={{ color: "orange" }}>&lt; old height</span></label>
      <br />
      <input ref={inputElemNewHeightPx} type="number" defaultValue="400" />
      <br />
      <br />
      <Button variant="contained" onClick={clickHandler}>
        Crop
      </Button>
      <br />
      <br />
      {data?.targetImageFullPath && (
        <h3>
          The created image keeps its aspect ratio, but is resized to fit within
          the new dimension
        </h3>
      )}
      <p>source full path : {data?.sourceImageFullPath} </p>
      <p>target full path : {data?.targetImageFullPath} </p>
    </>
  );
};
export default CropOneImageFile;
