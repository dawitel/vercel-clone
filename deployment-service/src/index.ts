
import { commandOptions } from "redis";
import { RedisConfig } from "./configs/redis.config";
import { buildProject, copyFinalDist, downloadS3Folder } from "./utils";

// instantiate pub-sub connections to SQS
const subscriber = new RedisConfig().subscriber;
const publisher = new RedisConfig().publisher;

/**
 * @description infinitely running function to download, build and reupload projects
 */
async function main() {
    while(1) {
        // get the next pushed element from the queue
        const res = await subscriber.brPop(
            commandOptions({ isolated: true }),
            'build-queue',
            0
          );
        // @ts-ignore;
        // extract the id from the queue element
        const id = res.element
        
        // 1. Download the project folder locally with the ID
        await downloadS3Folder(`output/${id}`)

        // 2. build the project
        await buildProject(id);

        // 3. copy assets and upload them back to S3
        copyFinalDist(id);

        // Flag the current project as finished
        publisher.hSet("status", id, "deployed")
    }
}
main();
