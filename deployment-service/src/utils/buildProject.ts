import { exec, spawn } from "child_process";
import path from "path";

/**
 * @description build the project by running the commands
 * @param id
 * @returns Promise of building the project
 */

export const  buildProject = (id: string) => {
  return new Promise((resolve) => {
    const projectDirectory = path.join( __dirname,`output/${id}`)
    const command = `cd ${projectDirectory} && npm install && npm run build`;

    // execute the commands in the child/ project folder
    const child = exec(command);

    // handle the data and error and resolve the end
    child.stdout?.on("data", function (data: any) {
      console.log("stdout: " + data);
    });
    child.stderr?.on("data", function (data: any) {
      console.log("stderr: " + data);
    });

    child.on("close", function (code: any) {
      resolve("");
    });
  });
}
