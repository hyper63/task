import { assertEquals } from "./deps_test.js";
import { Task } from "./mod.js";

const { test } = Deno;

test("task", () =>
  Task.of(true)
    .fork(
      (e) => assertEquals(true, false),
      (r) => assertEquals(r, true),
    ));

test("test csp", () =>
  Task.fromNode((cb) => {
    cb(null, true);
  })().fork(
    (e) => assertEquals(true, false),
    (r) => assertEquals(r, true),
  ));

test("test promise", () =>
  Task.fromPromise(() => Promise.resolve(true))()
    .fork(
      (e) => assertEquals(true, false),
      (r) => assertEquals(r, true),
    ));
