# Contribution to NoSmoke

## Dev

```bash
$ macaca server --verbose
$ make dev
```

## Restful

```javascript
fetch('http://localhost:3456/wd/hub/session', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    desiredCapabilities: {
      platformName: 'ios',
      deviceName: 'iPhone 6 Plus',
      bundleId: 'xudafeng.ios-app-bootstrap'
    }
  })
});
```
