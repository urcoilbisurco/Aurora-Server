
## Aurora Server
Express.js server for Aurora smart home project.

![Demo](https://media.giphy.com/media/3oKIPbX1KVk64Rgbx6/giphy.gif)


## Installation

create an "_env.js" file with inside:

```javascript
var env = {
  production: false,
  port: 3456,
  mongo: "your mongo URL",
  mqtt_server: "your mqtt server, if you use the broker below it should be mqtt://localhost:1883",
  broker: {
    mongo_url: "mongodb://localhost:27017/",
    port: 1883
  },
  auth: {
    saltRounds: 10,
  },
  socket_server: "http://localhost:3456",
  weather:{
    token: "Your darksky.net API key",
    location: "lat,long",
  },
}
module.exports = env;
```

Then run

```
  npm install
  npm run start
```

Then visit localhost:3456. A MQTT and a Socket server will be started on port 1883 and on port 3457.

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

## Use IFTTT + Google Assistant for voice controls

With the Aurora APIs and IFTTT, you can use your voice to control Aurora.
Here is what you need to do:

1. Create a new Applet on IFTTT
2. Choose 'Google Assistant' as "This"
3. Choose 'Say a simple phrase' as "trigger"
4. Write your phrase (for example: 'Turn on the TV') and then write what you want the Assistant to say in response (for example: 'Turning on TV...')
5. Choose 'Maker Webhooks' as 'action service'
6. As URL, write **{{URL}}/api/v1/nodes/{{UUID_NODE}}?access_token={{UUID_USER}}**, where URL is the url where your server is hosted, UUID_NODE is the node UUID and UUID_USER is the user UUID. Note that you can't test this on localhost, you need to have a real domain.
7. As Method, choose POST, and as Content Type choose "application/x-www-form-urlencoded"
8. As Body, choose the node state that you want to change in the form **{{key}}={{value}}** (for example: open=true for a 'switch' node)
9. That's it! Save the applet and use Google Assistant on Android or on Google Home to say your phrase Trigger (OK Google, turn on the TV). Everything will work as expected :)


## Todo
- [x] Client: connect the React Client with MQTT via APIs
- [x] Create a new node from React Client
- [x] Better configuration for new Node (and type of node)
- [x] Schedule a node on/off
- [x] Share a node between more users
- [x] Refactor sharing part - schedule doesn't work
- [ ] Better Layout and design
- [ ] Add more node types
