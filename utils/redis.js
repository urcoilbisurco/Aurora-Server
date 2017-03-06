var redis = require('redis'),
    jsonify = require('redis-jsonify'),
    client = jsonify(redis.createClient(6379, '127.0.0.1'));

module.exports = client;
