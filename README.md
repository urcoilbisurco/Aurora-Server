
## Aurora Server
Express.js server for Aurora smart home project.

## Installation

create an "app/_env.js" file with inside:

```javascript
var env={
  mqtt_server:"your mtqq server"
  port:80,
  mongo:"your mongo URL",
  mqtt_server:"your mqtt server, if you use the broker below it should be mqtt://localhost:1883",
  broker:{
    mongo_url:"mongodb://localhost:27017/",
    port:1883
  }
}
module.exports=env;
```

Then run

```
  npm install
  npm run start
```

Then visit localhost:3456


## Todo
[ ] well, everything :)
