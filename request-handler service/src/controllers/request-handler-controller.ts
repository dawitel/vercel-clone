import { Request, Response } from "express";
import { AWSconfig } from "../configs/aws.config";

/**
 * @description accept requests, get the assets(HTML, CSS, JS) and serve them
 * @param req express Request
 * @param res express Response
 * @returns assets(HTML, CSS, JS)
 */
export const requestHandler = async (req: Request, res: Response) => {
  const {s3, bucketName} = AWSconfig();

  // id.dawit-elias.com
  const host = req.hostname;

  const id = host.split(".")[0];
  const filePath = req.path;

  const fileKey = `dist/${id}${filePath}`;

  const params = {
    Bucket: bucketName,
    Key: fileKey,
  };

  const contents = await s3.getObject(params).promise();

  const type = filePath.endsWith("html")
    ? "text/html"
    : filePath.endsWith("css")
    ? "text/css"
    : "application/javascript";
    
  res.set("Content-Type", type);

  return res.send(contents.Body);
};
