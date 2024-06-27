import { Request, Response } from "express";
import { generateID } from "../utils";
import { cloneRepo, setStatusToSQS, uploadFile } from "./helper";

/**
 * @description get repository URL clone it locally, upload it to S3, and set the status in SQS
 * @param req express Request
 * @param res express Response
 * @returns id of the project
 */
export const deployRouter = async (req: Request, res: Response) => {
  const repoUrl = req.body.repoUrl;
  const id = generateID();

  await cloneRepo(id, repoUrl);
  await uploadFile(id);
  await setStatusToSQS(id);

  return res.json({
    id: id,
  });
};
