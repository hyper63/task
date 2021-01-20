<h1 align="center">task</h1>
<p align="center">Task is a ADT that can wrap async functions and make them execute in a lazy path. This allows for better error management and consistents results. You can use `fromPromise` and `fromNode` to wrap promises and callbacks then chain them together in a lazy pipeline that does not execute the async code until `fork` is applied.</a>
</p>
<p align="center">
  <a href="https://github.com/hyper63/task/tags/"><img src="https://img.shields.io/github/tag/hyper63/task" alt="Current Version" /></a>
  <img src="https://github.com/hyper63/task/workflows/.github/workflows/deno.yml/badge.svg" />
  
  </p>

---

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Features](#features)
- [Methods](#methods)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

see example.js

```js
import { Task } from 'https://x.nest.land/task@1.0.0/mod.js'
const { fromPromise } = Task

fromPromise((x) => Promise.resolve(x + ' :tada:'))('Hello')
  .fork(
    e => console.log('promise was rejected'),
    r => console.log(r)
  )
```

## Installation

This is a Deno module available to import from 
https://nest.land/package/task 

deps.js

```
export { Task } from 'https://x.nest.land/task@1.0.0/mod.js'
```

## Features

* fromPromise
* fromNode

## Methods

* Task.of - creates a Task with a value eg. Task.of('foo')
* Task.resolve - creates a Task with a value and puts Task in resolved state
* Task.reject - creates a Task with a value in rejected state
* Task.fromPromise - returns a constructor function that will create a Task
* Task.fromNode - returns a constructor function that will create a Task


## Contributing

Pull Requests are welcome

## License

MIT

## Acknowledgements

The core code for this library was initiated from code shared by Brian Londorf in a course from frontend masters. If you want to learn more about functional programming in javascript check it out: https://frontendmasters.com/courses/hardcore-js-v2/

