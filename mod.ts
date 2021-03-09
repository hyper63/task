type U = {
  ([x, string]: any): any;
};

type F = {
  (f: U): Task;
};

type Other = {
  (other: Task): Task;
};

type TaskFn = {
  (rejected: U, resolved: U): void;
};

type Task = {
  ['@@type']: string;
  fork: TaskFn;
  ap: Other;
  map: F;
  chain: F;
  concat: Other;
  fold: { (f: U, g: U): any };
  toPromise: { (): Promise<any> };
};

export const Task = (fork: TaskFn) => ({
  ['@@type']: 'task',
  fork,
  ap: (other: Task): Task =>
    Task((rejected: U, resolved: U): any =>
      fork(
        rejected,
        (f: U): any => other.fork(rejected, (x: any): any => resolved(f(x))),
      )
    ),
  map: (f: U): Task =>
    Task((rejected: U, resolved: U): any =>
      fork(rejected, (x: any): any => resolved(f(x)))
    ),
  chain: (f: U): Task =>
    Task((rejected: U, resolved: U): any =>
      fork(rejected, (x: any): any => f(x).fork(rejected, resolved))
    ),
  concat: (other: Task): Task =>
    Task((rejected: U, resolved: U): any =>
      fork(
        rejected,
        (x: any): any =>
          other.fork(rejected, (y: any): any => resolved(x.concat(y))),
      )
    ),
  fold: (f: U, g: U): Task =>
    Task((rejected: U, resolved: U): any =>
      fork(
        (x: any): any => f(x).fork(rejected, resolved),
        (x: any): any => g(x).fork(rejected, resolved),
      )
    ),
  toPromise: (): Promise<any> =>
    new Promise((resolve: U, reject: U) => fork(reject, resolve)),
});

Task.of = (x: any): Task =>
  Task((rejected: U, resolved: U): any => resolved(x));
Task.resolved = (x: any): Task =>
  Task((rejected: U, resolved: U): any => resolved(x));
Task.rejected = (x: any): Task =>
  Task((rejected: U, resolved: U): any => rejected(x));

Task.fromPromise = (f: Function): Function =>
  (...args: any[]): Task =>
    Task((rejected: U, resolved: U): any =>
      f(...args).then(resolved).catch(rejected)
    );

Task.fromNode = (f: Function): Function =>
  (...args: any[]): Task =>
    Task((rejected: U, resolved: U): any =>
      f(...args, (e: any, x: any): void => e ? rejected(e) : resolved(x))
    );
