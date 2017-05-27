# Contribution to NoSmoke

## Dev

``` bash
$ macaca server --verbose
$ make dev
```

## Restful

``` javascript
fetch('http://localhost:3456/wd/hub/session', {
  method: 'POST',
  body: JSON.stringify({
    desiredCapabilities: {
      platformName: 'ios'
    }
  })
});
```
