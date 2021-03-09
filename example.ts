import { Task } from "https://x.nest.land/task@1.0.3/mod.ts";
const { fromPromise } = Task;

fromPromise((x : any) : Promise<string>  => Promise.resolve(x + " :tada:"))("Hello")
  .fork(
    (e: string) => console.log("promise was rejected"),
    (r: string) => console.log(r),
  );

