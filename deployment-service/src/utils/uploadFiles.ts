import { AWSconfig } from "../configs/aws.config";
import fs from "fs";

/**
 * @description upload the built assets back to S3
 * @param fileName file name as key
 * @param localFilePath where is the file locally
 * @returns response of s3.upload().promise
 */
export const uploadFile = async (fileName: string, localFilePath: string) => {
  const fileContent = fs.readFileSync(localFilePath);
  const { bucketName, s3 } = AWSconfig();
  const params = {
    Body: fileContent,
    Bucket: bucketName,
    Key: fileName,
  };
  const response = await s3.upload(params).promise();
  return response;
};
