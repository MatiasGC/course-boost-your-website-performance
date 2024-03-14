import IErrorFile from "./i-error-file";

export default interface IConvertAllResult {
  numAllFile: number;
  errorFiles: IErrorFile[];
  numFileConvertions: number;
  sourceFilesFullPath: string[]; 
  targetFilesFullPath: string[]; 
}
