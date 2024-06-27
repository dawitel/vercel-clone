import { Request, Response } from "express";
import { RedisConection } from "../configs/redis.config";

const subscriber = new RedisConection().subscriber;
/**
 * @description get the status flag of a project with the id
 * @param req express Request
 * @param res express Response
 * @returns status of project
 */
export const setFlag = async (req: Request, res: Response) => {
  const id = req.query.id;
  const response = await subscriber.hGet("status", id as string);
  return res.json({
    status: response,
  });
};
