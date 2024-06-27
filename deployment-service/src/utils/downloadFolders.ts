import { AWSconfig } from "../configs/aws.config";
import fs from "fs";
import path from "path";

/**
 * @description 
 * @param prefix file prefix or name e.g. App.jsx => App
 */
export async function downloadS3Folder(prefix: string) {
  const { bucketName, s3 } = AWSconfig();
  const params = {
    Bucket: bucketName,
    Prefix: prefix,
  };
  const allFiles = await s3.listObjectsV2(params).promise();

  const allPromises =
    allFiles.Contents?.map(async ({ Key }) => {
      return new Promise(async (resolve) => {
        if (!Key) {
          resolve("");
          return;
        }
        const finalOutputPath = path.join(__dirname, Key);
        const outputFile = fs.createWriteStream(finalOutputPath);
        const dirName = path.dirname(finalOutputPath);

        if (!fs.existsSync(dirName)) {
          fs.mkdirSync(dirName, { recursive: true });
        }
        s3.getObject({
          Bucket: bucketName,
          Key,
        })
          .createReadStream()
          .pipe(outputFile)
          .on("finish", () => {
            resolve("");
          });
      });
    }) || [];

  await Promise.all(allPromises?.filter((x: any) => x !== undefined));
}
