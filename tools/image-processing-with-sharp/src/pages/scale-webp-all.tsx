import ConvertAllResult from "@/components/convert-all-result";
import InternalApi from "@/types/e-internal-api";
import IConvertAllApiResult from "@/types/i-convert-all-result";
import IScaleFactor from "@/types/i-scale-factor";
import { Alert, Button } from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";

const ScaleWebpAll = () => {
  const [result, setResult] = useState<IConvertAllApiResult>();
  const [loading, setLoading] = useState(false);
  const inputElemScaleFactor = useRef<HTMLInputElement>(null);

  

  async function scaleAllWebpFiles(): Promise<void> {
    const url = InternalApi.ScaleAllWebp;
    setLoading(true);
    const body: IScaleFactor = {
      scaleFactor: Number(inputElemScaleFactor.current?.value),
    };
    const data = (await axios.post(url, body)).data as IConvertAllApiResult;
    setLoading(false);
    setResult(data);
  }

  return (
    <div>
      <label>Insert scale factor &lt; 1</label>
      <br />
      <input ref={inputElemScaleFactor} type="number" defaultValue="0.5" />
      <br />
      <br />
      <Alert severity="warning">Delete target directory if it is inside source</Alert>
      <Button variant="contained" onClick={scaleAllWebpFiles}>
        scale All Webp Files
      </Button>
      {loading && <p>loading ...</p>}
      {result && (
        <ConvertAllResult
          targetRootDirectory={result.targetRootDirectory}
          sourceRootDirectory={result.sourceRootDirectory}
          convertResult={result.convertResult}
        />
      )}
    </div>
  );
};

export default ScaleWebpAll;
