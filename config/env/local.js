'use strict';

// Rename this file to local.js for having a local configuration variables that
// will not get commited and pushed to remote repositories.
// Use it for your API keys, passwords, etc.

module.exports = {
  http: {
    port: process.env.PORT || 3000
  },
  sessionSecret: process.env.SESSION_SECRET || 'youshouldchangethistosomethingsecret',
  sessionStore: {
    redis: {
      host: '127.0.0.1',
      port: 6379,
      username: '',
      password: ''
    }
  },
  db: {
    uri: 'mongodb://localhost/ticketDemo',
    options: {
      user: '',
      pass: ''
    }
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    username: '',
    password: ''
  },
  keyStore: {
    host: '127.0.0.1',
    port: 6379,
    username: '',
    password: '',
    ttl: 3*60*1000 // 3 mins 
  }
};
