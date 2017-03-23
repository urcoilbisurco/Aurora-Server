
## Aurora Server
Express.js server for Aurora smart home project.

## Installation

create an "app/_env.js" file with inside:

```javascript
var env={
  production:true,
  port:80,
  mongo:"your mongo URL",
  mqtt_server:"your mqtt server, if you use the broker below it should be mqtt://localhost:1883",
  broker:{
    mongo_url:"mongodb://localhost:27017/",
    port:1883
  },
  weather:{
    token:"Your darksky.net API key",
    location:"lat,long",
  },
}
module.exports=env;
```

Then run

```
  npm install
  npm run start
```

Then visit localhost:3456

## MQTT

Aurora Server will listen to all the messages on the mqtt broker with the topic

```
  :user_uuid/:node_uuid/updated
```

And will update the state of the node based on the message (in JSON).

A node should listen to

```
  :user_uuid/:node_uuid/update
```

For state changes from Aurora Server.

## Todo
- [x] Client: connect the React Client with MQTT via APIs
- [ ] Create a new node from React Client
- [ ] Better configuration for new Node (and type of node)
- [ ] Share a node between more users
