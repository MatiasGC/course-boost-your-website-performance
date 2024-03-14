import { IImageFile } from "./i-image-file";

export interface ICropImageFile extends IImageFile {
    newWidthPx : number;
    newHeightPx : number;
}
