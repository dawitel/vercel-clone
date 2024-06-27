import { Request, Response } from "express";
import {  generateID } from "../utils/utils";
import simpleGit from "simple-git";
import { getAllFiles } from "../utils/file";
import path from "path";
import { uploadFile } from "../utils/aws";
import { RedisConection } from "../redis/Redis";

const publisher = new RedisConection().publisher;
/**
 * @description get repository URL clone it locally and upload it to S3
 * @param req express Request
 * @param res express Response
 * @returns id of the project
 */
export const deployRouter = async (req: Request, res: Response) => {
  const repoUrl = req.body.repoUrl;
  const id = generateID();
  await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));

  const files = getAllFiles(path.join(__dirname, `output/${id}`));

  files.forEach(async (file) => {
    await uploadFile(file.slice(__dirname.length + 1), file);
  });

  await new Promise((resolve) => setTimeout(resolve, 5000));
  publisher.lPush("build-queue", id);
  publisher.hSet("status", id, "uploaded");

  return res.json({
    id: id,
  });
};
