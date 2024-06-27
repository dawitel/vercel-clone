import { getAllFiles } from "./getAllFiles";
import { uploadFile } from "./uploadFiles";
import path from "path";

export const copyFinalDist = (id: string) => {
  const folderPath = path.join(__dirname, `output/${id}/dist`);
  const allFiles = getAllFiles(folderPath);
  allFiles.forEach(async (file) => {
    const fileName = `dist/${id}/` + file.slice(folderPath.length + 1);
    await uploadFile(fileName, file);
  });
}
