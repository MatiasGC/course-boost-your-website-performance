import ConvertAllResult from "@/components/convert-all-result";
import ImageWithSize from "@/components/image-with-size";
import InternalApi from "@/types/e-internal-api";
import IConvertAllApiResult from "@/types/i-convert-all-result";
import {
  KITES_DIR,
  KITE_1002W,
  LIONS_DIR,
  LION_1280W,
  WEBP_EXTENSION,
} from "@/utils/constants";
import { Alert, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function ConvertAllToWebp() {
  const [result, setResult] = useState<IConvertAllApiResult>();
  const [loading, setLoading] = useState(false);

  async function convertAllToWebp(): Promise<void> {
    const url = InternalApi.ConvertAllToWebp;
    setLoading(true);
    const data = (await axios.get(url)).data as IConvertAllApiResult;
    setLoading(false);
    setResult(data);
  }

  return (
    <div>
      <Alert severity="success">
        Notice the size of webp file below is much smaller than jpg above
      </Alert>
      <Alert severity="success">
        Notice the quality of the jpg and webp files which seems the same
      </Alert>

      <h2>Original jpg files</h2>
      <div style={{ display: "flex" }}>
        <ImageWithSize filePathRelative={`${LIONS_DIR}/${LION_1280W}.jpg`} />
        <ImageWithSize filePathRelative={`${KITES_DIR}/${KITE_1002W}.jpg`} />
      </div>

      <Button variant="contained" onClick={convertAllToWebp}>
        Click to convert files in public directory and sub directories
      </Button>
      {loading && <p>loading ...</p>}
      {result && (
        <ConvertAllResult
          targetRootDirectory={result.targetRootDirectory}
          sourceRootDirectory={result.sourceRootDirectory}
          convertResult={result.convertResult}
        />
      )}
      <h2>Converted jpg files to webp</h2>

      <Alert severity="info">
        reload page after convert to see new created images on the dom
      </Alert>
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <ImageWithSize
          filePathRelative={`${LIONS_DIR}/${LION_1280W}.${WEBP_EXTENSION}`}
        />
        <ImageWithSize
          filePathRelative={`${KITES_DIR}/${KITE_1002W}.${WEBP_EXTENSION}`}
        />
      </div>
    </div>
  );
}
