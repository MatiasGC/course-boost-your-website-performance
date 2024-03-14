import IConvertAllApiResult from "@/types/i-convert-all-result";
import { FC } from "react";

const ConvertAllResult: FC<IConvertAllApiResult> = ({
  targetRootDirectory,
  sourceRootDirectory,
  convertResult,
}) => {
  const { numAllFile, errorFiles, numFileConvertions } = convertResult;
  return (
    <div>
      <p>sourceRootDirectory : {sourceRootDirectory}</p>
      <p>targetRootDirectory : {targetRootDirectory}</p>
      <p>numFileConvertions : {numFileConvertions}</p>
      <p>numAllFile : {numAllFile}</p>
      <p>errors : {errorFiles.length}</p>
    </div>
  );
};

export default ConvertAllResult;
