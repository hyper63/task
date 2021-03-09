import { assertEquals } from "./deps_test.ts";
import { Task } from "./mod.ts";

const { test } = Deno;

test("task", () =>
  Task.of(true)
    .fork(
      (e: any) => assertEquals(true, false),
      (r: boolean) => assertEquals(r, true),
    ));

test("test csp", () =>
  Task.fromNode((cb: Function) => {
    cb(null, true);
  })().fork(
    (e: any) => assertEquals(true, false),
    (r: boolean) => assertEquals(r, true),
  ));

test("test promise", () =>
  Task.fromPromise(() => Promise.resolve(true))()
    .fork(
      (e: any) => assertEquals(true, false),
      (r: boolean) => assertEquals(r, true),
    ));

test("toPromise", async () =>
  await Task.of(true).toPromise()
    .then((r: boolean) => assertEquals(r, true)));
