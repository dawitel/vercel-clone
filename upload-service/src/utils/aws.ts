import { S3 } from "aws-sdk";
import fs from "fs";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: process.env.AWS_ENDPOINT,
});

const bucketName = process.env.AWS_BUCKET_NAME;

/**
 *@description read the files from the file path synchronously and upload them to S3
 * @param fileName e.g. output/12312/src/App.jsx
 * @param localFilePath e.g. /Users/dawit-elias/builds/vercel/dist/output/12312/src/App.jsx
 */
export const uploadFile = async (fileName: string, localFilePath: string) => {
  const fileContent = fs.readFileSync(localFilePath);

  const uploadParams = {
    Body: fileContent,
    Bucket: bucketName,
    Key: fileName,
  };

  const response = await s3.upload(uploadParams).promise();
  console.log("✔ SUCCESSFULLY UPLOADED FILES: ", response);
};
