import { Task } from 'https://x.nest.land/task@1.0.0/mod.js'
const { fromPromise } = Task

fromPromise((x) => Promise.resolve(x + ' :tada:'))('Hello')
  .fork(
    e => console.log('promise was rejected'),
    r => console.log(r)
  )
