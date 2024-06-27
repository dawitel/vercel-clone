import { config } from "dotenv";
import { S3 } from "aws-sdk";

config();

export const AWSconfig = () => {
    const configList = {
        s3:  new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            endpoint: process.env.AWS_ENDPOINT,
        }),
        bucketName = process.env.AWS_BUCKET_NAME;
    }
    
    return configList
};
