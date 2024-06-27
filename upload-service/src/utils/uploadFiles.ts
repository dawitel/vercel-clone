
import fs from "fs";
import { AWSconfig } from "../configs/aws.config";

/**
 * @description read the files from the file path synchronously and upload them to S3
 * @param fileName e.g. output/12312/src/App.jsx
 * @param localFilePath e.g. /Users/dawit-elias/builds/vercel/dist/output/12312/src/App.jsx
 */
export const uploadFiles = async (fileName: string, localFilePath: string) => {
  const fileContent = fs.readFileSync(localFilePath);
  const { bucketName, s3 } = AWSconfig();

  const uploadParams = {
    Body: fileContent,
    Bucket: bucketName,
    Key: fileName,
  };

  const response = await s3.upload(uploadParams).promise();
  console.log("✔ SUCCESSFULLY UPLOADED FILES: ", response);
};
