# hyper63 Task

A Task ADT for deno

## Usage

``` js
Task.of('fp rocks')
  .map(x => x.toUpperCase())
  .map(x => x + '!')
  .fork(
    console.log,
    console.log
  )
```

## Testing

```
deno test mod_test.js
```

## License

MIT
