'use strict';

module.exports = {

  app: {
    title: 'Google recipt scanner',
    description: 'Scan recipts in google drive and write to google spreadsheet'
  },

  port: process.env.PORT || 3000,
  sessionCookie: {
    maxAge: 24 * (60 * 60 * 1000),
    httpOnly: true,
    secure: false
  },
  sessionSecret: process.env.SESSION_SECRET || 'youshouldchangethistosomethingsecret'

};
