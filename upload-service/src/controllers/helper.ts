import simpleGit from "simple-git";
import path from "path";
import { getAllFiles, uploadFiles } from "../utils";
import { RedisConection } from "../configs";

const publisher = new RedisConection().publisher;

export const cloneRepo = async (id: string, repoUrl: string) => {
  await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));
};

export const setStatusToSQS = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  publisher.lPush("build-queue", id);
  publisher.hSet("status", id, "uploaded");
};

export const uploadFile = async (id: string) => {
  const files = getAllFiles(path.join(__dirname, `output/${id}`));

  files.forEach(async (file) => {
    await uploadFiles(file.slice(__dirname.length + 1), file);
  });
};
